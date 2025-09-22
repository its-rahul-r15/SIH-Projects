import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getColleges } from '../api/collegeService';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const collegeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function Colleges() {
  const [colleges, setColleges] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: 30.3165, lon: 78.0322 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    course: '',
    state: '',
    district: ''
  });
  const [selectedCollege, setSelectedCollege] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setUserLocation({ lat, lon });
        },
        (err) => {
          console.error("Geolocation error:", err);
          setUserLocation({ lat: 30.3165, lon: 78.0322 });
        }
      );
    } else {
      console.error("Geolocation not supported");
      setUserLocation({ lat: 30.3165, lon: 78.0322 });
    }
  }, []);

  useEffect(() => {
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

  // Filter colleges based on search and filters
  const filteredColleges = useMemo(() => {
    return colleges.filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.state.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCourse = !filters.course || college.courses.some(course => 
        course.toLowerCase().includes(filters.course.toLowerCase())
      );
      
      const matchesState = !filters.state || college.state.toLowerCase().includes(filters.state.toLowerCase());
      const matchesDistrict = !filters.district || college.district.toLowerCase().includes(filters.district.toLowerCase());
      
      return matchesSearch && matchesCourse && matchesState && matchesDistrict;
    });
  }, [colleges, searchTerm, filters]);

  // Get unique values for filters
  const uniqueCourses = useMemo(() => {
    const allCourses = colleges.flatMap(c => c.courses);
    return [...new Set(allCourses)].sort();
  }, [colleges]);

  const uniqueStates = useMemo(() => {
    return [...new Set(colleges.map(c => c.state))].sort();
  }, [colleges]);

  const uniqueDistricts = useMemo(() => {
    return [...new Set(colleges.map(c => c.district))].sort();
  }, [colleges]);

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ course: '', state: '', district: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-4">
                <div className="h-12 bg-gray-300 rounded"></div>
                <div className="h-64 bg-gray-300 rounded"></div>
              </div>
              <div className="lg:col-span-2">
                <div className="h-96 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-2">🎓 Nearby Colleges</h1>
              <p className="text-blue-100 text-lg">
                Discover colleges near you within 100km radius
              </p>
              <div className="flex items-center mt-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full max-w-md">
                <span className="text-lg mr-2">📍</span>
                <span className="text-sm">
                  Your location: {userLocation.lat.toFixed(4)}, {userLocation.lon.toFixed(4)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search colleges by name, district, or state..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Course Filter */}
            <select
              value={filters.course}
              onChange={(e) => setFilters(prev => ({ ...prev, course: e.target.value }))}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Courses</option>
              {uniqueCourses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>

            {/* State Filter */}
            <select
              value={filters.state}
              onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value }))}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All States</option>
              {uniqueStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* District Filter and Clear Button */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
            <select
              value={filters.district}
              onChange={(e) => setFilters(prev => ({ ...prev, district: e.target.value }))}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:col-span-3"
            >
              <option value="">All Districts</option>
              {uniqueDistricts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>

            <button
              onClick={clearFilters}
              className="px-4 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-semibold"
            >
              Clear Filters
            </button>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex justify-between items-center">
            <span className="text-gray-600">
              Showing {filteredColleges.length} of {colleges.length} colleges
            </span>
            {filteredColleges.length === 0 && (
              <span className="text-red-500 text-sm">
                No colleges match your filters
              </span>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colleges List */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 h-[600px] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Colleges List</h2>
              
              {filteredColleges.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl mb-2">😔</span>
                  <p>No colleges found matching your criteria</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredColleges.map((college) => (
                    <div
                      key={college._id}
                      onClick={() => setSelectedCollege(college)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedCollege?._id === college._id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <h3 className="font-bold text-gray-800 mb-2">{college.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <span className="mr-2">📍</span>
                        {college.district}, {college.state}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {college.courses.slice(0, 3).map((course, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                          >
                            {course}
                          </span>
                        ))}
                        {college.courses.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            +{college.courses.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">College Locations</h2>
              <div className="h-[600px] rounded-xl overflow-hidden">
                <MapContainer 
                  center={[userLocation.lat, userLocation.lon]} 
                  zoom={11} 
                  style={{ height: '100%', width: '100%' }} 
                  scrollWheelZoom={true}
                >
                  <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {/* User location marker */}
                  <Marker 
                    position={[userLocation.lat, userLocation.lon]} 
                    icon={userIcon}
                  >
                    <Popup>
                      <div className="text-center">
                        <strong>📍 Your Location</strong>
                        <br />
                        <span className="text-sm">
                          {userLocation.lat.toFixed(4)}, {userLocation.lon.toFixed(4)}
                        </span>
                      </div>
                    </Popup>
                  </Marker>

                  {/* College markers */}
                  {filteredColleges.map((college) => (
                    <Marker 
                      key={college._id} 
                      position={[college.location.coordinates[1], college.location.coordinates[0]]}
                      icon={collegeIcon}
                      eventHandlers={{
                        click: () => setSelectedCollege(college),
                      }}
                    >
                      <Popup>
                        <div className="min-w-[200px]">
                          <strong className="text-blue-600">{college.name}</strong>
                          <br />
                          <span className="text-sm">{college.district}, {college.state}</span>
                          <br />
                          <div className="mt-2">
                            <strong>Courses:</strong>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {college.courses.slice(0, 3).map((course, idx) => (
                                <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Selected College Details */}
        {selectedCollege && (
          <div className="mt-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{selectedCollege.name}</h2>
              <button
                onClick={() => setSelectedCollege(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">📍 Location</h3>
                <p>{selectedCollege.district}, {selectedCollege.state}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Coordinates: {selectedCollege.location.coordinates[1].toFixed(4)}, 
                  {selectedCollege.location.coordinates[0].toFixed(4)}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">🎓 Available Courses</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCollege.courses.map((course, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}