import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../features/theme/themeSlice';
import { ChevronDown, Code2, Users, Brain, BarChart3, ArrowRight, Star, Zap, Shield, Clock, Sun, Moon, Sparkles } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isDarkMode } = useSelector((state) => state.theme);
  const [email, setEmail] = useState('');
  
  // Floating animation effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <div className={`min-h-screen overflow-hidden relative transition-all duration-300 ease-in-out ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-gray-800'
    }`}>
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating elements - Enhanced for both themes */}
        <div className={`absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-purple-500/15 via-pink-500/10 to-blue-500/12' 
            : 'bg-gradient-to-r from-purple-400/30 via-pink-400/20 to-blue-400/25'
        }`}></div>
        <div className={`absolute top-3/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-blue-500/12 via-cyan-500/15 to-teal-500/10' 
            : 'bg-gradient-to-r from-blue-400/25 via-cyan-400/30 to-teal-400/20'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 w-40 h-40 rounded-full blur-2xl animate-bounce transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-pink-500/15 via-rose-500/12 to-orange-500/15' 
            : 'bg-gradient-to-r from-pink-400/35 via-rose-400/25 to-orange-400/30'
        }`}></div>
        
        {/* Medium floating elements */}
        <div className={`absolute top-16 right-16 w-48 h-48 rounded-full blur-2xl animate-pulse delay-500 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-emerald-500/12 via-green-500/10 to-teal-500/12' 
            : 'bg-gradient-to-r from-emerald-400/25 via-green-400/20 to-teal-400/25'
        }`}></div>
        <div className={`absolute bottom-20 left-16 w-64 h-64 rounded-full blur-3xl animate-pulse delay-2000 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-indigo-500/15 via-purple-500/12 to-blue-500/10' 
            : 'bg-gradient-to-r from-indigo-400/30 via-purple-400/25 to-blue-400/20'
        }`}></div>
        <div className={`absolute top-1/3 right-1/3 w-32 h-32 rounded-full blur-xl animate-bounce delay-1500 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-yellow-500/15 via-amber-500/12 to-orange-500/15' 
            : 'bg-gradient-to-r from-yellow-400/30 via-amber-400/25 to-orange-400/30'
        }`}></div>
        
        {/* Small floating dots with enhanced visibility */}
        <div className={`absolute top-24 left-1/3 w-20 h-20 rounded-full blur-lg animate-bounce delay-700 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-violet-500/15 to-purple-500/12' 
            : 'bg-gradient-to-r from-violet-500/40 to-purple-500/35'
        }`}></div>
        <div className={`absolute bottom-40 right-24 w-24 h-24 rounded-full blur-lg animate-pulse delay-1200 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-blue-500/12 to-cyan-500/10' 
            : 'bg-gradient-to-r from-blue-500/35 to-cyan-500/30'
        }`}></div>
        <div className={`absolute top-72 left-24 w-16 h-16 rounded-full blur-sm animate-bounce delay-2500 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-green-500/15 to-emerald-500/12' 
            : 'bg-gradient-to-r from-green-500/45 to-emerald-500/40'
        }`}></div>
        
        {/* Additional sparkle elements for light mode */}
        <div className={`absolute top-1/6 left-1/6 w-6 h-6 rounded-full blur-sm animate-ping delay-1000 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20' 
            : 'bg-gradient-to-r from-yellow-400 to-amber-400'
        }`}></div>
        <div className={`absolute bottom-1/6 right-1/6 w-8 h-8 rounded-full blur-sm animate-ping delay-2000 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20' 
            : 'bg-gradient-to-r from-pink-400 to-rose-400'
        }`}></div>
      </div>

      {/* Enhanced Floating Mouse Follower */}
      <div 
        className={`absolute w-8 h-8 rounded-full blur-sm pointer-events-none transition-all duration-300 ease-out z-10 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-purple-400 to-pink-400 opacity-20' 
            : 'bg-gradient-to-r from-purple-500 to-pink-500 opacity-30'
        }`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-ping opacity-75"></div>
      </div>

      {/* Header with no border - seamlessly connected to hero */}
      <header className={`relative z-20 px-6 py-6 backdrop-blur-md transition-all duration-300 ${
        isDarkMode 
          ? 'bg-slate-900/20' 
          : 'bg-white/10'
      }`}>
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <Code2 className={`w-8 h-8 group-hover:scale-110 transition-transform duration-300 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`} />
              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping ${
                isDarkMode ? 'bg-pink-400' : 'bg-pink-500'
              }`}></div>
              <Sparkles className="absolute -bottom-1 -left-1 w-3 h-3 text-yellow-400 animate-pulse" />
            </div>
            <span className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode 
                ? 'from-purple-400 to-pink-400' 
                : 'from-purple-600 to-pink-600'
            }`}>
              CodeBuddy
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className={`font-medium transition-colors cursor-pointer hover:scale-105 active:scale-95 transform duration-200 ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-purple-400' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className={`font-medium transition-colors cursor-pointer hover:scale-105 active:scale-95 transform duration-200 ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-purple-400' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              How it Works
            </button>
            
            {/* Enhanced Theme Toggle Button */}
            <button
              onClick={handleThemeToggle}
              className={`group relative p-3 rounded-xl backdrop-blur-sm cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl ${
                isDarkMode 
                  ? 'bg-slate-800/80 border border-slate-600/50' 
                  : 'bg-white/80 border border-gray-200/50'
              }`}
              aria-label="Toggle theme"
            >
              <div className="relative w-5 h-5">
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-90 transition-transform duration-300" />
                ) : (
                  <Moon className="w-5 h-5 text-purple-600 group-hover:-rotate-12 transition-transform duration-300" />
                )}
              </div>
              <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-400/20 to-blue-400/20' 
                  : 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20'
              }`}></div>
            </button>

            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl cursor-pointer hover:scale-105 active:scale-95 font-medium"
              >
                Dashboard
              </button>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className={`px-6 py-3 backdrop-blur-sm rounded-xl cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl font-medium ${
                  isDarkMode 
                    ? 'bg-slate-800/80 border border-slate-600/50 text-purple-400' 
                    : 'bg-white/90 border border-gray-200/50 text-purple-600'
                }`}
              >
                Sign In
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section - seamlessly connected to header */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className={`inline-flex items-center px-6 py-3 backdrop-blur-sm rounded-full text-sm font-medium transition-all duration-300 shadow-lg ${
                isDarkMode 
                  ? 'bg-purple-900/70 border border-purple-700/50 text-purple-300' 
                  : 'bg-purple-100/80 border border-purple-200/60 text-purple-800'
              }`}>
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
                <span className={`bg-gradient-to-r bg-clip-text text-transparent font-semibold ${
                  isDarkMode 
                    ? 'from-purple-300 to-pink-300' 
                    : 'from-purple-800 to-pink-800'
                }`}>
                  Practice Coding Together - Join Early Access
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight transition-all duration-300">
                <span className={`bg-gradient-to-r bg-clip-text text-transparent drop-shadow-sm ${
                  isDarkMode 
                    ? 'from-white via-purple-300 to-pink-300' 
                    : 'from-gray-900 via-purple-800 to-pink-800'
                }`}>
                  🚀 Practice Coding
                </span>
                <br />
                <span className={`bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-300 ${
                  isDarkMode 
                    ? 'from-cyan-400 to-blue-400' 
                    : 'from-blue-600 to-cyan-600'
                }`}>
                  Together
                </span>
              </h1>
              
              <p className={`text-xl leading-relaxed max-w-lg transition-colors duration-300 font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Create or join groups to solve 
                <span className={`bg-gradient-to-r bg-clip-text text-transparent font-semibold ${
                  isDarkMode 
                    ? 'from-purple-400 to-pink-400' 
                    : 'from-purple-600 to-pink-600'
                }`}> LeetCode/GFG questions </span>
                with your friends, rate difficulty, and use AI to tag and summarize problems. 
                <span className={`bg-gradient-to-r bg-clip-text text-transparent font-semibold ${
                  isDarkMode 
                    ? 'from-green-400 to-emerald-400' 
                    : 'from-green-600 to-emerald-600'
                }`}> Perfect for interview prep!</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform cursor-pointer hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 flex items-center justify-center"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => navigate('/register')}
                      className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform cursor-pointer hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 flex items-center justify-center"
                    >
                      Get Started Free
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => navigate('/login')}
                      className={`px-8 py-4 border-2 backdrop-blur-sm font-semibold rounded-xl cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl duration-300 ${
                        isDarkMode 
                          ? 'bg-slate-800/80 text-gray-200 border-slate-600/50' 
                          : 'bg-white/90 border-gray-200/60 text-gray-800'
                      }`}
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>

              <div className={`flex items-center space-x-6 text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-3">
                    <div className={`w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 shadow-md ${
                      isDarkMode ? 'border-slate-800' : 'border-white'
                    }`}></div>
                    <div className={`w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full border-2 shadow-md ${
                      isDarkMode ? 'border-slate-800' : 'border-white'
                    }`}></div>
                    <div className={`w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 shadow-md ${
                      isDarkMode ? 'border-slate-800' : 'border-white'
                    }`}></div>
                  </div>
                  <span className="font-medium">Join 2,500+ developers</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                  <span className="font-medium">4.9/5 rating</span>
                </div>
              </div>
            </div>

            {/* Enhanced Floating Code Preview */}
            <div className="relative">
              <div className={`relative backdrop-blur-md rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 group ${
                isDarkMode 
                  ? 'bg-slate-800/90 border border-slate-600/50' 
                  : 'bg-white/95 border border-gray-200/60'
              }`}>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-150"></div>
                </div>
                
                <div className="space-y-3 font-mono text-sm">
                  <div className={`font-semibold ${
                    isDarkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>// Group coding session...</div>
                  <div className={`font-semibold ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    function <span className={`font-bold ${
                      isDarkMode ? 'text-orange-400' : 'text-orange-600'
                    }`}>solveTwoSum</span>() {"{"}
                  </div>
                  <div className={`ml-4 transition-colors duration-300 font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-800'
                  }`}>const nums = [2, 7, 11, 15];</div>
                  <div className={`ml-4 transition-colors duration-300 font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-800'
                  }`}>return findTarget(nums, 9);</div>
                  <div className={`font-semibold ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>{"}"}</div>
                  
                  <div className={`mt-6 p-4 backdrop-blur-sm rounded-lg transition-all duration-300 shadow-inner ${
                    isDarkMode 
                      ? 'bg-purple-900/60 border border-purple-700/50' 
                      : 'bg-purple-50/90 border border-purple-200/60'
                  }`}>
                    <div className={`flex items-center text-xs mb-2 transition-colors duration-300 font-semibold ${
                      isDarkMode ? 'text-purple-300' : 'text-purple-800'
                    }`}>
                      <Brain className="w-4 h-4 mr-2 animate-pulse" />
                      Group Rating: Medium
                    </div>
                    <div className={`text-xs transition-colors duration-300 font-medium ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-700'
                    }`}>3/5 members solved • Avg time: 15 min</div>
                  </div>
                </div>

                {/* Enhanced Floating Review Badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-emerald-400 text-white px-4 py-2 rounded-full text-xs font-bold animate-bounce shadow-lg">
                  Solved ✓
                  <Sparkles className="inline w-3 h-3 ml-1" />
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Enhanced Floating Elements */}
              <div className={`absolute -top-6 -left-6 w-12 h-12 rounded-lg rotate-12 animate-pulse blur-sm transition-all duration-300 shadow-lg ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-500/40 to-pink-500/40' 
                  : 'bg-gradient-to-r from-purple-400/70 to-pink-400/70'
              }`}></div>
              <div className={`absolute -bottom-4 -right-4 w-8 h-8 rounded-full animate-bounce delay-500 blur-sm transition-all duration-300 shadow-lg ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-500/40 to-cyan-500/40' 
                  : 'bg-gradient-to-r from-blue-400/70 to-cyan-400/70'
              }`}></div>
              <div className={`absolute top-1/2 -left-8 w-6 h-6 rounded-full animate-ping delay-1000 transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-yellow-500/30 to-orange-500/30' 
                  : 'bg-gradient-to-r from-yellow-400 to-orange-400'
              }`}></div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="text-center pb-12">
          <button
            onClick={() => scrollToSection('features')}
            className={`inline-flex flex-col items-center animate-bounce transition-colors duration-300 group cursor-pointer hover:scale-105 active:scale-95 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <span className={`text-sm mb-2 font-medium transition-colors ${
              isDarkMode 
                ? 'group-hover:text-purple-400' 
                : 'group-hover:text-purple-600'
            }`}>Explore Features</span>
            <ChevronDown className={`w-6 h-6 transition-colors ${
              isDarkMode 
                ? 'group-hover:text-purple-400' 
                : 'group-hover:text-purple-600'
            }`} />
          </button>
        </div>

        {/* Features Section - Enhanced */}
        <div className="max-w-7xl mx-auto px-6 py-20" id="features">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-300 ${
              isDarkMode 
                ? 'from-white to-purple-300' 
                : 'from-gray-900 to-purple-800'
            }`}>
              Why Choose CodeBuddy?
            </h2>
            <p className={`text-lg font-medium transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-700'
            }`}>
              Everything you need to <span className={`bg-gradient-to-r bg-clip-text text-transparent font-semibold ${
                isDarkMode 
                  ? 'from-purple-400 to-pink-400' 
                  : 'from-purple-600 to-pink-600'
              }`}>level up your coding skills</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Group Learning - Enhanced */}
            <div className={`group p-8 backdrop-blur-md rounded-2xl transition-all duration-300 cursor-pointer hover:transform hover:scale-105 active:scale-95 ${
              isDarkMode 
                ? 'bg-slate-800/40 border border-slate-600/40 hover:border-purple-300/70 hover:shadow-xl hover:shadow-purple-500/10' 
                : 'bg-white/95 border border-gray-200/60 hover:border-purple-300/70 hover:shadow-xl hover:shadow-purple-500/10'
            }`}>
              <div className={`w-16 h-16 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 transition-colors group-hover:scale-110 duration-300 shadow-lg ${
                isDarkMode 
                  ? 'bg-purple-900/80 group-hover:bg-purple-800/80' 
                  : 'bg-purple-100/90 group-hover:bg-purple-200/90'
              }`}>
                <Users className="w-8 h-8 text-purple-600 group-hover:animate-pulse" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-white group-hover:text-purple-400' 
                  : 'text-gray-900 group-hover:text-purple-600'
              }`}>
                👥 Group Learning
              </h3>
              <p className={`mb-6 transition-colors duration-300 font-medium leading-relaxed ${
                isDarkMode ? 'text-gray-400' : 'text-gray-700'
              }`}>
                Solve problems together with friends and learn from each other's approaches.
              </p>
              <div className={`font-semibold transition-colors flex items-center cursor-pointer ${
                isDarkMode 
                  ? 'text-purple-600 group-hover:text-purple-300' 
                  : 'text-purple-600 group-hover:text-purple-700'
              }`}>
                Learn more 
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* AI-Powered - Enhanced */}
            <div className={`group p-8 backdrop-blur-md rounded-2xl transition-all duration-300 cursor-pointer hover:transform hover:scale-105 active:scale-95 ${
              isDarkMode 
                ? 'bg-slate-800/40 border border-slate-600/40 hover:border-blue-300/70 hover:shadow-xl hover:shadow-blue-500/10' 
                : 'bg-white/95 border border-gray-200/60 hover:border-blue-300/70 hover:shadow-xl hover:shadow-blue-500/10'
            }`}>
              <div className={`w-16 h-16 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 transition-colors group-hover:scale-110 duration-300 shadow-lg ${
                isDarkMode 
                  ? 'bg-blue-900/80 group-hover:bg-blue-800/80' 
                  : 'bg-blue-100/90 group-hover:bg-blue-200/90'
              }`}>
                <Brain className="w-8 h-8 text-blue-600 group-hover:animate-pulse" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-white group-hover:text-blue-400' 
                  : 'text-gray-900 group-hover:text-blue-600'
              }`}>
                🤖 AI-Powered
              </h3>
              <p className={`mb-6 transition-colors duration-300 font-medium leading-relaxed ${
                isDarkMode ? 'text-gray-400' : 'text-gray-700'
              }`}>
                Automatic tagging and difficulty rating powered by advanced AI algorithms.
              </p>
              <div className={`font-semibold transition-colors flex items-center cursor-pointer ${
                isDarkMode 
                  ? 'text-blue-600 group-hover:text-blue-300' 
                  : 'text-blue-600 group-hover:text-blue-700'
              }`}>
                Learn more 
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Track Progress - Enhanced */}
            <div className={`group p-8 backdrop-blur-md rounded-2xl transition-all duration-300 cursor-pointer hover:transform hover:scale-105 active:scale-95 ${
              isDarkMode 
                ? 'bg-slate-800/40 border border-slate-600/40 hover:border-green-300/70 hover:shadow-xl hover:shadow-green-500/10' 
                : 'bg-white/95 border border-gray-200/60 hover:border-green-300/70 hover:shadow-xl hover:shadow-green-500/10'
            }`}>
              <div className={`w-16 h-16 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 transition-colors group-hover:scale-110 duration-300 shadow-lg ${
                isDarkMode 
                  ? 'bg-green-900/80 group-hover:bg-green-800/80' 
                  : 'bg-green-100/90 group-hover:bg-green-200/90'
              }`}>
                <BarChart3 className="w-8 h-8 text-green-600 group-hover:animate-pulse" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-white group-hover:text-green-400' 
                  : 'text-gray-900 group-hover:text-green-600'
              }`}>
                📊 Track Progress
              </h3>
              <p className={`mb-6 transition-colors duration-300 font-medium leading-relaxed ${
                isDarkMode ? 'text-gray-400' : 'text-gray-700'
              }`}>
                Monitor your improvement and see detailed analytics of your coding journey.
              </p>
              <div className={`font-semibold transition-colors flex items-center cursor-pointer ${
                isDarkMode 
                  ? 'text-green-600 group-hover:text-green-300' 
                  : 'text-green-600 group-hover:text-green-700'
              }`}>
                Learn more 
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section - Enhanced */}
        <div className="max-w-7xl mx-auto px-6 py-20" id="how-it-works">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-300 ${
              isDarkMode 
                ? 'from-white to-purple-300' 
                : 'from-gray-900 to-purple-800'
            }`}>
              How It Works
            </h2>
            <p className={`text-lg font-medium transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-700'
            }`}>
              Simple process, <span className={`bg-gradient-to-r bg-clip-text text-transparent font-semibold ${
                isDarkMode 
                  ? 'from-purple-400 to-pink-400' 
                  : 'from-purple-600 to-pink-600'
              }`}>powerful collaboration</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 - Enhanced */}
            <div className="text-center relative group cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25 group-hover:shadow-xl group-hover:shadow-purple-500/30 transition-all duration-300 group-hover:scale-110">
                <Users className="w-10 h-10 text-white group-hover:animate-pulse" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-white group-hover:text-purple-400' 
                  : 'text-gray-900 group-hover:text-purple-600'
              }`}>
                Create or Join Groups
              </h3>
              <p className={`font-medium leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-700'
              }`}>
                Form study groups with friends or join existing ones to practice together
              </p>
              
              {/* Enhanced Arrow */}
              <div className="hidden md:block absolute top-10 -right-4 text-purple-500 group-hover:scale-110 transition-transform duration-300">
                <ArrowRight className="w-8 h-8 animate-pulse" />
              </div>
            </div>

            {/* Step 2 - Enhanced */}
            <div className="text-center relative group cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-110">
                <Code2 className="w-10 h-10 text-white group-hover:animate-pulse" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-white group-hover:text-blue-400' 
                  : 'text-gray-900 group-hover:text-blue-600'
              }`}>
                Solve Together
              </h3>
              <p className={`font-medium leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-700'
              }`}>
                Work on LeetCode and GFG problems, share solutions and track progress
              </p>
              
              {/* Enhanced Arrow */}
              <div className="hidden md:block absolute top-10 -right-4 text-blue-500 group-hover:scale-110 transition-transform duration-300">
                <ArrowRight className="w-8 h-8 animate-pulse delay-300" />
              </div>
            </div>

            {/* Step 3 - Enhanced */}
            <div className="text-center group cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25 group-hover:shadow-xl group-hover:shadow-green-500/30 transition-all duration-300 group-hover:scale-110">
                <BarChart3 className="w-10 h-10 text-white group-hover:animate-pulse" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-white group-hover:text-green-400' 
                  : 'text-gray-900 group-hover:text-green-600'
              }`}>
                Track & Improve
              </h3>
              <p className={`font-medium leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-700'
              }`}>
                Monitor your progress with detailed analytics and improve together
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className={`relative backdrop-blur-md rounded-3xl p-12 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 group ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-900/95 via-pink-900/90 to-blue-900/95 border border-purple-700/50' 
              : 'bg-gradient-to-r from-purple-100/95 via-pink-100/90 to-blue-100/95 border border-purple-200/60'
          }`}>
            <div className={`absolute inset-0 rounded-3xl blur-3xl transition-all duration-300 group-hover:blur-2xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-800/40 via-pink-800/30 to-blue-800/40' 
                : 'bg-gradient-to-r from-purple-200/40 via-pink-200/30 to-blue-200/40'
            }`}></div>
            <div className="relative z-10">
              <h2 className={`text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-300 ${
                isDarkMode 
                  ? 'from-white to-purple-300' 
                  : 'from-gray-900 to-purple-800'
              }`}>
                Ready to Code Together?
              </h2>
              <p className={`text-xl mb-8 transition-colors duration-300 font-medium leading-relaxed max-w-2xl mx-auto ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Join thousands of developers who practice coding together and 
                <span className={`bg-gradient-to-r bg-clip-text text-transparent font-semibold ${
                  isDarkMode 
                    ? 'from-purple-400 to-pink-400' 
                    : 'from-purple-600 to-pink-600'
                }`}> improve faster</span>
              </p>
              
              {isAuthenticated ? (
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="group px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform cursor-pointer hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 text-lg"
                >
                  Go to Your Dashboard
                  <ArrowRight className="inline w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/register')}
                  className="group px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform cursor-pointer hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 text-lg"
                >
                  Start Coding Together
                  <ArrowRight className="inline w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;