import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getColleges } from '../api/collegeService';

export default function Colleges() {
  const [colleges, setColleges] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: 30.3165, lon: 78.0322 }); // default Dehradun
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Step 1: Get real user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setUserLocation({ lat, lon });
        },
        (err) => {
          console.error("Geolocation error:", err);
          // fallback location: Dehradun
          setUserLocation({ lat: 30.3165, lon: 78.0322 });
        }
      );
    } else {
      console.error("Geolocation not supported");
      setUserLocation({ lat: 30.3165, lon: 78.0322 });
    }
  }, []);

  useEffect(() => {
    // 🔹 Step 2: Fetch colleges after we have location
    (async () => {
      try {
        const res = await getColleges({ 
          lat: userLocation.lat, 
          lon: userLocation.lon, 
          withinKm: 100 
        });
        setColleges(res.data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [userLocation]);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Nearby Colleges</h2>
      {loading ? (
        <p>Fetching your location & nearby colleges...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            {colleges.map((c) => (
              <div key={c._id} className="p-3 border rounded mb-2">
                <h3 className="font-semibold">{c.name}</h3>
                <div>{c.district}, {c.state}</div>
                <div className="text-sm">Courses: {c.courses.join(', ')}</div>
              </div>
            ))}
          </div>
          <div>
            <MapContainer 
              center={[userLocation.lat, userLocation.lon]} 
              zoom={11} 
              style={{ height: 400 }} 
              scrollWheelZoom={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              
              {/* 🔹 User location marker */}
              <Marker position={[userLocation.lat, userLocation.lon]}>
                <Popup>
                  <strong>You are here</strong>
                </Popup>
              </Marker>

              {/* 🔹 Colleges markers */}
              {colleges.map((c) => (
                <Marker 
                  key={c._id} 
                  position={[c.location.coordinates[1], c.location.coordinates[0]]}
                >
                  <Popup>
                    <div>
                      <strong>{c.name}</strong>
                      <br />
                      {c.district}
                      <br />
                      {c.courses.join(', ')}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
}
