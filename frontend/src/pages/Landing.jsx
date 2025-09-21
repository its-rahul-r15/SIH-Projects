// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  AcademicCapIcon,
  MapPinIcon,
  ClockIcon,
  ChartBarIcon,
  PlayIcon,
  BookmarkIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  UserIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

// NOTE FOR DEVELOPER:
// The color theme has been updated based on the provided palette.
// For this to work in a real project, you must define these custom colors
// and gradients in your `tailwind.config.js` file.
// Example `tailwind.config.js` extension:
/*
  theme: {
    extend: {
      colors: {
        'primary': '#ffffff',
        'secondary': '#1F1F1F',
        'accent-red': '#FF6B6B',
        'accent-yellow': '#FFD93D',
        'accent-green': '#6BCB77',
        'accent-blue': '#4D96FF',
        'accent-purple': '#9B5DE5',
        'accent-pink': '#F15BB5',
        'accent-orange': '#FF6A00',
        'text-primary': '#ffffff',
        'text-secondary': '#E5E5E5',
        'text-dark': '#1F1F1F',
        'bg-dark': '#1F1F1F',
        'bg-light': '#F5F5F5',
      },
      backgroundImage: {
        'gradient-red-yellow': 'linear-gradient(135deg, #FF6B6B, #FFD93D)',
        'gradient-green-blue': 'linear-gradient(135deg, #6BCB77, #4D96FF)',
        // ... etc.
      }
    }
  }
*/


