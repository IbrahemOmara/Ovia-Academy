import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Play, Loader2 } from 'lucide-react';

const CourseCarousel = ({ apiUrl = 'https://ruwadvisionapi.nasatechnology.net/api/Courses/GetAllCourses?showInHomePage=true&limit=12&page=1' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب البيانات من API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // التأكد من أن البيانات في الشكل المطلوب
        const coursesArray = Array.isArray(data) ? data : [];
        
        const formattedCourses = coursesArray.map(course => ({
          id: course.id || course.courseId,
          title: course.name || course.title,
          category: course.category?.name || course.categoryName || 'DESIGN',
          originalPrice: course.oldPrice || course.price || 0,
          discountedPrice: course.price || course.discountedPrice || 0,
          discount: course.oldPrice && course.price ? Math.round(((course.oldPrice - course.price) / course.oldPrice) * 100) : 0,
          image: course.photo || course.picture || course.image || '/placeholder-course.jpg',
          rating: course.rate || 5,
          students: course.numberOfStudent || course.students || 0,
          duration: course.totalHouers ? `${course.totalHouers}x Lesson` : (course.noOfVideos ? `${course.noOfVideos}x Lesson` : '25x Lesson'),
          instructor: course.instractorName?.[0] || course.instructors?.[0]?.name || 'Expert Instructor'
        }));
        
        setCourses(formattedCourses);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [apiUrl]);

  // حالة التحميل
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-yellow-400 mx-auto mb-4" />
            <p className="text-gray-300 text-lg">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  // حالة الخطأ
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-gray-900/50 border border-red-500/30 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-red-400 mb-2">Error loading courses</h3>
          <p className="text-gray-300 mb-4">Could not fetch courses. Please try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // إذا لم توجد كورسات
  if (!courses || courses.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No courses available</h3>
          <p className="text-gray-500">New courses will be added soon</p>
        </div>
      </div>
    );
  }

  const itemsPerPage = 3;
  const maxIndex = Math.max(0, courses.length - itemsPerPage);
  
  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-bold text-white mb-3">
            Most <span className="text-yellow-400">Popular Courses</span>
          </h2>
          <p className="text-gray-400 text-lg">Let's join our best classes with our famous instructors and institutes.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 hover:text-black transition-all duration-300 group"
          >
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black" />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 hover:text-black transition-all duration-300 group"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-black" />
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.slice(currentIndex, currentIndex + itemsPerPage).map((course) => (
          <div
            key={course.id}
            className="group cursor-pointer"
          >
            {/* Course Card */}
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2">
              {/* Image */}
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-black ml-1" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Duration and Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div className="mb-4">
                  <span className="text-xs font-bold text-gray-500 tracking-wider uppercase">
                    IN {course.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-6 line-clamp-2 leading-tight group-hover:text-yellow-400 transition-colors">
                  {course.title}
                </h3>

                {/* Get Started Button */}
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-12">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-yellow-500 w-8'
                : 'bg-gray-700 w-2 hover:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseCarousel;