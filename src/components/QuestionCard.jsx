import React, { useState } from 'react';
import { ExternalLink, Calendar, Clock, ThumbsUp, Eye, MessageSquare, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

const QuestionCard = ({ 
  question, 
  members, 
  isMember, 
  user, 
  onSubmitResponse, 
  onToggleResponses, 
  expandedResponses, 
  questionResponses, 
  loadingResponses,
  isDarkMode 
}) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': 
        return isDarkMode 
          ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
          : 'bg-green-100 text-green-800 border border-green-300';
      case 'medium': 
        return isDarkMode 
          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' 
          : 'bg-yellow-100 text-yellow-800 border border-yellow-300';
      case 'hard': 
        return isDarkMode 
          ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
          : 'bg-red-100 text-red-800 border border-red-300';
      default: 
        return isDarkMode 
          ? 'bg-gray-500/20 text-gray-300 border border-gray-500/30' 
          : 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'solved':
        return isDarkMode 
          ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
          : 'bg-green-100 text-green-700 border border-green-300';
      case 'attempted':
        return isDarkMode 
          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' 
          : 'bg-yellow-100 text-yellow-700 border border-yellow-300';
      default:
        return isDarkMode 
          ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
          : 'bg-red-100 text-red-700 border border-red-300';
    }
  };

  return (
    <div className={`backdrop-blur-sm border rounded-2xl p-4 md:p-6 transition-all duration-300 hover:transform hover:scale-[1.02] group relative overflow-hidden ${
      isDarkMode 
        ? 'bg-slate-800/30 border-slate-600/30 hover:border-purple-500/50' 
        : 'bg-white/40 border-gray-200/30 hover:border-purple-400/50 hover:shadow-lg'
    }`}>
      {/* Animated Background Element */}
      <div className={`absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 ${
        isDarkMode ? 'bg-purple-500/20' : 'bg-purple-400/30'
      }`}></div>

      {/* Question Header - Mobile Responsive */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 space-y-3 md:space-y-0 relative z-10">
        <div className="flex-1 min-w-0">
          <h4 className={`text-lg md:text-xl font-bold mb-2 md:mb-3 group-hover:text-purple-400 transition-colors duration-300 break-words ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {question.title}
          </h4>
          {question.userResponse && (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(question.userResponse.status)}`}>
              {question.userResponse.status === 'solved' ? '✅ You Solved This' :
               question.userResponse.status === 'attempted' ? '🔄 You Attempted' :
               '🆘 You Need Help'}
            </span>
          )}
        </div>
        
        {/* Sparkle Icon for Visual Appeal */}
        <Sparkles className={`w-5 h-5 opacity-30 group-hover:opacity-100 transition-all duration-300 flex-shrink-0 ${
          isDarkMode ? 'text-purple-400' : 'text-purple-500'
        }`} />
      </div>

      <p className={`text-sm md:text-base mb-4 md:mb-6 leading-relaxed transition-colors duration-300 ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {question.description || 'No description provided'}
      </p>

      {/* Analytics Section - Mobile Responsive */}
      <div className={`rounded-xl p-3 md:p-4 mb-4 md:mb-6 border transition-all duration-300 ${
        isDarkMode 
          ? 'bg-slate-700/30 border-slate-600/30' 
          : 'bg-gray-100/60 border-gray-300/30'
      }`}>
        <h5 className={`font-medium mb-3 md:mb-4 flex items-center text-sm md:text-base transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          📊 Question Analytics
        </h5>

        {/* Progress Bar - Mobile Responsive */}
        <div className="mb-3 md:mb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 space-y-1 sm:space-y-0">
            <span className={`text-xs md:text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Solve Rate</span>
            <span className={`text-xs md:text-sm font-medium transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {question.totalResponses > 0 ? `${Math.round((question.solvedCount / members.length) * 100)}%` : '0%'} 
              ({question.solvedCount}/{members.length} members)
            </span>
          </div>
          <div className={`w-full rounded-full h-2 transition-colors duration-300 ${
            isDarkMode ? 'bg-slate-600/50' : 'bg-gray-300/50'
          }`}>
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${question.totalResponses > 0 ? (question.solvedCount / members.length) * 100 : 0}%`
              }}
            ></div>
          </div>
        </div>

        {/* Statistics Grid - Mobile Responsive */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-3 md:mb-4">
          <div className={`text-center p-2 md:p-3 rounded-lg border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-slate-600/30 border-slate-500/30' 
              : 'bg-white/70 border-gray-200/50'
          }`}>
            <div className="text-base md:text-lg font-bold text-green-400">{question.solvedCount || 0}</div>
            <div className={`text-xs transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Solved</div>
          </div>
          <div className={`text-center p-2 md:p-3 rounded-lg border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-slate-600/30 border-slate-500/30' 
              : 'bg-white/70 border-gray-200/50'
          }`}>
            <div className="text-base md:text-lg font-bold text-yellow-400">{question.attemptedCount || 0}</div>
            <div className={`text-xs transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Attempted</div>
          </div>
          <div className={`text-center p-2 md:p-3 rounded-lg border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-slate-600/30 border-slate-500/30' 
              : 'bg-white/70 border-gray-200/50'
          }`}>
            <div className="text-base md:text-lg font-bold text-red-400">
              {(question.totalResponses || 0) - (question.solvedCount || 0) - (question.attemptedCount || 0)}
            </div>
            <div className={`text-xs transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Need Help</div>
          </div>
          <div className={`text-center p-2 md:p-3 rounded-lg border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-slate-600/30 border-slate-500/30' 
              : 'bg-white/70 border-gray-200/50'
          }`}>
            <div className={`text-base md:text-lg font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {members.length - (question.totalResponses || 0)}
            </div>
            <div className={`text-xs transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Not Started</div>
          </div>
        </div>

        {/* Engagement Metrics - Mobile Responsive */}
        <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs pt-3 border-t space-y-2 sm:space-y-0 transition-all duration-300 ${
          isDarkMode 
            ? 'text-gray-400 border-slate-600/30' 
            : 'text-gray-600 border-gray-300/30'
        }`}>
          <div className="flex justify-between sm:justify-start sm:space-x-4">
            <span className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {question.views || 0} views
            </span>
            <span className="flex items-center">
              <MessageSquare className="w-3 h-3 mr-1" />
              {question.solutions?.length || 0} solutions
            </span>
            <span className="flex items-center">
              <ThumbsUp className="w-3 h-3 mr-1" />
              {question.hints?.length || 0} hints
            </span>
          </div>
        </div>
      </div>

      {/* Tags and Badges - Mobile Responsive */}
      <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
        <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
          {question.difficulty}
        </span>
        <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' 
            : 'bg-blue-100 text-blue-700 border-blue-300'
        }`}>
          📂 {question.category}
        </span>
        <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
            : 'bg-purple-100 text-purple-700 border-purple-300'
        }`}>
          🌐 {question.platform}
        </span>
        {question.tags && question.tags.map(tag => (
          <span key={tag} className={`px-2 py-1 rounded text-xs border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-500/20 text-gray-300 border-gray-500/30' 
              : 'bg-gray-200 text-gray-700 border-gray-300'
          }`}>
            #{tag}
          </span>
        ))}
      </div>

      {/* Author and Date Info - Mobile Responsive */}
      <div className={`rounded-lg p-3 mb-4 md:mb-6 border transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20' 
          : 'bg-gradient-to-r from-purple-100/80 to-pink-100/80 border-purple-200/60'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs md:text-sm space-y-2 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
            <span className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Posted by <span className={`font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{question.postedBy?.name || 'Unknown'}</span>
            </span>
            <span className={`hidden sm:inline transition-colors duration-300 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>•</span>
            <span className={`flex items-center transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(question.createdAt).toLocaleDateString()}
            </span>
          </div>
          {question.averageTime && (
            <span className={`font-medium flex items-center transition-colors duration-300 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              <Clock className="w-3 h-3 mr-1" />
              ~{Math.round(question.averageTime)}min
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons - Mobile Responsive */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-6 space-y-3 sm:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          {question.sourceUrl ? (
            <a
              href={question.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center sm:justify-start px-4 py-3 sm:py-2 rounded-lg border transition-all cursor-pointer hover:scale-105 active:scale-95 group text-sm ${
                isDarkMode 
                  ? 'bg-blue-600/20 text-blue-300 border-blue-500/30 hover:bg-blue-600/30' 
                  : 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200'
              }`}
            >
              <ExternalLink className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              View Problem
            </a>
          ) : (
            <span className={`text-sm italic px-4 py-2 text-center sm:text-left transition-colors duration-300 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-600'
            }`}>No problem link available</span>
          )}
        </div>

        {isMember && (
          <button
            onClick={() => onSubmitResponse(question)}
            className={`w-full sm:w-auto px-4 py-3 sm:py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 border ${
              question.userResponse
                ? isDarkMode 
                  ? 'bg-gray-600/20 text-gray-300 border-gray-500/30 hover:bg-gray-600/30'
                  : 'bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300'
                : isDarkMode 
                  ? 'bg-green-600/20 text-green-300 border-green-500/30 hover:bg-green-600/30'
                  : 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200'
            }`}
          >
            {question.userResponse ? '✏️ Update Response' : '✅ Mark as Solved'}
          </button>
        )}
      </div>

      {/* User's Response Details - Mobile Responsive */}
      {question.userResponse && (
        <div className={`mb-4 md:mb-6 p-3 md:p-4 rounded-lg border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-blue-500/10 border-blue-500/20' 
            : 'bg-blue-50/80 border-blue-200/60'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-1 sm:space-y-0">
            <span className={`text-sm font-medium transition-colors duration-300 ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>Your Response:</span>
            <span className={`text-xs transition-colors duration-300 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              {new Date(question.userResponse.submittedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            <div>
              <span className={`transition-colors duration-300 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>Status:</span>
              <span className={`ml-1 font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{question.userResponse.status}</span>
            </div>
            <div>
              <span className={`transition-colors duration-300 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>Your Rating:</span>
              <span className={`ml-1 font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{question.userResponse.difficultyRating}</span>
            </div>
            {question.userResponse.timeToSolve && (
              <div>
                <span className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>Time:</span>
                <span className={`ml-1 font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{question.userResponse.timeToSolve} min</span>
              </div>
            )}
          </div>
          {question.userResponse.notes && (
            <div className={`mt-2 text-xs transition-colors duration-300 ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              <span className="font-medium">Notes:</span> {question.userResponse.notes}
            </div>
          )}
        </div>
      )}

      {/* Member Responses Section - Mobile Responsive */}
      {isMember && (
        <div className={`border-t pt-4 transition-all duration-300 ${
          isDarkMode ? 'border-slate-600/30' : 'border-gray-300/30'
        }`}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 space-y-2 sm:space-y-0">
            <h6 className={`font-medium flex items-center text-sm md:text-base transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              👥 Member Responses 
              <span className={`ml-2 text-xs md:text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                ({question.totalResponses || 0} total)
              </span>
            </h6>
            <button
              onClick={() => onToggleResponses(question._id)}
              className={`w-full sm:w-auto text-sm font-medium flex items-center justify-center sm:justify-start transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                isDarkMode 
                  ? 'text-purple-400 hover:text-purple-300' 
                  : 'text-purple-600 hover:text-purple-700'
              }`}
              disabled={loadingResponses[question._id]}
            >
              {loadingResponses[question._id] ? (
                <>
                  <div className={`animate-spin rounded-full h-4 w-4 border-b-2 mr-2 ${
                    isDarkMode ? 'border-purple-400' : 'border-purple-600'
                  }`}></div>
                  Loading...
                </>
              ) : (
                <>
                  {expandedResponses[question._id] ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-1" />
                      Hide Responses
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-1" />
                      View All Responses
                    </>
                  )}
                </>
              )}
            </button>
          </div>

          {/* Quick Response Summary - Mobile Responsive */}
          <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
            <div className={`text-center p-2 rounded border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-green-500/20 border-green-500/30' 
                : 'bg-green-100 border-green-300'
            }`}>
              <div className="font-bold text-green-400">{question.solvedCount || 0}</div>
              <div className={`transition-colors duration-300 ${
                isDarkMode ? 'text-green-300' : 'text-green-700'
              }`}>Solved</div>
            </div>
            <div className={`text-center p-2 rounded border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-yellow-500/20 border-yellow-500/30' 
                : 'bg-yellow-100 border-yellow-300'
            }`}>
              <div className="font-bold text-yellow-400">{question.attemptedCount || 0}</div>
              <div className={`transition-colors duration-300 ${
                isDarkMode ? 'text-yellow-300' : 'text-yellow-700'
              }`}>Attempted</div>
            </div>
            <div className={`text-center p-2 rounded border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-red-500/20 border-red-500/30' 
                : 'bg-red-100 border-red-300'
            }`}>
              <div className="font-bold text-red-400">
                {(question.totalResponses || 0) - (question.solvedCount || 0) - (question.attemptedCount || 0)}
              </div>
              <div className={`transition-colors duration-300 ${
                isDarkMode ? 'text-red-300' : 'text-red-700'
              }`}>Need Help</div>
            </div>
          </div>

          {/* Expanded Responses - Mobile Responsive */}
          {expandedResponses[question._id] && questionResponses[question._id] && (
            <div className="space-y-3">
              {questionResponses[question._id].error ? (
                <div className={`text-center py-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}>
                  {questionResponses[question._id].error}
                </div>
              ) : (
                <div>
                  {['solved', 'attempted', 'stuck'].map(status => {
                    const responses = questionResponses[question._id].responses?.[status] || [];
                    if (responses.length === 0) return null;

                    return (
                      <div key={status} className="mb-4">
                        <h7 className={`font-medium text-sm mb-2 flex items-center transition-colors duration-300 ${
                          status === 'solved' 
                            ? isDarkMode ? 'text-green-400' : 'text-green-600'
                            : status === 'attempted' 
                              ? isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                              : isDarkMode ? 'text-red-400' : 'text-red-600'
                        }`}>
                          {status === 'solved' ? '✅ Solved' :
                           status === 'attempted' ? '🔄 Attempted' : '🆘 Need Help'}
                          <span className={`ml-2 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>({responses.length})</span>
                        </h7>
                        
                        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                          {responses.map((response, index) => (
                            <div key={index} className={`p-3 rounded-lg border text-xs transition-all duration-300 ${
                              status === 'solved' 
                                ? isDarkMode ? 'bg-green-500/10 border-green-500/30' : 'bg-green-100/80 border-green-300'
                                : status === 'attempted' 
                                  ? isDarkMode ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-yellow-100/80 border-yellow-300'
                                  : isDarkMode ? 'bg-red-500/10 border-red-500/30' : 'bg-red-100/80 border-red-300'
                            }`}>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-1 sm:space-y-0">
                                <span className={`font-medium transition-colors duration-300 truncate ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {response.userId?.name || 'Anonymous'}
                                  {response.userId?._id === user?.id && (
                                    <span className={`ml-1 transition-colors duration-300 ${
                                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                                    }`}>(You)</span>
                                  )}
                                </span>
                                <span className={`px-2 py-1 rounded text-xs flex-shrink-0 ${getDifficultyColor(response.difficultyRating)}`}>
                                  {response.difficultyRating}
                                </span>
                              </div>
                              
                              <div className={`space-y-1 transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {response.timeToSolve && (
                                  <div className="flex justify-between">
                                    <span>Time:</span>
                                    <span className={`font-medium transition-colors duration-300 ${
                                      isDarkMode ? 'text-white' : 'text-gray-900'
                                    }`}>{response.timeToSolve}min</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span>Submitted:</span>
                                  <span className={`transition-colors duration-300 ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                  }`}>{new Date(response.submittedAt).toLocaleDateString()}</span>
                                </div>
                                {response.notes && (
                                  <div className={`mt-2 p-2 rounded text-xs transition-all duration-300 ${
                                    isDarkMode ? 'bg-slate-600/30' : 'bg-gray-200/60'
                                  }`}>
                                    <span className={`font-medium transition-colors duration-300 ${
                                      isDarkMode ? 'text-white' : 'text-gray-900'
                                    }`}>Notes:</span> 
                                    <div className="mt-1 break-words">{response.notes}</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;