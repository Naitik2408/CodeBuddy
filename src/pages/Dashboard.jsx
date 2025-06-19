import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyGroups } from '../features/group/groupSlice';
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
  TrendingUp,
  Award,
  Activity,
  ChevronRight,
  Settings,
  Bell,
  Star,
  Zap
} from 'lucide-react';
import axios from '../services/axiosInstance';

const Dashboard = () => {
  const { token, user, isAuthenticated } = useSelector((state) => state.auth);
  const { groups, loading, error } = useSelector((state) => state.group);
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

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
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Code2 className="w-8 h-8 text-purple-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  CodeBuddy
                </h1>
                <p className="text-xs text-gray-400">Practice Together</p>
              </div>
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center space-x-6">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-purple-400 transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"></div>
              </button>

              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="font-medium text-white">Welcome back,</p>
                  <p className="text-sm text-purple-300">{user?.name}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Settings & Logout */}
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-all group"
                >
                  <LogOut className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Hero Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Groups */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Groups</p>
                <p className="text-2xl font-bold text-white">{groups.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Admin Groups */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Admin Groups</p>
                <p className="text-2xl font-bold text-white">
                  {groups.filter(g => g.userRole === 'admin' || g.memberRole === 'admin').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <Crown className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Active Groups */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Today</p>
                <p className="text-2xl font-bold text-white">{Math.min(groups.length, 3)}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          {/* Your Rank */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Your Rank</p>
                <p className="text-2xl font-bold text-white">#42</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
              Your Study Groups
            </h2>
            <p className="text-gray-400">
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors w-full sm:w-64"
              />
            </div>

            {/* Join Group Button */}
            <button
              onClick={() => setShowJoinModal(true)}
              className="flex items-center justify-center px-6 py-3 bg-green-600/20 text-green-300 rounded-xl border border-green-500/30 hover:bg-green-600/30 hover:border-green-400/50 transition-all duration-300 group"
            >
              <UserPlus className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Join Group
            </button>

            {/* Create Group Button */}
            <button
              onClick={() => navigate('/dashboard/create-group')}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25 group"
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
                <div className="w-16 h-16 border-4 border-purple-200/20 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-gray-400 animate-pulse">Loading your groups...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mr-4">
                <Zap className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-red-300 font-medium">Oops! Something went wrong</h3>
                <p className="text-red-400/80 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && groups.length === 0 && (
          <div className="text-center py-20">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl flex items-center justify-center mb-8 animate-pulse">
                <Users className="w-16 h-16 text-purple-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center animate-bounce">
                <Plus className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">Ready to start coding together?</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Create your first study group or join an existing one with an invite code. 
              Practice problems, share solutions, and level up together!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setShowJoinModal(true)}
                className="flex items-center justify-center px-8 py-4 bg-green-600/20 text-green-300 rounded-xl border border-green-500/30 hover:bg-green-600/30 hover:border-green-400/50 transition-all duration-300 group"
              >
                <UserPlus className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                Join with Invite Code
              </button>
              <button
                onClick={() => navigate('/dashboard/create-group')}
                className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25 group"
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
                className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
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
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {group.name}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                      {group.description || 'No description available'}
                    </p>
                  </div>
                </div>

                {/* Group Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-slate-700/30 rounded-xl">
                    <div className="text-2xl font-bold text-purple-300">{group.memberCount || 0}</div>
                    <div className="text-xs text-gray-400">Members</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded-xl">
                    <div className="text-2xl font-bold text-blue-300">{group.questionCount || 0}</div>
                    <div className="text-xs text-gray-400">Questions</div>
                  </div>
                </div>

                {/* Group Info Bar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {/* Privacy Status */}
                    <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      group.isPrivate 
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                        : 'bg-green-500/20 text-green-300 border border-green-500/30'
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
                    <div className="flex items-center px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30">
                      <Activity className="w-3 h-3 mr-1" />
                      Active
                    </div>
                  </div>

                  {/* View Group Arrow */}
                  <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                    <span className="text-sm font-medium mr-1">View</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="border-t border-slate-600/30 pt-4">
                  <div className="flex items-center text-xs text-gray-400">
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
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No groups found</h3>
            <p className="text-gray-400 mb-4">
              No groups match your search for "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Clear search
            </button>
          </div>
        )}
      </main>

      {/* Join Group Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-8 w-full max-w-md relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowJoinModal(false);
                setInviteCode('');
                setJoinError('');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <Plus className="w-6 h-6 rotate-45" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Join a Group</h3>
              <p className="text-gray-400">
                Enter the invite code shared by a group admin
              </p>
            </div>

            {/* Error Message */}
            {joinError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-300 text-sm flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  {joinError}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleJoinGroup} className="space-y-6">
              <div>
                <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-300 mb-3">
                  Invite Code *
                </label>
                <input
                  type="text"
                  id="inviteCode"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors"
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
                  className="flex-1 px-6 py-3 bg-slate-700/50 text-gray-300 rounded-xl border border-slate-600/50 hover:bg-slate-600/50 transition-colors"
                  disabled={joiningGroup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center group"
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
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <p className="text-blue-300 text-sm flex items-start">
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