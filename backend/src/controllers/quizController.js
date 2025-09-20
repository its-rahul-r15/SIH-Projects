// backend/src/controllers/quizController.js
import College from '../models/College.js';

const OPTION_MAP = {
  q1: { a: [2,0,0,0], b: [0,0,2,0], c: [0,2,0,0], d: [0,0,0,2] },
  q2: { a: [2,0,0,0], b: [0,2,0,0], c: [0,0,2,0], d: [0,0,0,2] }
};
const STREAM_KEYS = ['Science','Commerce','Arts','Vocational'];
const SAMPLE_COURSES = {
  Science: ['B.Sc','BCA'],
  Commerce: ['B.Com','BBA'],
  Arts: ['B.A','BFA'],
  Vocational: ['Diploma','ITI']
};

export const submitQuiz = async (req, res) => {
  try {
    const { answers = {}, location } = req.body;
    const scores = { Science:0, Commerce:0, Arts:0, Vocational:0 };

    Object.keys(answers).forEach(q => {
      const opt = String(answers[q] || '').toLowerCase();
      const mapping = OPTION_MAP[q];
      if (mapping && mapping[opt]) {
        const w = mapping[opt];
        scores.Science += w[0];
        scores.Commerce += w[1];
        scores.Arts += w[2];
        scores.Vocational += w[3];
      }
    });

    const total = Object.values(scores).reduce((a,b)=>a+b, 0) || 1;
    const ranked = STREAM_KEYS.map(k => ({ stream: k, score: +(scores[k]/total).toFixed(2) }))
                              .sort((a,b)=> b.score - a.score);

    const top = ranked[0].stream;
    const suggestedCourses = SAMPLE_COURSES[top];

    // find nearby colleges if location provided
    let nearby = [];
    if (location && location.lat && location.lon) {
      nearby = await College.find({
        location: {
          $near: {
            $geometry: { type: "Point", coordinates: [Number(location.lon), Number(location.lat)] },
            $maxDistance: 30 * 1000
          }
        },
        courses: { $in: suggestedCourses }
      }).limit(10).lean();
    }

    res.json({
      ok: true,
      data: {
        ranked_streams: ranked,
        suggested_courses: suggestedCourses.map(c => ({ course: c, why: `Matches ${top}` })),
        nearby_colleges: nearby
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok:false, msg:'Server error' });
  }
};
