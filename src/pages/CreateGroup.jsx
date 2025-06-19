import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createGroup } from '../features/group/groupSlice';
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
  CheckCircle
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
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
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
      <header className="relative z-20 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo & Back Button */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center px-4 py-2 bg-slate-800/50 text-gray-300 rounded-xl border border-slate-600/50 hover:bg-slate-700/50 hover:border-slate-500/50 transition-all group"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
              </button>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Code2 className="w-8 h-8 text-purple-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    CodeBuddy
                  </h1>
                  <p className="text-xs text-gray-400">Create Group</p>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-400 ml-3">Step 1 of 3</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Main Form (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-600/30 rounded-3xl p-10 shadow-2xl">
              {/* Form Header */}
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25">
                  <Plus className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-3">
                  Create New Group
                </h2>
                <p className="text-lg text-gray-400">
                  Start a new coding group and invite your friends to practice together!
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-8 p-5 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <div className="flex items-center">
                    <Zap className="w-6 h-6 text-red-400 mr-4" />
                    <p className="text-red-300">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Group Name */}
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-4">
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
                      className="w-full px-6 py-4 text-lg bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors pr-14"
                      placeholder="Enter group name (3-100 characters)"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Users className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    {formData.name.length}/100 characters
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-4">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    maxLength={500}
                    className="w-full px-6 py-4 text-lg bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors resize-none"
                    placeholder="Describe your group's purpose and goals (optional)"
                  />
                  <p className="text-sm text-gray-500 mt-3">
                    {formData.description.length}/500 characters
                  </p>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-4">
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
                          className={`p-5 rounded-xl border transition-all duration-300 text-left group ${
                            isSelected 
                              ? 'bg-purple-600/20 border-purple-500/50 text-purple-200' 
                              : 'bg-slate-700/30 border-slate-600/30 text-gray-300 hover:border-purple-500/30 hover:bg-purple-600/10'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              isSelected ? 'bg-purple-500/30' : 'bg-slate-600/50 group-hover:bg-purple-500/20'
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
                  <label className="block text-lg font-medium text-gray-300">
                    Privacy Settings
                  </label>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {/* Public Option */}
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, isPrivate: false }))}
                      className={`p-6 rounded-xl border transition-all duration-300 text-left ${
                        !formData.isPrivate
                          ? 'bg-green-600/20 border-green-500/50 text-green-200'
                          : 'bg-slate-700/30 border-slate-600/30 text-gray-300 hover:border-green-500/30'
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
                      className={`p-6 rounded-xl border transition-all duration-300 text-left ${
                        formData.isPrivate
                          ? 'bg-red-600/20 border-red-500/50 text-red-200'
                          : 'bg-slate-700/30 border-slate-600/30 text-gray-300 hover:border-red-500/30'
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
                    className="flex-1 px-8 py-4 text-lg bg-slate-700/50 text-gray-300 rounded-xl border border-slate-600/50 hover:bg-slate-600/50 transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !formData.name.trim()}
                    className="flex-1 px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
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
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                Preview
              </h3>
              
              <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
                {/* Group Header */}
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-white mb-2">
                    {formData.name || 'Your Group Name'}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {formData.description || 'Your group description will appear here...'}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-3 bg-slate-600/30 rounded-lg">
                    <div className="text-xl font-bold text-purple-300">1</div>
                    <div className="text-xs text-gray-400">Members</div>
                  </div>
                  <div className="text-center p-3 bg-slate-600/30 rounded-lg">
                    <div className="text-xl font-bold text-blue-300">0</div>
                    <div className="text-xs text-gray-400">Questions</div>
                  </div>
                </div>

                {/* Info Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {/* Privacy Badge */}
                    <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      formData.isPrivate 
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                        : 'bg-green-500/20 text-green-300 border border-green-500/30'
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
                    <div className="flex items-center px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30">
                      {React.createElement(getCategoryIcon(formData.category), { className: "w-3 h-3 mr-1" })}
                      {formData.category}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
              <h4 className="font-medium text-blue-300 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Pro Tips
              </h4>
              <ul className="space-y-3 text-sm text-blue-200">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                  Choose a descriptive name that reflects your group's purpose
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                  Add a clear description to attract the right members
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                  Private groups are great for close friends or teams
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                  You can always change settings later as an admin
                </li>
              </ul>
            </div>

            {/* Next Steps */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6">
              <h4 className="font-medium text-purple-300 mb-4">What's Next?</h4>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-purple-200">
                  <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center mr-3 text-xs font-bold">1</div>
                  Create your group
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <div className="w-6 h-6 bg-gray-600/20 rounded-full flex items-center justify-center mr-3 text-xs font-bold">2</div>
                  Invite friends with your group code
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <div className="w-6 h-6 bg-gray-600/20 rounded-full flex items-center justify-center mr-3 text-xs font-bold">3</div>
                  Start adding coding questions
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <div className="w-6 h-6 bg-gray-600/20 rounded-full flex items-center justify-center mr-3 text-xs font-bold">4</div>
                  Practice and learn together!
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