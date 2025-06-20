import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../features/theme/themeSlice';
import axios from '../services/axiosInstance';
import questionService from '../services/questionService';
import { 
  ArrowLeft, 
  Users, 
  Code2, 
  Crown,
  Copy,
  Check,
  Plus,
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  UserPlus,
  Settings,
  LogOut,
  Sun,
  Moon,
  Sparkles,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

// Import the separated components
import QuestionCard from '../components/QuestionCard';
import MemberCard from '../components/MemberCard';
import ResponseModal from '../components/ResponseModal';

const GroupPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { isDarkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  
  // Main data states
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // UI states
  const [activeTab, setActiveTab] = useState('questions');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [copiedInvite, setCopiedInvite] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Modal states
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [submittingResponse, setSubmittingResponse] = useState(false);
  
  // Response states
  const [questionResponses, setQuestionResponses] = useState({});
  const [expandedResponses, setExpandedResponses] = useState({});
  const [loadingResponses, setLoadingResponses] = useState({});

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!groupId) return;
    fetchGroupData();
  }, [groupId]);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch({ type: 'auth/logout' });
    navigate('/login');
  };

  const fetchGroupData = async () => {
    try {
      setLoading(true);
      setError('');

      const promises = [
        axios.get(`/api/groups/${groupId}`),
        axios.get(`/api/groups/${groupId}/members`).catch(err => ({ data: { members: [] } })),
        questionService.getGroupQuestions(groupId).catch(err => ({ data: { questions: [] } }))
      ];

      const [groupRes, membersRes, questionsRes] = await Promise.all(promises);

      setGroup(groupRes.data);
      setMembers(membersRes.data.members || []);
      setQuestions(questionsRes.data.questions || []);

    } catch (err) {
      console.error('Error fetching group data:', err);
      setError(err.response?.data?.message || 'Failed to load group');
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestionResponses = async (questionId) => {
    if (loadingResponses[questionId]) return;

    try {
      setLoadingResponses(prev => ({ ...prev, [questionId]: true }));
      const response = await questionService.getQuestionResponses(questionId);
      setQuestionResponses(prev => ({ ...prev, [questionId]: response.data }));
    } catch (err) {
      console.error('Error fetching question responses:', err);
      if (err.response?.status !== 403) {
        setQuestionResponses(prev => ({
          ...prev,
          [questionId]: { error: 'Failed to load responses' }
        }));
      }
    } finally {
      setLoadingResponses(prev => ({ ...prev, [questionId]: false }));
    }
  };

  const toggleResponsesView = (questionId) => {
    setExpandedResponses(prev => ({ ...prev, [questionId]: !prev[questionId] }));
    if (!expandedResponses[questionId] && !questionResponses[questionId]) {
      fetchQuestionResponses(questionId);
    }
  };

  const handleSubmitResponse = (question) => {
    setSelectedQuestion(question);
    setShowResponseModal(true);
  };

  const submitMemberResponse = async (responseData) => {
    try {
      setSubmittingResponse(true);
      await questionService.submitResponse(selectedQuestion._id, responseData);
      
      await refreshQuestions();
      setQuestionResponses(prev => {
        const updated = { ...prev };
        delete updated[selectedQuestion._id];
        return updated;
      });

      setShowResponseModal(false);
      setSelectedQuestion(null);
      alert('Response submitted successfully!');
    } catch (err) {
      console.error('Error submitting response:', err);
      alert(err.response?.data?.message || 'Failed to submit response');
    } finally {
      setSubmittingResponse(false);
    }
  };

  const refreshQuestions = async () => {
    try {
      const response = await questionService.getGroupQuestions(groupId);
      setQuestions(response.data.questions || []);
    } catch (err) {
      console.error('Error refreshing questions:', err);
    }
  };

  const copyInviteCode = () => {
    if (group?.inviteCode) {
      navigator.clipboard.writeText(group.inviteCode);
      setCopiedInvite(true);
      setTimeout(() => setCopiedInvite(false), 2000);
    }
  };

  const handleLeaveGroup = async () => {
    if (window.confirm('Are you sure you want to leave this group?')) {
      try {
        await axios.post(`/api/groups/${groupId}/leave`);
        navigate('/dashboard');
      } catch (err) {
        console.error('Leave group error:', err);
        setError(err.response?.data?.message || 'Failed to leave group');
      }
    }
  };

  // Filter questions
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || question.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const isAdmin = group?.adminId === user?.id || group?.adminId?._id === user?.id || group?.userRole === 'admin';
  const isMember = members.some(member => 
    member.userId?._id === user?.id || member.userId === user?.id
  ) || group?.userRole || group?.userStatus === 'active';

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'
      }`}>
        <div className="text-center">
          <div className="relative">
            <div className={`w-16 h-16 border-4 rounded-full animate-spin transition-all duration-300 ${
              isDarkMode ? 'border-purple-200/20' : 'border-purple-200/40'
            }`}></div>
            <div className={`absolute top-0 left-0 w-16 h-16 border-4 border-t-transparent rounded-full animate-spin transition-all duration-300 ${
              isDarkMode ? 'border-purple-500' : 'border-purple-600'
            }`}></div>
          </div>
          <p className={`mt-4 animate-pulse transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Loading group...</p>
        </div>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'
      }`}>
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircle className={`w-16 h-16 mx-auto mb-4 ${
            isDarkMode ? 'text-red-400' : 'text-red-500'
          }`} />
          <h2 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Group Not Found</h2>
          <p className={`mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>{error || 'The group you\'re looking for doesn\'t exist.'}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            Back to Dashboard
          </button>
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

      {/* Header - Mobile Responsive */}
      <header className={`relative z-20 backdrop-blur-sm transition-all duration-300 ${
        isDarkMode 
          ? 'border-b border-slate-700/50' 
          : 'border-b border-gray-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop & Tablet Header */}
          <div className="hidden md:flex justify-between items-center h-20">
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
                }`}>{group?.name || 'Group'}</p>
              </div>
            </button>

            {/* User Info & Actions */}
            <div className="flex items-center space-x-6">
              {/* Back Button */}
              <button
                onClick={() => navigate('/dashboard')}
                className={`flex items-center px-4 py-2 rounded-lg border transition-all cursor-pointer hover:scale-105 active:scale-95 group ${
                  isDarkMode 
                    ? 'bg-slate-700/50 text-gray-300 border-slate-600/50 hover:bg-slate-600/50' 
                    : 'bg-gray-100/80 text-gray-700 border-gray-300/50 hover:bg-gray-200/80'
                }`}
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back
              </button>

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
                  }`}>Welcome,</p>
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

              {/* Copy Invite Code */}
              {group?.inviteCode && (
                <button
                  onClick={copyInviteCode}
                  className={`flex items-center px-4 py-2 rounded-xl border transition-all cursor-pointer hover:scale-105 active:scale-95 group ${
                    isDarkMode 
                      ? 'bg-green-600/20 text-green-300 border-green-500/30 hover:bg-green-600/30' 
                      : 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200'
                  }`}
                >
                  {copiedInvite ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copiedInvite ? 'Copied!' : 'Copy Invite'}
                </button>
              )}

              {/* Leave/Logout Button */}
              {!isAdmin && isMember ? (
                <button
                  onClick={handleLeaveGroup}
                  className={`flex items-center px-4 py-2 rounded-lg border transition-all cursor-pointer hover:scale-105 active:scale-95 group ${
                    isDarkMode 
                      ? 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30' 
                      : 'bg-red-100 text-red-600 border-red-200 hover:bg-red-200'
                  }`}
                >
                  <LogOut className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  Leave Group
                </button>
              ) : (
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
              )}
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden flex justify-between items-center h-16">
            {/* Mobile Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 group"
            >
              <div className="relative">
                <Code2 className={`w-6 h-6 transition-colors duration-300 ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-600'
                }`} />
                <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full animate-ping ${
                  isDarkMode ? 'bg-pink-400' : 'bg-pink-500'
                }`}></div>
              </div>
              <div>
                <h1 className={`text-lg font-bold bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-300 ${
                  isDarkMode 
                    ? 'from-purple-400 to-pink-400' 
                    : 'from-purple-600 to-pink-600'
                }`}>
                  CodeBuddy
                </h1>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-slate-800/80 border border-slate-600/50 text-white' 
                  : 'bg-white/80 border border-gray-200/50 text-gray-900'
              }`}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className={`md:hidden absolute top-full left-0 right-0 backdrop-blur-sm border-t transition-all duration-300 z-50 ${
              isDarkMode 
                ? 'bg-slate-900/95 border-slate-700/50' 
                : 'bg-white/95 border-gray-200/50'
            }`}>
              <div className="px-4 py-6 space-y-4 max-h-screen overflow-y-auto">
                {/* Mobile User Info */}
                <div className={`flex items-center space-x-3 pb-4 border-b ${
                  isDarkMode ? 'border-slate-700/50' : 'border-gray-200/50'
                }`}>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className={`font-medium transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{user?.name}</p>
                    <p className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-purple-300' : 'text-purple-600'
                    }`}>{group?.name}</p>
                  </div>
                </div>

                {/* Mobile Back to Dashboard */}
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-800/50 border border-slate-600/30 text-white' 
                      : 'bg-gray-100 border border-gray-200 text-gray-900'
                  }`}
                >
                  <span className="flex items-center">
                    <ArrowLeft className="w-5 h-5 mr-3" />
                    <span className="font-medium">Back to Dashboard</span>
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Mobile Copy Invite Code */}
                {group?.inviteCode && (
                  <button
                    onClick={() => {
                      copyInviteCode();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-green-600/20 text-green-300 border-green-500/30' 
                        : 'bg-green-100 text-green-700 border-green-300'
                    }`}
                  >
                    <span className="flex items-center">
                      {copiedInvite ? <Check className="w-5 h-5 mr-3" /> : <Copy className="w-5 h-5 mr-3" />}
                      <span className="font-medium">{copiedInvite ? 'Invite Code Copied!' : 'Copy Invite Code'}</span>
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {/* Mobile Add Question */}
                {isMember && (
                  <button
                    onClick={() => {
                      navigate(`/group/${groupId}/add-question`);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl transition-all duration-300"
                  >
                    <span className="flex items-center">
                      <Plus className="w-5 h-5 mr-3" />
                      <span className="font-medium">Add Question</span>
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {/* Mobile Theme Toggle */}
                <button
                  onClick={() => {
                    handleThemeToggle();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-800/50 border border-slate-600/30 text-white' 
                      : 'bg-gray-100 border border-gray-200 text-gray-900'
                  }`}
                >
                  <span className="flex items-center">
                    {isDarkMode ? (
                      <Sun className="w-5 h-5 text-yellow-500 mr-3" />
                    ) : (
                      <Moon className="w-5 h-5 text-purple-600 mr-3" />
                    )}
                    <span className="font-medium">
                      Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
                    </span>
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Mobile Leave/Logout */}
                {!isAdmin && isMember ? (
                  <button
                    onClick={() => {
                      handleLeaveGroup();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-red-500/20 text-red-300 border-red-500/30' 
                        : 'bg-red-100 text-red-600 border-red-200'
                    }`}
                  >
                    <span className="flex items-center">
                      <LogOut className="w-5 h-5 mr-3" />
                      <span className="font-medium">Leave Group</span>
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-red-500/20 text-red-300 border-red-500/30' 
                        : 'bg-red-100 text-red-600 border-red-200'
                    }`}
                  >
                    <span className="flex items-center">
                      <LogOut className="w-5 h-5 mr-3" />
                      <span className="font-medium">Logout</span>
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content - Mobile Responsive */}
      <main className="relative z-10 max-w-7xl mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8">
        {/* Group Info Card - Mobile Responsive */}
        <div className={`backdrop-blur-sm border rounded-2xl p-4 md:p-6 mb-6 md:mb-8 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-800/30 border-slate-600/30' 
            : 'bg-white/40 border-gray-200/30'
        }`}>
          <div className="flex flex-col space-y-4">
            {/* Group Header - Mobile Layout */}
            <div className="flex items-start space-x-3 md:space-x-4">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Code2 className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                {isAdmin && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                    <Crown className="w-2 h-2 md:w-3 md:h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className={`text-xl md:text-3xl font-bold mb-1 md:mb-2 transition-colors duration-300 truncate ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{group.name}</h2>
                <p className={`text-sm md:text-lg transition-colors duration-300 line-clamp-2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>{group.description || 'No description provided'}</p>
              </div>
            </div>
            
            {/* Group Stats - Mobile Grid */}
            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-6 text-xs md:text-sm">
              <span className={`flex items-center justify-center md:justify-start p-2 md:p-0 rounded-lg md:rounded-none transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400 md:bg-transparent bg-slate-700/30' : 'text-gray-600 md:bg-transparent bg-gray-100/60'
              }`}>
                <Users className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                {members.length} members
              </span>
              <span className={`flex items-center justify-center md:justify-start p-2 md:p-0 rounded-lg md:rounded-none transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400 md:bg-transparent bg-slate-700/30' : 'text-gray-600 md:bg-transparent bg-gray-100/60'
              }`}>
                📂 {group.category || 'General'}
              </span>
              <span className={`flex items-center justify-center md:justify-start p-2 md:p-0 rounded-lg md:rounded-none transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400 md:bg-transparent bg-slate-700/30' : 'text-gray-600 md:bg-transparent bg-gray-100/60'
              }`}>
                {group.isPrivate ? '🔒 Private' : '🌐 Public'}
              </span>
              <span className={`flex items-center justify-center md:justify-start p-2 md:p-0 rounded-lg md:rounded-none transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400 md:bg-transparent bg-slate-700/30' : 'text-gray-600 md:bg-transparent bg-gray-100/60'
              }`}>
                📝 {questions.length} questions
              </span>
              {isAdmin && (
                <span className={`col-span-2 md:col-span-1 flex items-center justify-center md:justify-start p-2 md:p-0 rounded-lg md:rounded-none font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-400 md:bg-transparent bg-blue-500/20' : 'text-blue-600 md:bg-transparent bg-blue-100/60'
                }`}>
                  <Crown className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Admin
                </span>
              )}
            </div>

            {/* Mobile Add Question Button */}
            <div className="md:hidden">
              <button
                onClick={() => navigate(`/group/${groupId}/add-question`)}
                disabled={!isMember}
                className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:scale-105 active:scale-95 group"
              >
                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Add Question
              </button>
            </div>

            {/* Desktop Add Question Button */}
            <div className="hidden md:flex justify-end">
              <button
                onClick={() => navigate(`/group/${groupId}/add-question`)}
                disabled={!isMember}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:scale-105 active:scale-95 group"
              >
                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Add Question
              </button>
            </div>
          </div>
        </div>

        {/* Tabs - Mobile Responsive */}
        <div className={`backdrop-blur-sm border rounded-2xl mb-6 md:mb-8 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-800/30 border-slate-600/30' 
            : 'bg-white/40 border-gray-200/30'
        }`}>
          <div className={`border-b transition-all duration-300 ${
            isDarkMode ? 'border-slate-700/50' : 'border-gray-300/50'
          }`}>
            <nav className="flex px-4 md:px-6">
              <button
                onClick={() => setActiveTab('questions')}
                className={`flex-1 md:flex-none py-3 md:py-4 px-1 md:px-4 border-b-2 font-medium text-sm md:text-base transition-all cursor-pointer hover:scale-105 active:scale-95 text-center ${
                  activeTab === 'questions'
                    ? isDarkMode
                      ? 'border-purple-500 text-purple-400'
                      : 'border-purple-600 text-purple-600'
                    : isDarkMode
                      ? 'border-transparent text-gray-400 hover:text-gray-300'
                      : 'border-transparent text-gray-600 hover:text-gray-700'
                }`}
              >
                <span className="md:hidden">📝 ({questions.length})</span>
                <span className="hidden md:inline">📝 Questions ({questions.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('members')}
                className={`flex-1 md:flex-none py-3 md:py-4 px-1 md:px-4 border-b-2 font-medium text-sm md:text-base transition-all cursor-pointer hover:scale-105 active:scale-95 text-center ${
                  activeTab === 'members'
                    ? isDarkMode
                      ? 'border-purple-500 text-purple-400'
                      : 'border-purple-600 text-purple-600'
                    : isDarkMode
                      ? 'border-transparent text-gray-400 hover:text-gray-300'
                      : 'border-transparent text-gray-600 hover:text-gray-700'
                }`}
              >
                <span className="md:hidden">👥 ({members.length})</span>
                <span className="hidden md:inline">👥 Members ({members.length})</span>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-4 md:p-6">
            {activeTab === 'questions' && (
              <div>
                {/* Questions Header - Mobile Responsive */}
                <div className="flex flex-col space-y-4 mb-6">
                  <div>
                    <h3 className={`text-lg md:text-xl font-bold mb-1 md:mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Group Questions</h3>
                    <p className={`text-sm md:text-base transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Practice problems shared by group members</p>
                  </div>

                  <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                      <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type="text"
                        placeholder="Search questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`pl-10 pr-4 py-3 border rounded-xl focus:outline-none transition-all duration-300 w-full text-sm md:text-base ${
                          isDarkMode 
                            ? 'bg-slate-700/50 border-slate-600/50 text-white placeholder-gray-400 focus:border-purple-400' 
                            : 'bg-white/70 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                        }`}
                      />
                    </div>

                    <div className="flex gap-3 md:gap-4">
                      {/* Difficulty Filter */}
                      <select
                        value={difficultyFilter}
                        onChange={(e) => setDifficultyFilter(e.target.value)}
                        className={`flex-1 md:flex-none px-3 md:px-4 py-3 border rounded-xl focus:outline-none transition-all duration-300 text-sm md:text-base ${
                          isDarkMode 
                            ? 'bg-slate-700/50 border-slate-600/50 text-white focus:border-purple-400' 
                            : 'bg-white/70 border-gray-300/50 text-gray-900 focus:border-purple-500'
                        }`}
                      >
                        <option value="all">All Difficulties</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>

                      {/* Refresh Button */}
                      <button
                        onClick={refreshQuestions}
                        className={`flex items-center justify-center px-3 md:px-4 py-3 rounded-xl border transition-all cursor-pointer hover:scale-105 active:scale-95 group ${
                          isDarkMode 
                            ? 'bg-slate-700/50 text-gray-300 border-slate-600/50 hover:bg-slate-600/50' 
                            : 'bg-white/70 text-gray-700 border-gray-300/50 hover:bg-gray-100/70'
                        }`}
                      >
                        <RefreshCw className="w-4 h-4 md:mr-2 group-hover:rotate-180 transition-transform duration-300" />
                        <span className="hidden md:inline">Refresh</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Questions List */}
                {filteredQuestions.length === 0 ? (
                  <div className="text-center py-12 md:py-20">
                    <div className="text-4xl md:text-6xl mb-4">📝</div>
                    <h3 className={`text-lg md:text-xl font-bold mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {searchQuery || difficultyFilter !== 'all' ? 'No questions found' : 'No questions yet'}
                    </h3>
                    <p className={`mb-4 md:mb-6 px-4 text-sm md:text-base transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {searchQuery || difficultyFilter !== 'all' 
                        ? 'Try adjusting your search or filters'
                        : isMember 
                          ? "Be the first to add a coding question!" 
                          : "Join this group to see and add questions."
                      }
                    </p>
                    {isMember && !searchQuery && difficultyFilter === 'all' && (
                      <button
                        onClick={() => navigate(`/group/${groupId}/add-question`)}
                        className="px-4 md:px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all cursor-pointer hover:scale-105 active:scale-95 text-sm md:text-base"
                      >
                        Add First Question
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4 md:space-y-6">
                    {filteredQuestions.map((question) => (
                      <QuestionCard
                        key={question._id}
                        question={question}
                        members={members}
                        isMember={isMember}
                        user={user}
                        onSubmitResponse={handleSubmitResponse}
                        onToggleResponses={toggleResponsesView}
                        expandedResponses={expandedResponses}
                        questionResponses={questionResponses}
                        loadingResponses={loadingResponses}
                        isDarkMode={isDarkMode}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'members' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className={`text-lg md:text-xl font-bold mb-1 md:mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Group Members</h3>
                    <p className={`text-sm md:text-base transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Everyone practicing together</p>
                  </div>
                </div>

                {members.length === 0 ? (
                  <div className="text-center py-12 md:py-20">
                    <div className="text-4xl md:text-6xl mb-4">👥</div>
                    <h3 className={`text-lg md:text-xl font-bold mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>No members found</h3>
                    <p className={`text-sm md:text-base transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>This group doesn't have any members yet.</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {members.map((member) => (
                      <MemberCard key={member._id} member={member} isDarkMode={isDarkMode} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Response Modal */}
      {showResponseModal && selectedQuestion && (
        <ResponseModal
          question={selectedQuestion}
          onSubmit={submitMemberResponse}
          onClose={() => {
            setShowResponseModal(false);
            setSelectedQuestion(null);
          }}
          isSubmitting={submittingResponse}
          existingResponse={selectedQuestion.userResponse}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default GroupPage;