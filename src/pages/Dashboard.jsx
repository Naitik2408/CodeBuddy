import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyGroups } from '../features/group/groupSlice';
import { toggleTheme } from '../features/theme/themeSlice';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Plus, 
  Code2, 
  ArrowRight, 
  Lock, 
  Globe, 
  Crown, 
  Search,
  LogOut,
  UserPlus,
  Calendar,
  Activity,
  ChevronRight,
  Star,
  Zap,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';
import axios from '../services/axiosInstance';

const Dashboard = () => {
  const { token, user, isAuthenticated } = useSelector((state) => state.auth);
  const { groups, loading, error } = useSelector((state) => state.group);
  const { isDarkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // States for join group modal
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [joiningGroup, setJoiningGroup] = useState(false);
  const [joinError, setJoinError] = useState('');
  
  // UI States
  const [searchQuery, setSearchQuery] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    dispatch(fetchMyGroups());
  }, [dispatch, isAuthenticated, navigate]);

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

  // Handle joining a group with invite code
  const handleJoinGroup = async (e) => {
    e.preventDefault();

    if (!inviteCode.trim()) {
      setJoinError('Please enter an invite code');
      return;
    }

    try {
      setJoiningGroup(true);
      setJoinError('');

      console.log('Joining group with code:', inviteCode.trim());

      const response = await axios.post('/api/groups/join', {
        inviteCode: inviteCode.trim()
      });

      console.log('Join group response:', response.data);

      // Refresh groups list
      dispatch(fetchMyGroups());

      // Close modal and reset form
      setShowJoinModal(false);
      setInviteCode('');

      // Show success message
      alert(`Successfully joined "${response.data.group.name}"!`);

      // Check if group._id exists before navigating
      if (response.data.group && response.data.group._id) {
        console.log('Navigating to group:', response.data.group._id);
        navigate(`/group/${response.data.group._id}`);
      } else {
        console.error('Group _id is missing from response:', response.data);
        window.location.reload();
      }

    } catch (err) {
      console.error('Join group error:', err);
      setJoinError(
        err.response?.data?.message ||
        'Failed to join group. Please check the invite code and try again.'
      );
    } finally {
      setJoiningGroup(false);
    }
  };

  // Filter groups based on search query
  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                }`}>Practice Together</p>
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
                  }`}>Welcome back,</p>
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
      <main className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Hero Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Groups */}
          <div className={`backdrop-blur-sm border rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 group ${
            isDarkMode 
              ? 'bg-slate-800/30 border-slate-600/30' 
              : 'bg-white/40 border-gray-200/30'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Total Groups</p>
                <p className={`text-2xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{groups.length}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-purple-500/30 transition-colors ${
                isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'
              }`}>
                <Users className={`w-6 h-6 ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-600'
                }`} />
              </div>
            </div>
          </div>

          {/* Admin Groups */}
          <div className={`backdrop-blur-sm border rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 group ${
            isDarkMode 
              ? 'bg-slate-800/30 border-slate-600/30' 
              : 'bg-white/40 border-gray-200/30'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Admin Groups</p>
                <p className={`text-2xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {groups.filter(g => g.userRole === 'admin' || g.memberRole === 'admin').length}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors ${
                isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
              }`}>
                <Crown className={`w-6 h-6 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
            </div>
          </div>

          {/* Active Groups */}
          <div className={`backdrop-blur-sm border rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 group ${
            isDarkMode 
              ? 'bg-slate-800/30 border-slate-600/30' 
              : 'bg-white/40 border-gray-200/30'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Active Today</p>
                <p className={`text-2xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{Math.min(groups.length, 3)}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-green-500/30 transition-colors ${
                isDarkMode ? 'bg-green-500/20' : 'bg-green-100'
              }`}>
                <Activity className={`w-6 h-6 ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`} />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h2 className={`text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-2 transition-colors duration-300 ${
              isDarkMode 
                ? 'from-white to-purple-200' 
                : 'from-gray-900 to-purple-800'
            }`}>
              Your Study Groups
            </h2>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {groups.length > 0 
                ? `Managing ${groups.length} groups • Practice coding together`
                : 'Start your coding journey by creating or joining a group'
              }
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Search Bar */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-3 border rounded-xl focus:outline-none transition-all duration-300 w-full sm:w-64 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-600/50 text-white placeholder-gray-400 focus:border-purple-400' 
                    : 'bg-white/70 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                }`}
              />
            </div>

            {/* Join Group Button */}
            <button
              onClick={() => setShowJoinModal(true)}
              className={`flex items-center justify-center px-6 py-3 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 group ${
                isDarkMode 
                  ? 'bg-green-600/20 text-green-300 border-green-500/30 hover:bg-green-600/30 hover:border-green-400/50' 
                  : 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200 hover:border-green-400'
              }`}
            >
              <UserPlus className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Join Group
            </button>

            {/* Create Group Button */}
            <button
              onClick={() => navigate('/dashboard/create-group')}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform cursor-pointer hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/25 group"
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Create Group
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-flex flex-col items-center">
              <div className="relative">
                <div className={`w-16 h-16 border-4 rounded-full animate-spin ${
                  isDarkMode ? 'border-purple-200/20' : 'border-purple-200/40'
                }`}></div>
                <div className={`absolute top-0 left-0 w-16 h-16 border-4 border-t-transparent rounded-full animate-spin ${
                  isDarkMode ? 'border-purple-500' : 'border-purple-600'
                }`}></div>
              </div>
              <p className={`mt-4 animate-pulse transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Loading your groups...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className={`border rounded-2xl p-6 mb-8 ${
            isDarkMode 
              ? 'bg-red-500/10 border-red-500/20' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                isDarkMode ? 'bg-red-500/20' : 'bg-red-100'
              }`}>
                <Zap className={`w-6 h-6 ${
                  isDarkMode ? 'text-red-400' : 'text-red-600'
                }`} />
              </div>
              <div>
                <h3 className={`font-medium ${
                  isDarkMode ? 'text-red-300' : 'text-red-800'
                }`}>Oops! Something went wrong</h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-red-400/80' : 'text-red-700'
                }`}>{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && groups.length === 0 && (
          <div className="text-center py-20">
            <div className="relative inline-block">
              <div className={`w-32 h-32 rounded-3xl flex items-center justify-center mb-8 animate-pulse ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20' 
                  : 'bg-gradient-to-r from-purple-200/60 to-pink-200/60'
              }`}>
                <Users className={`w-16 h-16 ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-600'
                }`} />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center animate-bounce">
                <Plus className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Ready to start coding together?</h3>
            <p className={`mb-8 max-w-md mx-auto transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Create your first study group or join an existing one with an invite code. 
              Practice problems, share solutions, and level up together!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setShowJoinModal(true)}
                className={`flex items-center justify-center px-8 py-4 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 group ${
                  isDarkMode 
                    ? 'bg-green-600/20 text-green-300 border-green-500/30 hover:bg-green-600/30 hover:border-green-400/50' 
                    : 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200 hover:border-green-400'
                }`}
              >
                <UserPlus className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                Join with Invite Code
              </button>
              <button
                onClick={() => navigate('/dashboard/create-group')}
                className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform cursor-pointer hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/25 group"
              >
                <Plus className="w-6 h-6 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                Create New Group
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Groups Grid */}
        {!loading && filteredGroups.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredGroups.map((group) => (
              <div 
                key={group._id} 
                className={`group relative backdrop-blur-sm border rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer ${
                  isDarkMode 
                    ? 'bg-slate-800/30 border-slate-600/30' 
                    : 'bg-white/40 border-gray-200/30'
                }`}
                onClick={() => navigate(`/group/${group._id}`)}
              >
                {/* Admin Badge */}
                {(group.userRole === 'admin' || group.memberRole === 'admin') && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-2 shadow-lg">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Group Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {group.name}
                    </h3>
                    <p className={`text-sm line-clamp-2 leading-relaxed transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {group.description || 'No description available'}
                    </p>
                  </div>
                </div>

                {/* Group Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className={`text-center p-3 rounded-xl ${
                    isDarkMode ? 'bg-slate-700/30' : 'bg-gray-100/60'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-purple-300' : 'text-purple-600'
                    }`}>{group.memberCount || 0}</div>
                    <div className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Members</div>
                  </div>
                  <div className={`text-center p-3 rounded-xl ${
                    isDarkMode ? 'bg-slate-700/30' : 'bg-gray-100/60'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-blue-300' : 'text-blue-600'
                    }`}>{group.questionCount || 0}</div>
                    <div className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Questions</div>
                  </div>
                </div>

                {/* Group Info Bar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {/* Privacy Status */}
                    <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                      group.isPrivate 
                        ? isDarkMode
                          ? 'bg-red-500/20 text-red-300 border-red-500/30'
                          : 'bg-red-100 text-red-700 border-red-300'
                        : isDarkMode
                          ? 'bg-green-500/20 text-green-300 border-green-500/30'
                          : 'bg-green-100 text-green-700 border-green-300'
                    }`}>
                      {group.isPrivate ? (
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

                    {/* Activity Indicator */}
                    <div className={`flex items-center px-3 py-1 rounded-full text-xs border ${
                      isDarkMode 
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
                        : 'bg-purple-100 text-purple-700 border-purple-300'
                    }`}>
                      <Activity className="w-3 h-3 mr-1" />
                      Active
                    </div>
                  </div>

                  {/* View Group Arrow */}
                  <div className={`flex items-center group-hover:text-purple-300 transition-colors ${
                    isDarkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>
                    <span className="text-sm font-medium mr-1">View</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Recent Activity */}
                <div className={`border-t pt-4 ${
                  isDarkMode ? 'border-slate-600/30' : 'border-gray-300/30'
                }`}>
                  <div className={`flex items-center text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <Calendar className="w-3 h-3 mr-2" />
                    <span>Last activity: 2 hours ago</span>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}

        {/* No Search Results */}
        {!loading && searchQuery && filteredGroups.length === 0 && groups.length > 0 && (
          <div className="text-center py-16">
            <Search className={`w-16 h-16 mx-auto mb-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <h3 className={`text-xl font-medium mb-2 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>No groups found</h3>
            <p className={`mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              No groups match your search for "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className={`font-medium cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 ${
                isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
              }`}
            >
              Clear search
            </button>
          </div>
        )}
      </main>

      {/* Join Group Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`backdrop-blur-sm border rounded-2xl p-8 w-full max-w-md relative ${
            isDarkMode 
              ? 'bg-slate-800/90 border-slate-600/50' 
              : 'bg-white/95 border-gray-300/50'
          }`}>
            {/* Close Button */}
            <button
              onClick={() => {
                setShowJoinModal(false);
                setInviteCode('');
                setJoinError('');
              }}
              className={`absolute top-4 right-4 transition-colors cursor-pointer hover:scale-110 active:scale-95 ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Plus className="w-6 h-6 rotate-45" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Join a Group</h3>
              <p className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Enter the invite code shared by a group admin
              </p>
            </div>

            {/* Error Message */}
            {joinError && (
              <div className={`mb-6 p-4 border rounded-xl ${
                isDarkMode 
                  ? 'bg-red-500/10 border-red-500/20' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-sm flex items-center ${
                  isDarkMode ? 'text-red-300' : 'text-red-700'
                }`}>
                  <Zap className="w-4 h-4 mr-2" />
                  {joinError}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleJoinGroup} className="space-y-6">
              <div>
                <label htmlFor="inviteCode" className={`block text-sm font-medium mb-3 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Invite Code *
                </label>
                <input
                  type="text"
                  id="inviteCode"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-700/50 border-slate-600/50 text-white placeholder-gray-400 focus:border-green-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
                  }`}
                  placeholder="Enter invite code (e.g., ABC123)"
                  required
                  disabled={joiningGroup}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowJoinModal(false);
                    setInviteCode('');
                    setJoinError('');
                  }}
                  className={`flex-1 px-6 py-3 border rounded-xl transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                    isDarkMode 
                      ? 'bg-slate-700/50 text-gray-300 border-slate-600/50 hover:bg-slate-600/50' 
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  }`}
                  disabled={joiningGroup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center group cursor-pointer hover:scale-105 active:scale-95"
                  disabled={joiningGroup}
                >
                  {joiningGroup ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Joining...
                    </>
                  ) : (
                    <>
                      Join Group
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Tip */}
            <div className={`mt-6 p-4 border rounded-xl ${
              isDarkMode 
                ? 'bg-blue-500/10 border-blue-500/20' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <p className={`text-sm flex items-start ${
                isDarkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>
                <Star className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Tip:</strong> Group admins can share invite codes by copying them from their group settings page.
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;