import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChevronDown, Code2, Users, Brain, BarChart3, ArrowRight, Star, Zap, Shield, Clock } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Floating Mouse Follower */}
      <div 
        className="absolute w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-sm opacity-20 pointer-events-none transition-all duration-300 ease-out z-10"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      ></div>

      {/* Header */}
      <header className="relative z-20 px-6 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Code2 className="w-8 h-8 text-purple-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CodeBuddy
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-purple-400 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-purple-400 transition-colors">How it Works</a>
            <a href="#pricing" className="text-gray-300 hover:text-purple-400 transition-colors">Pricing</a>
            {/* Your existing authentication logic */}
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Dashboard
              </button>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-purple-600/20 text-purple-300 rounded-lg border border-purple-500/30 hover:bg-purple-600/30 transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm">
                <Zap className="w-4 h-4 mr-2" />
                Practice Coding Together - Join Early Access
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  🚀 Practice Coding
                </span>
                <br />
                <span className="text-blue-400">Together</span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Create or join groups to solve LeetCode/GFG questions with your friends, rate difficulty, 
                and use AI to tag and summarize problems. Perfect for interview prep!
              </p>

              {/* Your existing authentication logic for buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25 flex items-center justify-center group"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => navigate('/register')}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25 flex items-center justify-center group"
                    >
                      Get Started Free
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => navigate('/login')}
                      className="px-8 py-4 bg-slate-800/50 text-white border-2 border-purple-500/30 font-semibold rounded-lg hover:bg-slate-700/50 hover:border-purple-400/50 transition-all"
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-slate-800"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full border-2 border-slate-800"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-slate-800"></div>
                  </div>
                  <span>Join 2,500+ developers</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>4.9/5 rating</span>
                </div>
              </div>
            </div>

            {/* Floating Code Preview */}
            <div className="relative">
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                
                <div className="space-y-3 font-mono text-sm">
                  <div className="text-purple-300">// Group coding session...</div>
                  <div className="text-blue-300">
                    function <span className="text-yellow-300">solveTwoSum</span>() {"{"}
                  </div>
                  <div className="text-gray-300 ml-4">const nums = [2, 7, 11, 15];</div>
                  <div className="text-gray-300 ml-4">return findTarget(nums, 9);</div>
                  <div className="text-blue-300">{"}"}</div>
                  
                  <div className="mt-6 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <div className="flex items-center text-purple-300 text-xs mb-2">
                      <Brain className="w-4 h-4 mr-2" />
                      Group Rating: Medium
                    </div>
                    <div className="text-gray-300 text-xs">3/5 members solved • Avg time: 15 min</div>
                  </div>
                </div>

                {/* Floating Review Badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-emerald-400 text-slate-900 px-3 py-1 rounded-full text-xs font-semibold animate-bounce">
                  Solved ✓
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-purple-500/20 rounded-lg rotate-12 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-pink-500/20 rounded-full animate-bounce delay-500"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center pb-12">
          <div className="inline-flex flex-col items-center text-gray-400 animate-bounce">
            <span className="text-sm mb-2">Scroll to see more</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>

        {/* How It Works Section */}
        <div className="max-w-7xl mx-auto px-6 py-20" id="how-it-works">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400">Simple process, powerful collaboration</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create or Join Groups</h3>
              <p className="text-gray-400">Form study groups with friends or join existing ones to practice together</p>
              
              {/* Arrow */}
              <div className="hidden md:block absolute top-8 -right-4 text-purple-400">
                <ArrowRight className="w-8 h-8 animate-pulse" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25">
                <Code2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Solve Together</h3>
              <p className="text-gray-400">Work on LeetCode and GFG problems, share solutions and track progress</p>
              
              {/* Arrow */}
              <div className="hidden md:block absolute top-8 -right-4 text-blue-400">
                <ArrowRight className="w-8 h-8 animate-pulse delay-300" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track & Improve</h3>
              <p className="text-gray-400">Monitor your progress with detailed analytics and improve together</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-6 py-20" id="features">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose CodeBuddy?</h2>
            <p className="text-gray-400">Everything you need to level up your coding skills</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Group Learning */}
            <div className="group p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-600/30 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">👥 Group Learning</h3>
              <p className="text-gray-400 mb-6">Solve problems together with friends and learn from each other's approaches.</p>
              <div className="text-purple-400 font-medium group-hover:text-purple-300 transition-colors">Learn more →</div>
            </div>

            {/* AI-Powered */}
            <div className="group p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-600/30 rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">🤖 AI-Powered</h3>
              <p className="text-gray-400 mb-6">Automatic tagging and difficulty rating powered by advanced AI algorithms.</p>
              <div className="text-blue-400 font-medium group-hover:text-blue-300 transition-colors">Learn more →</div>
            </div>

            {/* Track Progress */}
            <div className="group p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-600/30 rounded-2xl hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-colors">
                <BarChart3 className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">📊 Track Progress</h3>
              <p className="text-gray-400 mb-6">Monitor your improvement and see detailed analytics of your coding journey.</p>
              <div className="text-green-400 font-medium group-hover:text-green-300 transition-colors">Learn more →</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Ready to Code Together?</h2>
              <p className="text-xl text-gray-300 mb-8">Join thousands of developers who practice coding together and improve faster</p>
              
              {/* Your existing authentication logic for CTA button */}
              {isAuthenticated ? (
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25 text-lg"
                >
                  Go to Your Dashboard
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/register')}
                  className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25 text-lg"
                >
                  Start Coding Together
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