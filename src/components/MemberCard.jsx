import React, { useMemo } from 'react';
import { Crown, Calendar, Activity, Sparkles, Trophy, Target, Clock, Award } from 'lucide-react';

const MemberCard = ({ member, isDarkMode }) => {
  const getInitials = (name) => {
    return name?.charAt(0)?.toUpperCase() || 'U';
  };

  const isAdmin = member.role === 'admin';

  // Use real stats if available, otherwise fall back to generated data
  const memberStats = useMemo(() => {
    // If we have real stats from backend, use them
    if (member.stats) {
      return {
        problemsSolved: member.stats.problemsSolved || 0,
        successRate: member.stats.successRate || 0,
        currentStreak: member.stats.currentStreak || 0,
        totalResponses: member.stats.totalResponses || 0,
        averageTimeToSolve: member.stats.averageTimeToSolve,
        rank: member.stats.rank,
        totalQuestions: member.stats.totalQuestions || 0,
        questionsAttempted: member.stats.questionsAttempted || 0,
        isRealData: true
      };
    }

    // Fallback to generated data only if no real stats available
    const memberId = member.userId?._id || member._id || 'default';
    const hash = memberId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const seed1 = Math.abs(hash) % 100;
    const seed2 = Math.abs(hash * 2) % 100;
    const seed3 = Math.abs(hash * 3) % 100;
    
    return {
      problemsSolved: (seed1 % 50) + 10,
      successRate: (seed2 % 30) + 70,
      currentStreak: (seed3 % 15) + 1,
      totalResponses: null,
      averageTimeToSolve: null,
      rank: null,
      totalQuestions: null,
      questionsAttempted: null,
      isRealData: false
    };
  }, [member.stats, member.userId?._id, member._id]);

  const { 
    problemsSolved, 
    successRate, 
    currentStreak, 
    totalResponses, 
    averageTimeToSolve, 
    rank,
    totalQuestions,
    questionsAttempted,
    isRealData
  } = memberStats;

  const getStreakColor = (streak) => {
    if (streak >= 10) return isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
    if (streak >= 5) return isDarkMode ? 'text-green-400' : 'text-green-600';
    return isDarkMode ? 'text-blue-400' : 'text-blue-600';
  };

  const getSuccessRateColor = (rate) => {
    if (rate >= 90) return isDarkMode ? 'text-green-400' : 'text-green-600';
    if (rate >= 75) return isDarkMode ? 'text-blue-400' : 'text-blue-600';
    if (rate >= 60) return isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
    return isDarkMode ? 'text-red-400' : 'text-red-600';
  };

  const getRankColor = (rank) => {
    if (rank === 1) return isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
    if (rank <= 3) return isDarkMode ? 'text-blue-400' : 'text-blue-600';
    if (rank <= 5) return isDarkMode ? 'text-green-400' : 'text-green-600';
    return isDarkMode ? 'text-gray-400' : 'text-gray-600';
  };

  return (
    <div className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:transform hover:scale-[1.02] group relative overflow-hidden ${
      isDarkMode 
        ? 'bg-slate-800/30 border-slate-600/30 hover:border-purple-500/50' 
        : 'bg-white/40 border-gray-200/30 hover:border-purple-400/50 hover:shadow-lg'
    }`}>
      {/* Animated Background Element */}
      <div className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 ${
        isDarkMode ? 'bg-purple-500/20' : 'bg-purple-400/30'
      }`}></div>

      {/* Data Source Indicator */}
      <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
        isRealData 
          ? isDarkMode 
            ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
            : 'bg-green-100 text-green-700 border border-green-300'
          : isDarkMode 
            ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' 
            : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
      }`}>
        {isRealData ? '📊 Live' : '🎲 Demo'}
      </div>

      {/* Admin Badge */}
      {isAdmin && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-2 shadow-lg border-2 border-white z-10">
          <Crown className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Rank Badge */}
      {rank && rank <= 3 && (
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold border transition-all duration-300 ${
          rank === 1 
            ? isDarkMode 
              ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' 
              : 'bg-yellow-100 text-yellow-700 border-yellow-300'
            : isDarkMode 
              ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' 
              : 'bg-blue-100 text-blue-700 border-blue-300'
        }`}>
          #{rank}
        </div>
      )}

      <div className="flex items-center space-x-4 mb-4 relative z-10 mt-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            <span className="text-white font-bold text-lg">
              {getInitials(member.userId?.name)}
            </span>
          </div>
          {/* Online indicator */}
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 transition-colors duration-300 ${
            isDarkMode ? 'border-slate-800' : 'border-white'
          }`}>
            <div className="w-full h-full bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Member Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className={`font-bold group-hover:text-purple-400 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {member.userId?.name || 'Unknown User'}
            </h4>
            {isAdmin && (
              <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' 
                  : 'bg-blue-100 text-blue-700 border-blue-300'
              }`}>
                <Crown className="w-3 h-3 mr-1" />
                Admin
              </div>
            )}
          </div>
          <p className={`text-sm capitalize transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {member.role}
          </p>
        </div>

        {/* Sparkle Icon for Visual Appeal */}
        <Sparkles className={`w-4 h-4 opacity-30 group-hover:opacity-100 transition-all duration-300 ${
          isDarkMode ? 'text-purple-400' : 'text-purple-500'
        }`} />
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className={`text-center p-3 rounded-lg border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-700/30 border-slate-600/30' 
            : 'bg-gray-100/60 border-gray-300/30'
        }`}>
          <div className={`text-lg font-bold transition-colors duration-300 ${
            isDarkMode ? 'text-purple-400' : 'text-purple-600'
          }`}>
            {problemsSolved}
          </div>
          <div className={`text-xs transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Solved
          </div>
        </div>
        
        <div className={`text-center p-3 rounded-lg border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-700/30 border-slate-600/30' 
            : 'bg-gray-100/60 border-gray-300/30'
        }`}>
          <div className={`text-lg font-bold transition-colors duration-300 ${getSuccessRateColor(successRate)}`}>
            {successRate}%
          </div>
          <div className={`text-xs transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Success Rate
          </div>
        </div>

        <div className={`text-center p-3 rounded-lg border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-700/30 border-slate-600/30' 
            : 'bg-gray-100/60 border-gray-300/30'
        }`}>
          <div className={`text-lg font-bold transition-colors duration-300 ${getStreakColor(currentStreak)}`}>
            {currentStreak}
          </div>
          <div className={`text-xs transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Streak
          </div>
        </div>
      </div>

      {/* Additional Stats (if available from real data) */}
      {isRealData && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {rank && (
            <div className={`text-center p-3 rounded-lg border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-700/30 border-slate-600/30' 
                : 'bg-gray-100/60 border-gray-300/30'
            }`}>
              <div className={`text-lg font-bold transition-colors duration-300 ${getRankColor(rank)}`}>
                #{rank}
              </div>
              <div className={`text-xs transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Group Rank
              </div>
            </div>
          )}
          
          {questionsAttempted !== null && (
            <div className={`text-center p-3 rounded-lg border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-700/30 border-slate-600/30' 
                : 'bg-gray-100/60 border-gray-300/30'
            }`}>
              <div className={`text-lg font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {questionsAttempted}
              </div>
              <div className={`text-xs transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Attempted
              </div>
            </div>
          )}
        </div>
      )}

      {/* Average Time (if available) */}
      {averageTimeToSolve && (
        <div className={`text-center p-3 rounded-lg border mb-4 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-blue-500/10 border-blue-500/30' 
            : 'bg-blue-100/60 border-blue-300/30'
        }`}>
          <div className={`flex items-center justify-center text-sm font-medium transition-colors duration-300 ${
            isDarkMode ? 'text-blue-300' : 'text-blue-700'
          }`}>
            <Clock className="w-3 h-3 mr-1" />
            Avg. Time: {averageTimeToSolve} min
          </div>
        </div>
      )}

      {/* Achievement Badges */}
      {(successRate >= 90 || problemsSolved >= 30 || currentStreak >= 10) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {successRate >= 90 && (
            <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' 
                : 'bg-yellow-100 text-yellow-700 border-yellow-300'
            }`}>
              <Trophy className="w-3 h-3 mr-1" />
              High Achiever
            </div>
          )}
          {problemsSolved >= 30 && (
            <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                : 'bg-green-100 text-green-700 border-green-300'
            }`}>
              <Target className="w-3 h-3 mr-1" />
              Problem Solver
            </div>
          )}
          {currentStreak >= 10 && (
            <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' 
                : 'bg-orange-100 text-orange-700 border-orange-300'
            }`}>
              🔥 On Fire
            </div>
          )}
          {rank === 1 && (
            <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
                : 'bg-purple-100 text-purple-700 border-purple-300'
            }`}>
              <Award className="w-3 h-3 mr-1" />
              Top Performer
            </div>
          )}
        </div>
      )}

      {/* Activity Info */}
      <div className={`rounded-lg p-3 mb-4 border transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20' 
          : 'bg-gradient-to-r from-purple-100/80 to-pink-100/80 border-purple-200/60'
      }`}>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className={`flex items-center transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <Calendar className="w-3 h-3 mr-2" />
              Joined
            </span>
            <span className={`font-medium transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {new Date(member.joinedAt).toLocaleDateString()}
            </span>
          </div>
          
          {member.lastActive && (
            <div className="flex items-center justify-between">
              <span className={`flex items-center transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <Activity className="w-3 h-3 mr-2" />
                Last Active
              </span>
              <span className={`font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {new Date(member.lastActive).toLocaleDateString()}
              </span>
            </div>
          )}

          {isRealData && totalQuestions > 0 && (
            <div className="flex items-center justify-between">
              <span className={`flex items-center transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                📝 Progress
              </span>
              <span className={`font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {questionsAttempted}/{totalQuestions}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Member Actions */}
      <div className={`pt-4 border-t transition-all duration-300 ${
        isDarkMode ? 'border-slate-600/30' : 'border-gray-300/30'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className={`text-xs transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {member.isOnline ? 'Online' : 'Active'}
            </span>
          </div>
          <button className={`text-xs font-medium transition-all cursor-pointer hover:scale-105 active:scale-95 ${
            isDarkMode 
              ? 'text-purple-400 hover:text-purple-300' 
              : 'text-purple-600 hover:text-purple-700'
          }`}>
            View Profile
          </button>
        </div>
      </div>

      {/* Progress Bar for Activity Level */}
      <div className="mt-3">
        <div className="flex justify-between items-center mb-1">
          <span className={`text-xs transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Activity Level
          </span>
          <span className={`text-xs font-medium transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {isRealData && totalQuestions > 0 
              ? `${Math.round((questionsAttempted / totalQuestions) * 100)}%`
              : `${Math.min(Math.floor((problemsSolved / 50) * 100), 100)}%`
            }
          </span>
        </div>
        <div className={`w-full rounded-full h-1.5 transition-colors duration-300 ${
          isDarkMode ? 'bg-slate-600/50' : 'bg-gray-300/50'
        }`}>
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full transition-all duration-500"
            style={{
              width: isRealData && totalQuestions > 0
                ? `${Math.round((questionsAttempted / totalQuestions) * 100)}%`
                : `${Math.min((problemsSolved / 50) * 100, 100)}%`
            }}
          ></div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
        isDarkMode 
          ? 'bg-gradient-to-r from-purple-600/5 to-pink-600/5' 
          : 'bg-gradient-to-r from-purple-400/5 to-pink-400/5'
      }`}></div>
    </div>
  );
};

export default MemberCard;