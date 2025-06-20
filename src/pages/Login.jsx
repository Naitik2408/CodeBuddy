import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { Code2, Users, Trophy, Sparkles, ArrowRight } from 'lucide-react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(formData);
      console.log('Login response:', response.data);
      
      // Store token in localStorage for persistence
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      dispatch(loginSuccess(response.data));
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err?.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Collaborative Learning",
      description: "Join groups and practice together"
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      title: "Track Progress", 
      description: "Monitor your coding journey"
    }
  ];

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-gray-800'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-purple-500/20' : 'bg-purple-400/20'
        }`}></div>
        <div className={`absolute top-3/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
          isDarkMode ? 'bg-blue-500/20' : 'bg-blue-400/20'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 w-32 h-32 rounded-full blur-2xl animate-bounce ${
          isDarkMode ? 'bg-pink-500/25' : 'bg-pink-400/25'
        }`}></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Information */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-16">
          {/* Brand Section */}
          <div className="mb-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 mb-8 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 group"
            >
              <div className="relative">
                <Code2 className={`w-10 h-10 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full animate-ping ${
                  isDarkMode ? 'bg-pink-400' : 'bg-pink-500'
                }`}></div>
                <Sparkles className="absolute -bottom-1 -left-1 w-4 h-4 text-yellow-400 animate-pulse" />
              </div>
              <div>
                <h1 className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                  isDarkMode 
                    ? 'from-purple-400 to-pink-400' 
                    : 'from-purple-600 to-pink-600'
                }`}>
                  CodeBuddy
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Collaborative Coding Platform
                </p>
              </div>
            </button>
            
            <h2 className={`text-5xl font-bold leading-tight mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Master Coding
              <span className={`block bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'from-purple-400 to-pink-400' 
                  : 'from-purple-600 to-pink-600'
              }`}>
                Together
              </span>
            </h2>
            
            <p className={`text-xl leading-relaxed mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Join developers practicing coding problems and growing their skills in collaborative study groups.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-6 mb-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`backdrop-blur-sm border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group ${
                  isDarkMode 
                    ? 'bg-slate-800/40 border-slate-600/30 hover:border-purple-500/50' 
                    : 'bg-white/40 border-gray-200/30 hover:border-purple-400/50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl transition-colors ${
                    isDarkMode 
                      ? 'bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30' 
                      : 'bg-purple-100 text-purple-600 group-hover:bg-purple-200'
                  }`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-1 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Simple Stats */}
          <div className={`backdrop-blur-sm border rounded-2xl p-6 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20' 
              : 'bg-gradient-to-r from-purple-100/80 to-pink-100/80 border-purple-200/60'
          }`}>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                  isDarkMode 
                    ? 'from-purple-400 to-pink-400' 
                    : 'from-purple-600 to-pink-600'
                }`}>
                  5K+
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Active Users
                </div>
              </div>
              <div>
                <div className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                  isDarkMode 
                    ? 'from-purple-400 to-pink-400' 
                    : 'from-purple-600 to-pink-600'
                }`}>
                  500+
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Study Groups
                </div>
              </div>
              <div>
                <div className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                  isDarkMode 
                    ? 'from-purple-400 to-pink-400' 
                    : 'from-purple-600 to-pink-600'
                }`}>
                  Free
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Forever
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="max-w-md w-full space-y-8">
            {/* Mobile Brand */}
            <div className="lg:hidden text-center mb-8">
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center space-x-3 mb-4 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 group mx-auto"
              >
                <div className="relative">
                  <Code2 className={`w-8 h-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping ${
                    isDarkMode ? 'bg-pink-400' : 'bg-pink-500'
                  }`}></div>
                </div>
                <h1 className={`text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                  isDarkMode 
                    ? 'from-purple-400 to-pink-400' 
                    : 'from-purple-600 to-pink-600'
                }`}>
                  CodeBuddy
                </h1>
              </button>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Collaborative Coding Platform
              </p>
            </div>

            {/* Login Card */}
            <div className={`backdrop-blur-sm border rounded-2xl p-8 shadow-xl ${
              isDarkMode 
                ? 'bg-slate-800/40 border-slate-600/30' 
                : 'bg-white/40 border-gray-200/30'
            }`}>
              <div className="text-center mb-8">
                <h2 className={`text-3xl font-extrabold bg-gradient-to-r bg-clip-text text-transparent ${
                  isDarkMode 
                    ? 'from-purple-400 to-pink-400' 
                    : 'from-purple-600 to-pink-600'
                }`}>
                  Welcome Back!
                </h2>
                <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Sign in to continue your coding journey
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="relative group">
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl transition-all focus:outline-none ${
                        isDarkMode 
                          ? 'bg-slate-700/50 border-slate-600/50 text-white placeholder-gray-400 focus:border-purple-400 focus:bg-slate-700/70 group-hover:border-slate-500/70' 
                          : 'bg-white/70 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:bg-white/80 group-hover:border-gray-400/70'
                      }`}
                      placeholder="Email address"
                    />
                  </div>
                  <div className="relative group">
                    <input
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl transition-all focus:outline-none ${
                        isDarkMode 
                          ? 'bg-slate-700/50 border-slate-600/50 text-white placeholder-gray-400 focus:border-purple-400 focus:bg-slate-700/70 group-hover:border-slate-500/70' 
                          : 'bg-white/70 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:bg-white/80 group-hover:border-gray-400/70'
                      }`}
                      placeholder="Password"
                    />
                  </div>
                </div>

                {error && (
                  <div className={`rounded-xl border p-4 ${
                    isDarkMode 
                      ? 'bg-red-500/10 border-red-500/20 text-red-300' 
                      : 'bg-red-100 border-red-200 text-red-600'
                  }`}>
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full px-6 py-3 rounded-xl text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group hover:scale-[1.02] active:scale-[0.98] ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/register')}
                      className={`font-medium transition-colors hover:underline ${
                        isDarkMode 
                          ? 'text-purple-400 hover:text-purple-300' 
                          : 'text-purple-600 hover:text-purple-700'
                      }`}
                    >
                      Sign up for free
                    </button>
                  </p>
                </div>
              </form>
            </div>

            {/* Mobile Features */}
            <div className="lg:hidden mt-8">
              <div className="grid grid-cols-1 gap-3">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`backdrop-blur-sm border rounded-xl p-4 text-center ${
                      isDarkMode 
                        ? 'bg-slate-800/40 border-slate-600/30' 
                        : 'bg-white/40 border-gray-200/30'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                        {feature.icon}
                      </div>
                      <h4 className={`font-medium text-sm ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {feature.title}
                      </h4>
                    </div>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;