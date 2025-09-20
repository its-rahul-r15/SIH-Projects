// backend/src/controllers/collegeController.js
import College from '../models/College.js';

/**
 * GET /api/colleges
 * Supports:
 *  - lat, lon, withinKm  => geo filter using $geoWithin
 *  - district, state, city
 *  - stream (matches any course element, case-insensitive)
 *  - q (text search on name)
 *  - page, limit (pagination)
 */
export const getNearbyColleges = async (req, res) => {
  try {
    const {
      lat, lon, withinKm = 20,
      district, state, city,
      stream, q,
      page = 1, limit = 20
    } = req.query;

    const filter = {};

    if (q) filter.name = { $regex: q, $options: 'i' };
    if (district) filter.district = { $regex: `^${district}$`, $options: 'i' };
    if (state) filter.state = { $regex: `^${state}$`, $options: 'i' };
    if (city) filter.district = { $regex: `^${city}$`, $options: 'i' }; // use district as city if needed
    if (stream) filter.courses = { $elemMatch: { $regex: stream.trim(), $options: 'i' } };

    // If lat/lon provided -> use $geoWithin with $centerSphere (radius in radians)
    if (lat && lon) {
      const radiusKm = Number(withinKm) || 20;
      const earthRadiusKm = 6378.1;
      const radiusInRadians = radiusKm / earthRadiusKm;
      filter.location = {
        $geoWithin: {
          $centerSphere: [ [ Number(lon), Number(lat) ], radiusInRadians ]
        }
      };
    }

    // build query
    const pageNum = Math.max(1, Number(page));
    const lim = Math.max(1, Math.min(100, Number(limit)));
    const skip = (pageNum - 1) * lim;

    const total = await College.countDocuments(filter);
    const docs = await College.find(filter).select('-__v').skip(skip).limit(lim).lean();

    res.json({ ok: true, meta: { total, page: pageNum, limit: lim }, data: docs });
  } catch (err) {
    console.error('getNearbyColleges error:', err);
    res.status(500).json({ ok:false, msg: 'Server error' });
  }
};