export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [savedColleges, setSavedColleges] = useState([]);

  // Mock data
  const colleges = [
    {
      id: 1,
      name: "Government Engineering College",
      district: "Mumbai",
      courses: ["B.Tech Computer Science", "B.Tech Mechanical"],
      cutoff: "85%",
      facilities: ["Hostel", "Library", "Lab"],
      medium: "English",
      contact: "+91-98765-43210",
      distanceKm: 2.5,
      lat: 19.0760,
      lon: 72.8777
    },
    {
      id: 2,
      name: "State Medical College",
      district: "Pune",
      courses: ["MBBS", "BDS"],
      cutoff: "92%",
      facilities: ["Hospital", "Hostel", "Research Lab"],
      medium: "English",
      contact: "+91-98765-43211",
      distanceKm: 15.2,
      lat: 18.5204,
      lon: 73.8567
    }
  ];

  const quizQuestions = [
    {
      question: "What subjects interest you the most?",
      options: ["Math & Science", "Commerce & Business", "Arts & Literature", "Social Sciences"]
    },
    {
      question: "What type of career appeals to you?",
      options: ["Technical & Engineering", "Healthcare & Medicine", "Creative & Design", "Teaching & Research"]
    },
    {
      question: "How do you prefer to work?",
      options: ["Problem-solving", "Working with people", "Creative expression", "Analysis & research"]
    }
  ];

  useEffect(() => {
    // Apply dark mode class
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleQuizAnswer = (answerIndex) => {
    const newAnswers = [...quizAnswers, answerIndex];
    setQuizAnswers(newAnswers);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate result based on answers
      const result = calculateQuizResult(newAnswers);
      setQuizStep('result');
    }
  };

  const calculateQuizResult = (answers) => {
    // Simple logic to determine stream based on answers
    const scienceScore = answers.filter(a => a === 0).length;
    const commerceScore = answers.filter(a => a === 1).length;
    const artsScore = answers.filter(a => a === 2 || a === 3).length;

    if (scienceScore >= 2) return { stream: "Science", courses: ["Engineering", "Medicine"] };
    if (commerceScore >= 2) return { stream: "Commerce", courses: ["CA", "MBA"] };
    return { stream: "Arts", courses: ["Literature", "Psychology"] };
  };

  const saveCollege = (college) => {
    if (!savedColleges.find(c => c.id === college.id)) {
      setSavedColleges([...savedColleges, college]);
    }
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-dark dark:text-text-primary">
      {/* Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent-blue text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav className="bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md border-b border-black/10 dark:border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-accent-blue to-accent-purple rounded-xl flex items-center justify-center">
                  <AcademicCapIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-text-dark dark:text-text-primary">PathFinder</h1>
                  <p className="text-xs text-text-dark/70 dark:text-text-secondary/70">Career Guidance Platform</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="text-text-dark/80 dark:text-text-secondary hover:text-accent-blue dark:hover:text-accent-blue px-3 py-2 text-sm font-medium transition-colors">
                  Home
                </a>
                <a href="#features" className="text-text-dark/80 dark:text-text-secondary hover:text-accent-blue dark:hover:text-accent-blue px-3 py-2 text-sm font-medium transition-colors">
                  Features
                </a>
                <a href="#directory" className="text-text-dark/80 dark:text-text-secondary hover:text-accent-blue dark:hover:text-accent-blue px-3 py-2 text-sm font-medium transition-colors">
                  Colleges
                </a>
                <a href="#quiz" className="text-text-dark/80 dark:text-text-secondary hover:text-accent-blue dark:hover:text-accent-blue px-3 py-2 text-sm font-medium transition-colors">
                  Quiz
                </a>
                <a href="#timeline" className="text-text-dark/80 dark:text-text-secondary hover:text-accent-blue dark:hover:text-accent-blue px-3 py-2 text-sm font-medium transition-colors">
                  Timeline
                </a>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Dark mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <SunIcon className="h-5 w-5 text-text-dark dark:text-text-secondary" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-text-dark dark:text-text-secondary" />
                )}
              </button>

              {/* Profile button */}
              <button
                onClick={() => setProfileOpen(true)}
                className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                aria-label="Open profile"
              >
                <UserIcon className="h-5 w-5 text-text-dark dark:text-text-secondary" />
              </button>

              {/* Sign In Button */}
              <button className="bg-gradient-to-r from-accent-orange to-accent-red hover:from-accent-orange/90 hover:to-accent-red/90 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
                Sign In
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-text-dark dark:text-text-secondary hover:bg-black/5 dark:hover:bg-white/5"
                aria-label="Open mobile menu"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-bg-light dark:bg-secondary border-t border-black/10 dark:border-white/10"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#home" className="block px-3 py-2 text-text-dark dark:text-text-secondary hover:bg-black/5 dark:hover:bg-white/10 rounded-md">Home</a>
                <a href="#features" className="block px-3 py-2 text-text-dark dark:text-text-secondary hover:bg-black/5 dark:hover:bg-white/10 rounded-md">Features</a>
                <a href="#directory" className="block px-3 py-2 text-text-dark dark:text-text-secondary hover:bg-black/5 dark:hover:bg-white/10 rounded-md">Colleges</a>
                <a href="#quiz" className="block px-3 py-2 text-text-dark dark:text-text-secondary hover:bg-black/5 dark:hover:bg-white/10 rounded-md">Quiz</a>
                <a href="#timeline" className="block px-3 py-2 text-text-dark dark:text-text-secondary hover:bg-black/5 dark:hover:bg-white/10 rounded-md">Timeline</a>
                <button className="w-full mt-4 bg-gradient-to-r from-accent-orange to-accent-red text-white px-6 py-2 rounded-xl font-semibold">
                  Sign In
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main id="main-content">
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-accent-purple to-accent-pink text-text-primary">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <p className="text-text-secondary text-lg mb-4 font-medium">
                  PathFinder — Find the right degree, college & career path after Class 12.
                </p>

                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                  Choose the right{' '}
                  <span className="bg-gradient-to-r from-accent-yellow to-accent-orange bg-clip-text text-transparent">
                    stream
                  </span>
                  . Enrol in the right{' '}
                  <span className="bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent">
                    college
                  </span>
                  . Build your future.
                </h1>

                <p className="text-xl text-text-secondary mb-8 max-w-2xl">
                  Personalized aptitude quizzes, local government college listings, and clear course→career maps — all in one place.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-gradient-to-r from-accent-orange to-accent-red hover:from-accent-orange/90 hover:to-accent-red/90 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                  >
                    <PlayIcon className="h-5 w-5 mr-2" />
                    Take the Quiz
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/30 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 flex items-center justify-center"
                  >
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    Find Colleges Near Me
                  </motion.button>
                </div>

                {/* Micro Stats */}
                <div className="flex flex-wrap gap-6">
                  {[
                    { number: "200+", label: "colleges", color: "from-accent-blue to-accent-purple" },
                    { number: "Free", label: "guidance", color: "from-accent-green to-accent-blue" },
                    { number: "Pilot", label: "districts", color: "from-accent-purple to-accent-pink" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                      className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
                    >
                      <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                        {stat.number}
                      </div>
                      <div className="text-text-secondary font-medium text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Illustration */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  {/* Placeholder illustration */}
                  <div className="w-full h-96 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <AcademicCapIcon className="h-24 w-24 text-white/70 mx-auto mb-4" />
                      <p className="text-white/70 font-medium">Hero Illustration Placeholder</p>
                      <p className="text-white/50 text-sm mt-2">Replace with actual SVG illustration</p>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-accent-yellow to-accent-orange rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-2xl">🎯</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-bg-light dark:bg-bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-dark dark:text-text-primary mb-4">
                What PathFinder offers
              </h2>
              <p className="text-xl text-text-dark/70 dark:text-text-secondary max-w-3xl mx-auto">
                A one-stop personalized guidance platform for students to choose subjects, discover colleges, and plan the path ahead.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Aptitude Quiz",
                  description: "Short quizzes to recommend streams & courses",
                  icon: ChartBarIcon,
                  gradient: "from-accent-blue to-accent-purple"
                },
                {
                  title: "Course → Career Mapping",
                  description: "Visual path from degree to jobs & higher study",
                  icon: MapPinIcon,
                  gradient: "from-accent-purple to-accent-pink"
                },
                {
                  title: "Nearby Government Colleges",
                  description: "Location-based list with facilities & cutoffs",
                  icon: AcademicCapIcon,
                  gradient: "from-accent-green to-accent-blue"
                },
                {
                  title: "Timeline Tracker",
                  description: "Admission dates, scholarship windows & reminders",
                  icon: ClockIcon,
                  gradient: "from-accent-orange to-accent-red"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-secondary rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-black/5 dark:border-white/10"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-dark dark:text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-dark/70 dark:text-text-secondary">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Directory Section */}
        <section id="directory" className="py-20 bg-bg-light dark:bg-bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-text-dark dark:text-text-primary mb-4">
                Find Government Colleges Near You
              </h2>
              <p className="text-xl text-text-dark/70 dark:text-text-secondary">
                Discover the best government colleges in your area with detailed information about courses, cutoffs, and facilities.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Search and Results */}
              <div className="space-y-6">
                {/* Search and Filters */}
                <div className="bg-white dark:bg-secondary rounded-2xl p-6 shadow-lg">
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                      <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-dark/50 dark:text-text-secondary/50" />
                      <input
                        type="text"
                        placeholder="Search colleges..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-black/20 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-accent-blue focus:border-transparent bg-bg-light dark:bg-bg-dark text-text-dark dark:text-text-primary"
                      />
                    </div>
                    <select
                      value={selectedStream}
                      onChange={(e) => setSelectedStream(e.target.value)}
                      className="px-4 py-3 border border-black/20 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-accent-blue focus:border-transparent bg-bg-light dark:bg-bg-dark text-text-dark dark:text-text-primary"
                    >
                      <option value="">All Streams</option>
                      <option value="engineering">Engineering</option>
                      <option value="medical">Medical</option>
                      <option value="commerce">Commerce</option>
                      <option value="arts">Arts</option>
                    </select>
                  </div>

                  {/* Facility Filters */}
                  <div className="flex flex-wrap gap-3">
                    {["Hostel", "Library", "Lab", "Hospital", "Sports"].map((facility) => (
                      <button
                        key={facility}
                        className="px-4 py-2 bg-black/5 dark:bg-white/5 hover:bg-accent-blue/10 dark:hover:bg-accent-blue/20 rounded-lg text-sm font-medium transition-colors"
                      >
                        {facility}
                      </button>
                    ))}
                  </div>
                </div>

                {/* College Results */}
                <div className="space-y-4">
                  {colleges.map((college) => (
                    <motion.div
                      key={college.id}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      onClick={() => setSelectedCollege(college)}
                      className={`bg-white dark:bg-secondary rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 ${selectedCollege?.id === college.id
                        ? 'border-accent-blue ring-2 ring-accent-blue/20'
                        : 'border-transparent'
                        }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-text-dark dark:text-text-primary mb-1">
                            {college.name}
                          </h3>
                          <p className="text-text-dark/70 dark:text-text-secondary">
                            {college.district} • {college.distanceKm} km away
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${college.distanceKm < 6
                          ? 'bg-accent-green/10 text-accent-green'
                          : 'bg-black/5 text-text-dark/70 dark:bg-white/5 dark:text-text-secondary'
                          }`}>
                          {college.distanceKm < 6 ? 'Recommended' : 'Available'}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-text-dark dark:text-text-primary mb-2">
                          Courses Available:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {college.courses.map((course, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-accent-blue/10 text-accent-blue rounded-lg text-sm"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-text-dark/70 dark:text-text-secondary">
                          Cutoff: <span className="font-semibold text-text-dark dark:text-text-primary">{college.cutoff}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              saveCollege(college);
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 bg-accent-orange/10 hover:bg-accent-orange/20 text-accent-orange rounded-lg text-sm font-medium transition-colors"
                          >
                            <BookmarkIcon className="h-4 w-4" />
                            Save
                          </button>
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-accent-blue/10 hover:bg-accent-blue/20 text-accent-blue rounded-lg text-sm font-medium transition-colors">
                            <EyeIcon className="h-4 w-4" />
                            View
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: Map Placeholder */}
              <div className="bg-white dark:bg-secondary rounded-2xl p-6 shadow-lg">
                <div className="w-full h-96 bg-black/5 dark:bg-white/5 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPinIcon className="h-16 w-16 text-text-dark/40 dark:text-text-secondary/40 mx-auto mb-4" />
                    <p className="text-text-dark/70 dark:text-text-secondary font-medium">Interactive Map</p>
                    <p className="text-text-dark/50 dark:text-text-secondary/50 text-sm mt-2">
                      Replace with react-leaflet component
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Preview Section */}
        <section id="quiz" className="py-20 bg-bg-light dark:bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-text-dark dark:text-text-primary mb-4">
                Career Aptitude Quiz
              </h2>
              <p className="text-xl text-text-dark/70 dark:text-text-secondary">
                Discover your ideal career path with our scientifically-designed aptitude assessment.
              </p>
            </motion.div>

            <div className="bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 dark:from-accent-blue/10 dark:to-accent-purple/10 rounded-2xl p-8 shadow-xl">
              {quizStep === 'result' ? (
                /* Quiz Result */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-accent-green to-accent-blue rounded-full flex items-center justify-center mx-auto mb-6">
                    <ChartBarIcon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-dark dark:text-text-primary mb-4">
                    Your Recommended Stream: {calculateQuizResult(quizAnswers).stream}
                  </h3>
                  <p className="text-text-dark/70 dark:text-text-secondary mb-6">
                    Based on your responses, here are your top career paths:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {calculateQuizResult(quizAnswers).courses.map((course, index) => (
                      <div key={index} className="bg-white/50 dark:bg-secondary/50 rounded-xl p-4 shadow-lg">
                        <h4 className="font-bold text-text-dark dark:text-text-primary">{course}</h4>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-text-dark dark:text-text-primary">Next Steps:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button className="bg-gradient-to-r from-accent-blue to-accent-purple text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                        Apply Now
                      </button>
                      <button className="bg-gradient-to-r from-accent-green to-accent-blue text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                        Read Materials
                      </button>
                      <button className="bg-gradient-to-r from-accent-orange to-accent-pink text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                        Find Scholarships
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setQuizStep(0);
                      setQuizAnswers([]);
                    }}
                    className="mt-6 text-accent-blue dark:text-accent-blue hover:underline"
                  >
                    Take Quiz Again
                  </button>
                </motion.div>
              ) : (
                /* Quiz Questions */
                <div>
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between text-sm text-text-dark/70 dark:text-text-secondary mb-2">
                      <span>Question {quizStep + 1} of {quizQuestions.length}</span>
                      <span>{Math.round(((quizStep + 1) / quizQuestions.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-accent-blue to-accent-purple h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <motion.div
                    key={quizStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-text-dark dark:text-text-primary mb-8 text-center">
                      {quizQuestions[quizStep].question}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {quizQuestions[quizStep].options.map((option, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleQuizAnswer(index)}
                          className="bg-white/50 dark:bg-secondary/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-left border-2 border-transparent hover:border-accent-blue"
                        >
                          <p className="font-semibold text-text-dark dark:text-text-primary">{option}</p>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="py-20 bg-bg-light dark:bg-bg-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-text-dark dark:text-text-primary mb-4">
                Important Dates & Timeline
              </h2>
              <p className="text-xl text-text-dark/70 dark:text-text-secondary">
                Stay on track with admission deadlines and scholarship opportunities.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent-blue to-accent-purple rounded-full"></div>

              <div className="space-y-12">
                {[
                  {
                    date: "March 2025",
                    title: "Board Exam Results",
                    description: "Class 12 results announcement for most state boards",
                    type: "important"
                  },
                  {
                    date: "April 2025",
                    title: "College Applications Open",
                    description: "Start of admission process for government colleges",
                    type: "deadline"
                  },
                  {
                    date: "May 2025",
                    title: "Entrance Exams",
                    description: "JEE, NEET, and other competitive exams",
                    type: "exam"
                  },
                  {
                    date: "June 2025",
                    title: "Counselling Process",
                    description: "Choice filling and seat allocation begins",
                    type: "process"
                  },
                  {
                    date: "July 2025",
                    title: "Classes Begin",
                    description: "Academic year starts for most colleges",
                    type: "milestone"
                  }
                ].map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}
                  >
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full flex items-center justify-center shadow-lg relative z-10">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white dark:bg-secondary rounded-2xl p-6 shadow-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-text-dark dark:text-text-primary mb-2">
                            {event.title}
                          </h3>
                          <p className="text-text-dark/70 dark:text-text-secondary">
                            {event.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-full">
                            {event.date}
                          </span>
                          <button
                            className="text-accent-orange hover:bg-accent-orange/10 p-2 rounded-lg transition-colors"
                            aria-label="Add reminder"
                          >
                            <ClockIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-secondary text-text-primary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-accent-blue to-accent-purple rounded-xl flex items-center justify-center mr-3">
                    <AcademicCapIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">PathFinder</h3>
                    <p className="text-sm text-text-secondary">Career Guidance Platform</p>
                  </div>
                </div>
                <p className="text-text-secondary max-w-md">
                  Empowering students to make informed decisions about their academic and career journey through personalized guidance and comprehensive resources.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <a href="#features" className="block text-text-secondary hover:text-white transition-colors">Features</a>
                  <a href="#directory" className="block text-text-secondary hover:text-white transition-colors">College Directory</a>
                  <a href="#quiz" className="block text-text-secondary hover:text-white transition-colors">Aptitude Quiz</a>
                  <a href="#timeline" className="block text-text-secondary hover:text-white transition-colors">Timeline</a>
                </div>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-text-secondary hover:text-white transition-colors">Help Center</a>
                  <a href="#" className="block text-text-secondary hover:text-white transition-colors">Contact Us</a>
                  <a href="#" className="block text-text-secondary hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="block text-text-secondary hover:text-white transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>

            <div className="border-t border-white/20 pt-8 text-center">
              <p className="text-text-secondary">
                © 2025 PathFinder. Built for student success. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Profile Slide-over */}
      <AnimatePresence>
        {profileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setProfileOpen(false)}
            />

            {/* Profile Panel */}
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed right-0 top-0 h-full w-80 bg-bg-light dark:bg-secondary shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-text-dark dark:text-text-primary">Profile</h3>
                  <button
                    onClick={() => setProfileOpen(false)}
                    className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg"
                  >
                    <XMarkIcon className="h-5 w-5 text-text-dark/70 dark:text-text-secondary" />
                  </button>
                </div>

                {/* Mock User Info */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">JS</span>
                  </div>
                  <h4 className="font-bold text-text-dark dark:text-text-primary">John Student</h4>
                  <p className="text-text-dark/70 dark:text-text-secondary">Class 12 - Science</p>
                </div>

                {/* Recommended Streams */}
                <div className="mb-6">
                  <h5 className="font-semibold text-text-dark dark:text-text-primary mb-3">Recommended Streams</h5>
                  <div className="space-y-2">
                    <div className="bg-accent-green/10 text-accent-green px-3 py-2 rounded-lg">
                      Engineering (95% match)
                    </div>
                    <div className="bg-accent-blue/10 text-accent-blue px-3 py-2 rounded-lg">
                      Medicine (87% match)
                    </div>
                  </div>
                </div>

                {/* Saved Colleges */}
                <div>
                  <h5 className="font-semibold text-text-dark dark:text-text-primary mb-3">
                    Saved Colleges ({savedColleges.length})
                  </h5>
                  <div className="space-y-3">
                    {savedColleges.map((college) => (
                      <div key={college.id} className="bg-black/5 dark:bg-white/5 p-3 rounded-lg">
                        <h6 className="font-medium text-text-dark dark:text-text-primary text-sm">
                          {college.name}
                        </h6>
                        <p className="text-text-dark/70 dark:text-text-secondary text-xs">
                          {college.district} • {college.distanceKm} km
                        </p>
                      </div>
                    ))}
                    {savedColleges.length === 0 && (
                      <p className="text-text-dark/60 dark:text-text-secondary/60 text-sm">
                        No saved colleges yet. Browse the directory to save colleges you're interested in.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}