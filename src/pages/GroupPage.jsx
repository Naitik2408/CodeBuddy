import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  LogOut
} from 'lucide-react';

// Import the separated components
import QuestionCard from '../components/QuestionCard';
import MemberCard from '../components/MemberCard';
import ResponseModal from '../components/ResponseModal';

const GroupPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200/20 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-400 animate-pulse">Loading group...</p>
        </div>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Group Not Found</h2>
          <p className="text-gray-400 mb-6">{error || 'The group you\'re looking for doesn\'t exist.'}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Mouse Follower */}
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
            {/* Left Side */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center px-4 py-2 bg-slate-800/50 text-gray-300 rounded-xl border border-slate-600/50 hover:bg-slate-700/50 transition-all group"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back
              </button>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  {isAdmin && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Crown className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{group.name}</h1>
                  <p className="text-sm text-gray-400">
                    {members.length} members • {questions.length} questions
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {group.inviteCode && (
                <button
                  onClick={copyInviteCode}
                  className="flex items-center px-4 py-2 bg-green-600/20 text-green-300 rounded-xl border border-green-500/30 hover:bg-green-600/30 transition-all"
                >
                  {copiedInvite ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copiedInvite ? 'Copied!' : 'Copy Invite'}
                </button>
              )}

              <button
                onClick={() => navigate(`/group/${groupId}/add-question`)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
                disabled={!isMember}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </button>

              {!isAdmin && isMember && (
                <button
                  onClick={handleLeaveGroup}
                  className="flex items-center px-4 py-2 bg-red-600/20 text-red-300 rounded-xl border border-red-500/30 hover:bg-red-600/30 transition-all"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Leave
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Group Info Card */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">{group.name}</h2>
              <p className="text-gray-400 mb-4">{group.description || 'No description provided'}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {members.length} members
                </span>
                <span>📂 {group.category || 'General'}</span>
                <span>{group.isPrivate ? '🔒 Private' : '🌐 Public'}</span>
                {isAdmin && <span className="text-blue-400">👑 Admin</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-600/30 rounded-2xl mb-8">
          <div className="border-b border-slate-700/50">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('questions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'questions'
                    ? 'border-purple-500 text-purple-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                📝 Questions ({questions.length})
              </button>
              <button
                onClick={() => setActiveTab('members')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'members'
                    ? 'border-purple-500 text-purple-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                👥 Members ({members.length})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'questions' && (
              <div>
                {/* Questions Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Group Questions</h3>
                    <p className="text-gray-400">Practice problems shared by group members</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors w-full sm:w-64"
                      />
                    </div>

                    {/* Difficulty Filter */}
                    <select
                      value={difficultyFilter}
                      onChange={(e) => setDifficultyFilter(e.target.value)}
                      className="px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-purple-400 transition-colors"
                    >
                      <option value="all">All Difficulties</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>

                    {/* Refresh Button */}
                    <button
                      onClick={refreshQuestions}
                      className="flex items-center px-4 py-3 bg-slate-700/50 text-gray-300 rounded-xl border border-slate-600/50 hover:bg-slate-600/50 transition-all"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </button>
                  </div>
                </div>

                {/* Questions List */}
                {filteredQuestions.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {searchQuery || difficultyFilter !== 'all' ? 'No questions found' : 'No questions yet'}
                    </h3>
                    <p className="text-gray-400 mb-6">
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
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
                      >
                        Add First Question
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
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
                    <h3 className="text-xl font-bold text-white mb-2">Group Members</h3>
                    <p className="text-gray-400">Everyone practicing together</p>
                  </div>
                </div>

                {members.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-4">👥</div>
                    <h3 className="text-xl font-bold text-white mb-2">No members found</h3>
                    <p className="text-gray-400">This group doesn't have any members yet.</p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {members.map((member) => (
                      <MemberCard key={member._id} member={member} />
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
        />
      )}
    </div>
  );
};

export default GroupPage;