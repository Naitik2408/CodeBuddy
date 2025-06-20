import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestion } from '../features/question/questionSlice';
import { toggleTheme } from '../features/theme/themeSlice';
import {
  ArrowLeft,
  Code2,
  Link,
  Plus,
  Save,
  X,
  Lightbulb,
  CheckCircle,
  Sun,
  Moon,
  Sparkles,
  LogOut,
  Download,
  Tag,
  BookOpen,
  Target,
  Globe
} from 'lucide-react';

const AddQuestion = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.question);
  const { isDarkMode } = useSelector((state) => state.theme);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sourceUrl: '',
    difficulty: 'Medium',
    category: 'Array',
    tags: '',
    platform: 'LeetCode'
  });

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const categories = [
    'Array', 'String', 'Hash Table', 'Dynamic Programming',
    'Math', 'Sorting', 'Greedy', 'Depth-First Search',
    'Database', 'Binary Search', 'Tree', 'Breadth-First Search',
    'Matrix', 'Two Pointers', 'Binary Tree', 'Heap', 'Stack',
    'Graph', 'Design', 'Simulation', 'Backtracking', 'Linked List'
  ];
  const platforms = ['LeetCode', 'HackerRank', 'CodeForces', 'GeeksforGeeks', 'InterviewBit', 'Other'];

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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare question data
    const questionData = {
      ...formData,
      groupId,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
    };

    console.log('Submitting question data:', questionData); // Debug log

    try {
      const result = await dispatch(createQuestion(questionData)).unwrap();
      console.log('Question created successfully:', result); // Debug log
      navigate(`/group/${groupId}`);
    } catch (err) {
      console.error('Error creating question:', err);
      console.error('Full error object:', err); // More detailed error logging
    }
  };

  const extractFromUrl = () => {
    const url = formData.sourceUrl;
    if (!url) return;

    try {
      // Extract title and details from LeetCode URL
      if (url.includes('leetcode.com')) {
        const urlParts = url.split('/');
        const problemSlug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
        const title = problemSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        setFormData(prev => ({
          ...prev,
          title: title || prev.title,
          platform: 'LeetCode'
        }));
      }
      // Add similar logic for other platforms
    } catch (error) {
      console.error('Error extracting from URL:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return isDarkMode ? 'text-green-400' : 'text-green-600';
      case 'Medium': return isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
      case 'Hard': return isDarkMode ? 'text-red-400' : 'text-red-600';
      default: return isDarkMode ? 'text-gray-400' : 'text-gray-600';
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-300 ${isDarkMode
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-gray-800'
      }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse transition-all duration-300 ${isDarkMode
            ? 'bg-purple-500/10'
            : 'bg-purple-400/20'
          }`}></div>
        <div className={`absolute top-3/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 transition-all duration-300 ${isDarkMode
            ? 'bg-blue-500/10'
            : 'bg-blue-400/20'
          }`}></div>
        <div className={`absolute top-1/2 left-1/2 w-32 h-32 rounded-full blur-2xl animate-bounce transition-all duration-300 ${isDarkMode
            ? 'bg-pink-500/10'
            : 'bg-pink-400/25'
          }`}></div>
      </div>

      {/* Floating Mouse Follower */}
      <div
        className={`absolute w-6 h-6 rounded-full blur-sm pointer-events-none transition-all duration-300 ease-out z-10 ${isDarkMode
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
      <header className={`relative z-20 backdrop-blur-sm transition-all duration-300 ${isDarkMode
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
                <Code2 className={`w-8 h-8 transition-colors duration-300 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping ${isDarkMode ? 'bg-pink-400' : 'bg-pink-500'
                  }`}></div>
                <Sparkles className="absolute -bottom-1 -left-1 w-3 h-3 text-yellow-400 animate-pulse" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-300 ${isDarkMode
                    ? 'from-purple-400 to-pink-400'
                    : 'from-purple-600 to-pink-600'
                  }`}>
                  CodeBuddy
                </h1>
                <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>Add Question</p>
              </div>
            </button>

            {/* User Info & Actions */}
            <div className="flex items-center space-x-6">
              {/* Back to Group Button */}
              <button
                onClick={() => navigate(`/group/${groupId}`)}
                className={`flex items-center px-4 py-2 rounded-xl border transition-all cursor-pointer hover:scale-105 active:scale-95 group ${isDarkMode
                    ? 'bg-slate-700/50 text-gray-300 border-slate-600/50 hover:bg-slate-600/50'
                    : 'bg-white/70 text-gray-700 border-gray-300/50 hover:bg-gray-100/70'
                  }`}
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Group
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={handleThemeToggle}
                className={`group relative p-3 rounded-xl backdrop-blur-sm cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl ${isDarkMode
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
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isDarkMode
                    ? 'bg-gradient-to-r from-purple-400/20 to-blue-400/20'
                    : 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20'
                  }`}></div>
              </button>

              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Adding as,</p>
                  <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'
                    }`}>{user?.name}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form (2/3 width) */}
          <div className="lg:col-span-2">
            <div className={`backdrop-blur-sm border rounded-3xl p-8 shadow-2xl transition-all duration-300 ${isDarkMode
                ? 'bg-slate-800/30 border-slate-600/30'
                : 'bg-white/40 border-gray-200/30'
              }`}>
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h2 className={`text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-2 transition-colors duration-300 ${isDarkMode
                    ? 'from-white to-purple-200'
                    : 'from-gray-900 to-purple-800'
                  }`}>
                  Add New Question
                </h2>
                <p className={`text-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                  Share a coding problem with your group
                </p>
              </div>

              {/* Error Display */}
              {error && (
                <div className={`mb-6 p-4 border rounded-xl ${isDarkMode
                    ? 'bg-red-500/10 border-red-500/20'
                    : 'bg-red-50 border-red-200'
                  }`}>
                  <div className="flex items-center">
                    <X className={`w-5 h-5 mr-3 ${isDarkMode ? 'text-red-400' : 'text-red-600'
                      }`} />
                    <p className={`${isDarkMode ? 'text-red-300' : 'text-red-700'
                      }`}>{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Source URL */}
                <div>
                  <label className={`block text-lg font-medium mb-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Problem URL *
                  </label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <input
                        type="url"
                        name="sourceUrl"
                        value={formData.sourceUrl}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 text-lg border rounded-xl focus:outline-none transition-all duration-300 pr-12 ${isDarkMode
                            ? 'bg-slate-700/50 border-slate-600/50 text-white placeholder-gray-400 focus:border-purple-400'
                            : 'bg-white/70 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                          }`}
                        placeholder="https://leetcode.com/problems/two-sum/"
                      />
                      <Link className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                    </div>
                    <button
                      type="button"
                      onClick={extractFromUrl}
                      className={`flex items-center px-6 py-3 rounded-xl border transition-all cursor-pointer hover:scale-105 active:scale-95 group ${isDarkMode
                          ? 'bg-slate-700/50 text-gray-300 border-slate-600/50 hover:bg-slate-600/50'
                          : 'bg-white/70 text-gray-700 border-gray-300/50 hover:bg-gray-100/70'
                        }`}
                    >
                      <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                      Extract
                    </button>
                  </div>
                  <p className={`mt-2 text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
                    }`}>
                    Paste the URL from LeetCode, HackerRank, etc.
                  </p>
                </div>

                {/* Title */}
                <div>
                  <label className={`block text-lg font-medium mb-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Problem Title *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      maxLength={200}
                      className={`w-full px-4 py-3 text-lg border rounded-xl focus:outline-none transition-all duration-300 pr-12 ${isDarkMode
                          ? 'bg-slate-700/50 border-slate-600/50 text-white placeholder-gray-400 focus:border-purple-400'
                          : 'bg-white/70 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                        }`}
                      placeholder="e.g., Two Sum, Valid Parentheses"
                    />
                    <BookOpen className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                  </div>
                  <p className={`mt-2 text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
                    }`}>
                    {formData.title.length}/200 characters
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className={`block text-lg font-medium mb-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    maxLength={1000}
                    className={`w-full px-4 py-3 text-lg border rounded-xl focus:outline-none transition-all duration-300 resize-none ${isDarkMode
                        ? 'bg-slate-700/50 border-slate-600/50 text-white placeholder-gray-400 focus:border-purple-400'
                        : 'bg-white/70 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                      }`}
                    placeholder="Brief description of the problem (optional)"
                  />
                  <p className={`mt-2 text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
                    }`}>
                    {formData.description.length}/1000 characters
                  </p>
                </div>

                {/* Platform, Difficulty, Category Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className={`block text-lg font-medium mb-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                      Platform
                    </label>
                    <div className="relative">
                      <select
                        name="platform"
                        value={formData.platform}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 text-lg border rounded-xl focus:outline-none transition-all duration-300 appearance-none pr-10 ${isDarkMode
                            ? 'bg-slate-700/50 border-slate-600/50 text-white focus:border-purple-400'
                            : 'bg-white/70 border-gray-300/50 text-gray-900 focus:border-purple-500'
                          }`}
                      >
                        {platforms.map(platform => (
                          <option key={platform} value={platform}>
                            {platform}
                          </option>
                        ))}
                      </select>
                      <Globe className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-lg font-medium mb-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                      Difficulty *
                    </label>
                    <div className="relative">
                      <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 text-lg border rounded-xl focus:outline-none transition-all duration-300 appearance-none pr-10 ${isDarkMode
                            ? 'bg-slate-700/50 border-slate-600/50 text-white focus:border-purple-400'
                            : 'bg-white/70 border-gray-300/50 text-gray-900 focus:border-purple-500'
                          }`}
                      >
                        {difficulties.map(difficulty => (
                          <option key={difficulty} value={difficulty}>
                            {difficulty}
                          </option>
                        ))}
                      </select>
                      <Target className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none ${getDifficultyColor(formData.difficulty)
                        }`} />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-lg font-medium mb-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                      Category *
                    </label>
                    <div className="relative">
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 text-lg border rounded-xl focus:outline-none transition-all duration-300 appearance-none pr-10 ${isDarkMode
                            ? 'bg-slate-700/50 border-slate-600/50 text-white focus:border-purple-400'
                            : 'bg-white/70 border-gray-300/50 text-gray-900 focus:border-purple-500'
                          }`}
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <Code2 className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className={`block text-lg font-medium mb-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Tags
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 text-lg border rounded-xl focus:outline-none transition-all duration-300 pr-12 ${isDarkMode
                          ? 'bg-slate-700/50 border-slate-600/50 text-white placeholder-gray-400 focus:border-purple-400'
                          : 'bg-white/70 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                        }`}
                      placeholder="array, two-pointers, hash-map (comma separated)"
                    />
                    <Tag className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                  </div>
                  <p className={`mt-2 text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
                    }`}>
                    Enter tags separated by commas
                  </p>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => navigate(`/group/${groupId}`)}
                    className={`flex-1 px-6 py-4 text-lg border rounded-xl transition-all cursor-pointer hover:scale-105 active:scale-95 ${isDarkMode
                        ? 'bg-slate-700/50 text-gray-300 border-slate-600/50 hover:bg-slate-600/50'
                        : 'bg-gray-100/80 text-gray-700 border-gray-300/50 hover:bg-gray-200/80'
                      }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-4 text-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group cursor-pointer hover:scale-105 active:scale-95"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                        Adding Question...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                        Add Question
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Sidebar - Tips & Preview (1/3 width) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Preview */}
            <div className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 ${isDarkMode
                ? 'bg-slate-800/30 border-slate-600/30'
                : 'bg-white/40 border-gray-200/30'
              }`}>
              <h3 className={`text-xl font-bold mb-4 flex items-center transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                👀 Preview
              </h3>

              <div className={`rounded-xl p-4 border transition-all duration-300 ${isDarkMode
                  ? 'bg-slate-700/30 border-slate-600/30'
                  : 'bg-gray-100/60 border-gray-300/30'
                }`}>
                <h4 className={`font-bold mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                  {formData.title || 'Question Title'}
                </h4>

                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${formData.difficulty === 'Easy'
                      ? isDarkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'
                      : formData.difficulty === 'Medium'
                        ? isDarkMode ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-700'
                        : isDarkMode ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-700'
                    }`}>
                    {formData.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs transition-all duration-300 ${isDarkMode
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'bg-purple-100 text-purple-700'
                    }`}>
                    {formData.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs transition-all duration-300 ${isDarkMode
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'bg-blue-100 text-blue-700'
                    }`}>
                    {formData.platform}
                  </span>
                </div>

                <p className={`text-sm mb-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                  {formData.description || 'Question description will appear here...'}
                </p>

                {formData.tags && (
                  <div className="flex flex-wrap gap-1">
                    {formData.tags.split(',').map((tag, index) => tag.trim() && (
                      <span key={index} className={`px-2 py-1 rounded text-xs transition-all duration-300 ${isDarkMode
                          ? 'bg-gray-600/30 text-gray-300'
                          : 'bg-gray-200/60 text-gray-700'
                        }`}>
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className={`border rounded-2xl p-6 transition-all duration-300 ${isDarkMode
                ? 'bg-blue-500/10 border-blue-500/20'
                : 'bg-blue-50/80 border-blue-200/60'
              }`}>
              <h4 className={`font-medium mb-4 flex items-center transition-colors duration-300 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'
                }`}>
                <Lightbulb className="w-5 h-5 mr-2" />
                💡 Tips
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                  <span className={`transition-colors duration-300 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'
                    }`}>
                    Paste the problem URL first and click "Extract" to auto-fill fields
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                  <span className={`transition-colors duration-300 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'
                    }`}>
                    Choose appropriate difficulty and category for better searchability
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                  <span className={`transition-colors duration-300 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'
                    }`}>
                    Add relevant tags to help group members find similar problems
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                  <span className={`transition-colors duration-300 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'
                    }`}>
                    Description is optional but helps provide context
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddQuestion;