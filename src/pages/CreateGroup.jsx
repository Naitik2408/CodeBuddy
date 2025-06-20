import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createGroup } from '../features/group/groupSlice';
import { toggleTheme } from '../features/theme/themeSlice';
import { 
  ArrowLeft, 
  Users, 
  Lock, 
  Globe, 
  Code2, 
  ArrowRight,
  Plus,
  Zap,
  Settings,
  Star,
  Shield,
  BookOpen,
  Target,
  Briefcase,
  Coffee,
  CheckCircle,
  Sun,
  Moon,
  Sparkles,
  LogOut
} from 'lucide-react';

const CreateGroup = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPrivate: false,
    category: 'General'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { isDarkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = [
    { value: 'Study Group', icon: BookOpen, color: 'purple' },
    { value: 'Programming', icon: Code2, color: 'blue' },
    { value: 'Interview Prep', icon: Target, color: 'green' },
    { value: 'Project Team', icon: Briefcase, color: 'orange' },
    { value: 'General', icon: Coffee, color: 'gray' },
    { value: 'Other', icon: Plus, color: 'pink' }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
  }, [isAuthenticated, navigate]);

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

  const handleLogout = () => {
    dispatch({ type: 'auth/logout' });
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Creating group with data:', formData);
      const result = await dispatch(createGroup(formData)).unwrap();
      console.log('Group created successfully:', result);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error creating group:', err);
      setError(err || 'Failed to create group');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (categoryValue) => {
    const category = categories.find(cat => cat.value === categoryValue);
    return category ? category.icon : Code2;
  };

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'
      }`}>
        <div className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${
            isDarkMode ? 'border-purple-400' : 'border-purple-600'
          }`}></div>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-gray-800'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse transition-all duration-300 ${
          isDarkMode 
            ? 'bg-purple-500/10' 
            : 'bg-purple-400/20'
        }`}></div>
        <div className={`absolute top-3/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-blue-500/10' 
            : 'bg-blue-400/20'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 w-32 h-32 rounded-full blur-2xl animate-bounce transition-all duration-300 ${
          isDarkMode 
            ? 'bg-pink-500/10' 
            : 'bg-pink-400/25'
        }`}></div>
      </div>

      {/* Floating Mouse Follower */}
      <div 
        className={`absolute w-6 h-6 rounded-full blur-sm pointer-events-none transition-all duration-300 ease-out z-10 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-purple-400 to-pink-400 opacity-20' 
            : 'bg-gradient-to-r from-purple-500 to-pink-500 opacity-30'
        }`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      ></div>

      {/* Header */}
      <header className={`relative z-20 backdrop-blur-sm transition-all duration-300 ${
        isDarkMode 
          ? 'border-b border-slate-700/50' 
          : 'border-b border-gray-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Clickable */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 group"
            >
              <div className="relative">
                <Code2 className={`w-8 h-8 transition-colors duration-300 ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-600'
                }`} />
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping ${
                  isDarkMode ? 'bg-pink-400' : 'bg-pink-500'
                }`}></div>
                <Sparkles className="absolute -bottom-1 -left-1 w-3 h-3 text-yellow-400 animate-pulse" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-300 ${
                  isDarkMode 
                    ? 'from-purple-400 to-pink-400' 
                    : 'from-purple-600 to-pink-600'
                }`}>
                  CodeBuddy
                </h1>
                <p className={`text-xs transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Create Group</p>
              </div>
            </button>

            {/* User Info & Actions */}
            <div className="flex items-center space-x-6">
              {/* Theme Toggle Button */}
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

              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className={`font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Creating as,</p>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-purple-300' : 'text-purple-600'
                  }`}>{user?.name}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className={`flex items-center px-4 py-2 rounded-lg border transition-all cursor-pointer hover:scale-105 active:scale-95 group ${
                  isDarkMode 
                    ? 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30' 
                    : 'bg-red-100 text-red-600 border-red-200 hover:bg-red-200'
                }`}
              >
                <LogOut className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Main Form (2/3 width) */}
          <div className="lg:col-span-2">
            <div className={`backdrop-blur-sm border rounded-3xl p-10 shadow-2xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-800/30 border-slate-600/30' 
                : 'bg-white/40 border-gray-200/30'
            }`}>
              {/* Form Header */}
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25">
                  <Plus className="w-10 h-10 text-white" />
                </div>
                <h2 className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-3 transition-colors duration-300 ${
                  isDarkMode 
                    ? 'from-white to-purple-200' 
                    : 'from-gray-900 to-purple-800'
                }`}>
                  Create New Group
                </h2>
                <p className={`text-lg transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Start a new coding group and invite your friends to practice together!
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className={`mb-8 p-5 border rounded-xl ${
                  isDarkMode 
                    ? 'bg-red-500/10 border-red-500/20' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center">
                    <Zap className={`w-6 h-6 mr-4 ${
                      isDarkMode ? 'text-red-400' : 'text-red-600'
                    }`} />
                    <p className={`${
                      isDarkMode ? 'text-red-300' : 'text-red-700'
                    }`}>{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Group Name */}
                <div>
                  <label className={`block text-lg font-medium mb-4 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Group Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      minLength={3}
                      maxLength={100}
                      className={`w-full px-6 py-4 text-lg border rounded-xl focus:outline-none transition-all duration-300 pr-14 ${
                        isDarkMode 
                          ? 'bg-slate-700/50 border-slate-600/50 text-white placeholder-gray-400 focus:border-purple-400' 
                          : 'bg-white/70 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                      }`}
                      placeholder="Enter group name (3-100 characters)"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Users className={`w-6 h-6 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                    </div>
                  </div>
                  <p className={`text-sm mt-3 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-600'
                  }`}>
                    {formData.name.length}/100 characters
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className={`block text-lg font-medium mb-4 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    maxLength={500}
                    className={`w-full px-6 py-4 text-lg border rounded-xl focus:outline-none transition-all duration-300 resize-none ${
                      isDarkMode 
                        ? 'bg-slate-700/50 border-slate-600/50 text-white placeholder-gray-400 focus:border-purple-400' 
                        : 'bg-white/70 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                    }`}
                    placeholder="Describe your group's purpose and goals (optional)"
                  />
                  <p className={`text-sm mt-3 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-600'
                  }`}>
                    {formData.description.length}/500 characters
                  </p>
                </div>

                {/* Category */}
                <div>
                  <label className={`block text-lg font-medium mb-4 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      const isSelected = formData.category === category.value;
                      return (
                        <button
                          key={category.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                          className={`p-5 rounded-xl border transition-all duration-300 text-left group cursor-pointer hover:scale-105 active:scale-95 ${
                            isSelected 
                              ? isDarkMode
                                ? 'bg-purple-600/20 border-purple-500/50 text-purple-200' 
                                : 'bg-purple-100/80 border-purple-400/60 text-purple-800'
                              : isDarkMode
                                ? 'bg-slate-700/30 border-slate-600/30 text-gray-300 hover:border-purple-500/30 hover:bg-purple-600/10'
                                : 'bg-white/60 border-gray-300/40 text-gray-700 hover:border-purple-400/50 hover:bg-purple-100/50'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                              isSelected 
                                ? isDarkMode
                                  ? 'bg-purple-500/30' 
                                  : 'bg-purple-200/80'
                                : isDarkMode
                                  ? 'bg-slate-600/50 group-hover:bg-purple-500/20'
                                  : 'bg-gray-200/60 group-hover:bg-purple-200/60'
                            }`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <span className="font-medium">{category.value}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="space-y-4">
                  <label className={`block text-lg font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Privacy Settings
                  </label>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {/* Public Option */}
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, isPrivate: false }))}
                      className={`p-6 rounded-xl border transition-all duration-300 text-left cursor-pointer hover:scale-105 active:scale-95 ${
                        !formData.isPrivate
                          ? isDarkMode
                            ? 'bg-green-600/20 border-green-500/50 text-green-200'
                            : 'bg-green-100/80 border-green-400/60 text-green-800'
                          : isDarkMode
                            ? 'bg-slate-700/30 border-slate-600/30 text-gray-300 hover:border-green-500/30'
                            : 'bg-white/60 border-gray-300/40 text-gray-700 hover:border-green-400/50'
                      }`}
                    >
                      <div className="flex items-center space-x-4 mb-3">
                        <Globe className="w-6 h-6" />
                        <span className="font-medium text-lg">Public</span>
                      </div>
                      <p className="text-sm opacity-80">Anyone can discover and join this group</p>
                    </button>

                    {/* Private Option */}
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, isPrivate: true }))}
                      className={`p-6 rounded-xl border transition-all duration-300 text-left cursor-pointer hover:scale-105 active:scale-95 ${
                        formData.isPrivate
                          ? isDarkMode
                            ? 'bg-red-600/20 border-red-500/50 text-red-200'
                            : 'bg-red-100/80 border-red-400/60 text-red-800'
                          : isDarkMode
                            ? 'bg-slate-700/30 border-slate-600/30 text-gray-300 hover:border-red-500/30'
                            : 'bg-white/60 border-gray-300/40 text-gray-700 hover:border-red-400/50'
                      }`}
                    >
                      <div className="flex items-center space-x-4 mb-3">
                        <Lock className="w-6 h-6" />
                        <span className="font-medium text-lg">Private</span>
                      </div>
                      <p className="text-sm opacity-80">Invite only access with group code</p>
                    </button>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-6 pt-8">
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className={`flex-1 px-8 py-4 text-lg border rounded-xl transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                      isDarkMode 
                        ? 'bg-slate-700/50 text-gray-300 border-slate-600/50 hover:bg-slate-600/50' 
                        : 'bg-gray-100/80 text-gray-700 border-gray-300/50 hover:bg-gray-200/80'
                    }`}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !formData.name.trim()}
                    className="flex-1 px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group cursor-pointer hover:scale-105 active:scale-95"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        Create Group
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Preview & Tips (1/3 width) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Group Preview */}
            <div className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-800/30 border-slate-600/30' 
                : 'bg-white/40 border-gray-200/30'
            }`}>
              <h3 className={`text-xl font-bold mb-4 flex items-center transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                Preview
              </h3>
              
              <div className={`rounded-xl p-6 border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-slate-700/30 border-slate-600/30' 
                  : 'bg-gray-100/60 border-gray-300/30'
              }`}>
                {/* Group Header */}
                <div className="mb-4">
                  <h4 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {formData.name || 'Your Group Name'}
                  </h4>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {formData.description || 'Your group description will appear here...'}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className={`text-center p-3 rounded-lg transition-all duration-300 ${
                    isDarkMode ? 'bg-slate-600/30' : 'bg-gray-200/50'
                  }`}>
                    <div className={`text-xl font-bold transition-colors duration-300 ${
                      isDarkMode ? 'text-purple-300' : 'text-purple-600'
                    }`}>1</div>
                    <div className={`text-xs transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Members</div>
                  </div>
                  <div className={`text-center p-3 rounded-lg transition-all duration-300 ${
                    isDarkMode ? 'bg-slate-600/30' : 'bg-gray-200/50'
                  }`}>
                    <div className={`text-xl font-bold transition-colors duration-300 ${
                      isDarkMode ? 'text-blue-300' : 'text-blue-600'
                    }`}>0</div>
                    <div className={`text-xs transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Questions</div>
                  </div>
                </div>

                {/* Info Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {/* Privacy Badge */}
                    <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                      formData.isPrivate 
                        ? isDarkMode
                          ? 'bg-red-500/20 text-red-300 border-red-500/30' 
                          : 'bg-red-100 text-red-700 border-red-300'
                        : isDarkMode
                          ? 'bg-green-500/20 text-green-300 border-green-500/30'
                          : 'bg-green-100 text-green-700 border-green-300'
                    }`}>
                      {formData.isPrivate ? (
                        <>
                          <Lock className="w-3 h-3 mr-1" />
                          Private
                        </>
                      ) : (
                        <>
                          <Globe className="w-3 h-3 mr-1" />
                          Public
                        </>
                      )}
                    </div>

                    {/* Category Badge */}
                    <div className={`flex items-center px-2 py-1 rounded-full text-xs border transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
                        : 'bg-purple-100 text-purple-700 border-purple-300'
                    }`}>
                      {React.createElement(getCategoryIcon(formData.category), { className: "w-3 h-3 mr-1" })}
                      {formData.category}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className={`border rounded-2xl p-6 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-blue-500/10 border-blue-500/20' 
                : 'bg-blue-50/80 border-blue-200/60'
            }`}>
              <h4 className={`font-medium mb-4 flex items-center transition-colors duration-300 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>
                <Shield className="w-5 h-5 mr-2" />
                Pro Tips
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-blue-200' : 'text-blue-800'
                  }`}>
                    Choose a descriptive name that reflects your group's purpose
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-blue-200' : 'text-blue-800'
                  }`}>
                    Add a clear description to attract the right members
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-blue-200' : 'text-blue-800'
                  }`}>
                    Private groups are great for close friends or teams
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-blue-200' : 'text-blue-800'
                  }`}>
                    You can always change settings later as an admin
                  </span>
                </li>
              </ul>
            </div>

            {/* Next Steps */}
            <div className={`border rounded-2xl p-6 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-purple-500/10 border-purple-500/20' 
                : 'bg-purple-50/80 border-purple-200/60'
            }`}>
              <h4 className={`font-medium mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-purple-300' : 'text-purple-700'
              }`}>What's Next?</h4>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center mr-3 text-xs font-bold">1</div>
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-purple-200' : 'text-purple-800'
                  }`}>Create your group</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-bold transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-600/20 text-gray-400' : 'bg-gray-200/60 text-gray-600'
                  }`}>2</div>
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Invite friends with your group code</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-bold transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-600/20 text-gray-400' : 'bg-gray-200/60 text-gray-600'
                  }`}>3</div>
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Start adding coding questions</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-bold transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-600/20 text-gray-400' : 'bg-gray-200/60 text-gray-600'
                  }`}>4</div>
                  <span className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Practice and learn together!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateGroup;