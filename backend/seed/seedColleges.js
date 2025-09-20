// backend/src/seed/seedColleges.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import College from '../src/models/College.js';

dotenv.config();

const COLLEGES = [
  // ===== Jammu & Kashmir (existing) =====
  {"name":"Government Degree College Srinagar","state":"Jammu & Kashmir","district":"Srinagar","location":[74.797371,34.083667],"courses":["B.Sc","B.Com","B.A","BCA"],"facilities":{"hostel":true,"library":true,"lab":true},"avg_cutoff":{"BSc":60},"contact":{"phone":"0194-1234567"}},
  {"name":"Government Degree College Bemina","state":"Jammu & Kashmir","district":"Srinagar","location":[74.7991,34.0811],"courses":["B.Sc","B.A","B.Com"],"facilities":{"hostel":false,"library":true,"lab":true},"avg_cutoff":{"BSc":58},"contact":{"phone":"0194-2345678"}},
  {"name":"Government Degree College Baramulla","state":"Jammu & Kashmir","district":"Baramulla","location":[74.3594,34.1985],"courses":["B.Sc","B.A","B.Com","BBA"],"facilities":{"hostel":true,"library":true,"lab":true},"avg_cutoff":{"BSc":55},"contact":{"phone":"01952-123456"}},
  {"name":"Government Degree College Kupwara","state":"Jammu & Kashmir","district":"Kupwara","location":[74.2660,34.5278],"courses":["B.A","B.Com","B.Sc"],"facilities":{"hostel":true,"library":true,"lab":false},"avg_cutoff":{"BA":50},"contact":{"phone":"01951-123456"}},
  {"name":"Government Degree College Anantnag","state":"Jammu & Kashmir","district":"Anantnag","location":[75.1502,33.7304],"courses":["B.Sc","B.A","B.Com","BCA"],"facilities":{"hostel":false,"library":true,"lab":true},"avg_cutoff":{"BSc":60},"contact":{"phone":"01932-123456"}},
  {"name":"Government Degree College Pulwama","state":"Jammu & Kashmir","district":"Pulwama","location":[74.8938,33.8720],"courses":["B.A","B.Sc","B.Com"],"facilities":{"hostel":false,"library":true,"lab":false},"avg_cutoff":{"BA":52},"contact":{"phone":"01933-123456"}},
  {"name":"Government Degree College Shopian","state":"Jammu & Kashmir","district":"Shopian","location":[75.0110,33.7143],"courses":["B.A","B.Sc","B.Com"],"facilities":{"hostel":false,"library":true,"lab":false},"avg_cutoff":{"BA":48},"contact":{"phone":"01934-123456"}},
  {"name":"Government Degree College Kulgam","state":"Jammu & Kashmir","district":"Kulgam","location":[75.0194,33.64],"courses":["B.A","B.Sc","B.Com"],"facilities":{"hostel":false,"library":true,"lab":false},"avg_cutoff":{"BA":50},"contact":{"phone":"01935-123456"}},
  {"name":"Government Degree College Bandipora","state":"Jammu & Kashmir","district":"Bandipora","location":[74.6347,34.4079],"courses":["B.A","B.Com","B.Sc"],"facilities":{"hostel":true,"library":true,"lab":false},"avg_cutoff":{"BA":49},"contact":{"phone":"01957-123456"}},
  {"name":"Government Degree College Ganderbal","state":"Jammu & Kashmir","district":"Ganderbal","location":[74.7707,34.2410],"courses":["B.Sc","B.A"],"facilities":{"hostel":false,"library":true,"lab":true},"avg_cutoff":{"BSc":57},"contact":{"phone":"0194-3456789"}},
  {"name":"Government Degree College Budgam","state":"Jammu & Kashmir","district":"Budgam","location":[75.1216,34.6236],"courses":["B.A","B.Com","B.Sc"],"facilities":{"hostel":false,"library":true,"lab":false},"avg_cutoff":{"BA":51},"contact":{"phone":"01951-345678"}},
  {"name":"Government Degree College Srinagar North","state":"Jammu & Kashmir","district":"Srinagar","location":[74.8050,34.1090],"courses":["BCA","B.Sc","B.A"],"facilities":{"hostel":false,"library":true,"lab":true},"avg_cutoff":{"BCA":62},"contact":{"phone":"0194-4567890"}},
  {"name":"Government Degree College Jammu","state":"Jammu & Kashmir","district":"Jammu","location":[74.8570,32.7266],"courses":["B.Com","B.Sc","B.A","BBA"],"facilities":{"hostel":true,"library":true,"lab":true},"avg_cutoff":{"BCom":60},"contact":{"phone":"0191-1234567"}},
  {"name":"Government Degree College Udhampur","state":"Jammu & Kashmir","district":"Udhampur","location":[75.1325,32.9312],"courses":["B.Sc","B.A","B.Com"],"facilities":{"hostel":true,"library":true,"lab":true},"avg_cutoff":{"BSc":55},"contact":{"phone":"01992-123456"}},
  {"name":"Government Degree College Kathua","state":"Jammu & Kashmir","district":"Kathua","location":[75.5236,32.6118],"courses":["B.A","B.Com","B.Sc"],"facilities":{"hostel":false,"library":true,"lab":false},"avg_cutoff":{"BA":53},"contact":{"phone":"01922-123456"}},
  {"name":"Government Degree College Samba","state":"Jammu & Kashmir","district":"Samba","location":[75.1166,32.5294],"courses":["B.A","B.Com","B.Sc"],"facilities":{"hostel":false,"library":true,"lab":false},"avg_cutoff":{"BA":50},"contact":{"phone":"01923-123456"}},
  {"name":"Government Degree College Rajouri","state":"Jammu & Kashmir","district":"Rajouri","location":[74.3089,33.3764],"courses":["B.A","B.Sc","B.Com"],"facilities":{"hostel":true,"library":true,"lab":false},"avg_cutoff":{"BA":48},"contact":{"phone":"01962-123456"}},
  {"name":"Government Degree College Poonch","state":"Jammu & Kashmir","district":"Poonch","location":[74.0940,33.7680],"courses":["B.A","B.Sc"],"facilities":{"hostel":true,"library":true,"lab":false},"avg_cutoff":{"BA":46},"contact":{"phone":"01965-123456"}},
  {"name":"Government Degree College Ramban","state":"Jammu & Kashmir","district":"Ramban","location":[75.18,33.2231],"courses":["B.A","B.Sc"],"facilities":{"hostel":false,"library":true,"lab":false},"avg_cutoff":{"BA":47},"contact":{"phone":"01998-123456"}},
  {"name":"Government Degree College Doda","state":"Jammu & Kashmir","district":"Doda","location":[75.5220,33.1328],"courses":["B.A","B.Sc"],"facilities":{"hostel":true,"library":true,"lab":false},"avg_cutoff":{"BA":45},"contact":{"phone":"01996-123456"}},
  {"name":"Government Degree College Kishtwar","state":"Jammu & Kashmir","district":"Kishtwar","location":[75.7661,33.3115],"courses":["B.A","B.Sc"],"facilities":{"hostel":false,"library":true,"lab":false},"avg_cutoff":{"BA":44},"contact":{"phone":"01997-123456"}},
  {"name":"Government Degree College Reasi","state":"Jammu & Kashmir","district":"Reasi","location":[74.8266,33.0331],"courses":["B.A","B.Com"],"facilities":{"hostel":false,"library":true,"lab":false},"avg_cutoff":{"BA":48},"contact":{"phone":"01991-123456"}},
  {"name":"Government Degree College Kargil","state":"Jammu & Kashmir","district":"Kargil","location":[76.1346,34.5553],"courses":["B.A","B.Sc"],"facilities":{"hostel":true,"library":true,"lab":false},"avg_cutoff":{"BA":50},"contact":{"phone":"01985-123456"}},
  {"name":"Government Degree College Leh","state":"Jammu & Kashmir","district":"Leh","location":[77.5771,34.1526],"courses":["B.A","B.Sc"],"facilities":{"hostel":true,"library":true,"lab":false},"avg_cutoff":{"BA":52},"contact":{"phone":"01982-123456"}},
  {"name":"Government Degree College Katra","state":"Jammu & Kashmir","district":"Reasi","location":[74.9520,32.9866],"courses":["B.A","B.Com"],"facilities":{"hostel":false,"library":true,"lab":false},"avg_cutoff":{"BA":49},"contact":{"phone":"01993-123456"}},
  {"name":"Government Degree College Bhaderwah","state":"Jammu & Kashmir","district":"Doda","location":[75.98,33.02],"courses":["B.A","B.Sc"],"facilities":{"hostel":false,"library":true,"lab":false},"avg_cutoff":{"BA":46},"contact":{"phone":"01994-123456"}},
  {"name":"Government Degree College Gurez","state":"Jammu & Kashmir","district":"Bandipora","location":[74.5460,34.6760],"courses":["B.A"],"facilities":{"hostel":false,"library":true,"lab":false},"avg_cutoff":{"BA":40},"contact":{"phone":"01957-234567"}},
  {"name":"Government Degree College Vailoo (Ganderbal)","state":"Jammu & Kashmir","district":"Ganderbal","location":[74.8030,34.2650],"courses":["B.Sc","B.A"],"facilities":{"hostel":false,"library":true,"lab":true},"avg_cutoff":{"BSc":56},"contact":{"phone":"0194-567890"}},

  // ===== Uttarakhand: Dehradun & Roorkee =====
  {"name":"DIT University","state":"Uttarakhand","district":"Dehradun","location":[78.0736,30.3974],"courses":["B.Tech","M.Tech","MBA"],"facilities":{"hostel":true,"library":true,"lab":true},"avg_cutoff":{"BTech":80},"contact":{"phone":"0135-3000300"}},
  {"name":"Doon University","state":"Uttarakhand","district":"Dehradun","location":[78.0322,30.3165],"courses":["BA","MA","BBA","MBA"],"facilities":{"hostel":true,"library":true,"lab":false},"avg_cutoff":{"BA":65},"contact":{"phone":"0135-2533105"}},
  {"name":"IIT Roorkee","state":"Uttarakhand","district":"Roorkee","location":[77.8961,29.8650],"courses":["B.Tech","M.Tech","PhD"],"facilities":{"hostel":true,"library":true,"lab":true},"avg_cutoff":{"BTech":90},"contact":{"phone":"01332-285311"}},
  {"name":"Quantum University","state":"Uttarakhand","district":"Roorkee","location":[77.8880,29.8543],"courses":["BBA","BCA","B.Tech","MBA"],"facilities":{"hostel":true,"library":true,"lab":true},"avg_cutoff":{"BTech":75},"contact":{"phone":"01332-279505"}},
  {"name":"University of Jammu","state":"Jammu & Kashmir","district":"Jammu","location":[74.8570,32.7266],"courses":["B.Tech","MBA","B.Sc","BA"],"facilities":{"hostel":true,"library":true,"lab":true},"avg_cutoff":{"BTech":85},"contact":{"phone":"0191-2430830"}},
  {"name":"GCW Parade Jammu","state":"Jammu & Kashmir","district":"Jammu","location":[74.8641,32.7357],"courses":["B.Com","BA","B.Sc"],"facilities":{"hostel":false,"library":true,"lab":true},"avg_cutoff":{"BA":65},"contact":{"phone":"0191-2544312"}}
];

async function seed() {
  try {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI missing in env');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Mongo, seeding colleges...');
    await College.deleteMany({});
    const docs = COLLEGES.map(c => ({
      name: c.name,
      state: c.state,
      district: c.district,
      location: { type: 'Point', coordinates: c.location },
      courses: c.courses,
      facilities: c.facilities,
      avg_cutoff: c.avg_cutoff,
      contact: c.contact
    }));
    await College.insertMany(docs);
    console.log('Seeded', docs.length, 'colleges');
    process.exit(0);
  } catch (err) {
    console.error('Seed error', err);
    process.exit(1);
  }
}

seed();
