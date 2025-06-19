import React, { useState } from 'react';
import { ExternalLink, Calendar, Clock, ThumbsUp, Eye, MessageSquare } from 'lucide-react';

const QuestionCard = ({ 
  question, 
  members, 
  isMember, 
  user, 
  onSubmitResponse, 
  onToggleResponses, 
  expandedResponses, 
  questionResponses, 
  loadingResponses 
}) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
      {/* Question Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
            {question.title}
          </h4>
          {question.userResponse && (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              question.userResponse.status === 'solved' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
              question.userResponse.status === 'attempted' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
              'bg-red-500/20 text-red-300 border border-red-500/30'
            }`}>
              {question.userResponse.status === 'solved' ? '✅ You Solved This' :
               question.userResponse.status === 'attempted' ? '🔄 You Attempted' :
               '🆘 You Need Help'}
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-400 text-sm mb-6 leading-relaxed">{question.description}</p>

      {/* Analytics Section */}
      <div className="bg-slate-700/30 rounded-xl p-4 mb-6 border border-slate-600/30">
        <h5 className="font-medium text-white mb-4 flex items-center">
          📊 Question Analytics
        </h5>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Solve Rate</span>
            <span className="text-sm font-medium text-white">
              {question.totalResponses > 0 ? `${Math.round((question.solvedCount / members.length) * 100)}%` : '0%'} 
              ({question.solvedCount}/{members.length} members)
            </span>
          </div>
          <div className="w-full bg-slate-600/50 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${question.totalResponses > 0 ? (question.solvedCount / members.length) * 100 : 0}%`
              }}
            ></div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="text-center p-3 bg-slate-600/30 rounded-lg border border-slate-500/30">
            <div className="text-lg font-bold text-green-400">{question.solvedCount || 0}</div>
            <div className="text-xs text-gray-400">Solved</div>
          </div>
          <div className="text-center p-3 bg-slate-600/30 rounded-lg border border-slate-500/30">
            <div className="text-lg font-bold text-yellow-400">{question.attemptedCount || 0}</div>
            <div className="text-xs text-gray-400">Attempted</div>
          </div>
          <div className="text-center p-3 bg-slate-600/30 rounded-lg border border-slate-500/30">
            <div className="text-lg font-bold text-red-400">
              {(question.totalResponses || 0) - (question.solvedCount || 0) - (question.attemptedCount || 0)}
            </div>
            <div className="text-xs text-gray-400">Need Help</div>
          </div>
          <div className="text-center p-3 bg-slate-600/30 rounded-lg border border-slate-500/30">
            <div className="text-lg font-bold text-gray-400">
              {members.length - (question.totalResponses || 0)}
            </div>
            <div className="text-xs text-gray-400">Not Started</div>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="flex justify-between items-center text-xs text-gray-400 pt-3 border-t border-slate-600/30">
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

      {/* Tags and Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
          {question.difficulty}
        </span>
        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30">
          📂 {question.category}
        </span>
        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30">
          🌐 {question.platform}
        </span>
        {question.tags && question.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded text-xs border border-gray-500/30">
            #{tag}
          </span>
        ))}
      </div>

      {/* Author and Date Info */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-3 mb-6 border border-purple-500/20">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">
              Posted by <span className="font-medium text-white">{question.postedBy?.name || 'Unknown'}</span>
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-300 flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(question.createdAt).toLocaleDateString()}
            </span>
          </div>
          {question.averageTime && (
            <span className="text-blue-400 font-medium flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              ~{Math.round(question.averageTime)}min
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          {question.sourceUrl ? (
            <a
              href={question.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600/20 text-blue-300 rounded-lg border border-blue-500/30 hover:bg-blue-600/30 transition-all group"
            >
              <ExternalLink className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              View Problem
            </a>
          ) : (
            <span className="text-gray-500 text-sm italic">No problem link available</span>
          )}
        </div>

        {isMember && (
          <button
            onClick={() => onSubmitResponse(question)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
              question.userResponse
                ? 'bg-gray-600/20 text-gray-300 border border-gray-500/30 hover:bg-gray-600/30'
                : 'bg-green-600/20 text-green-300 border border-green-500/30 hover:bg-green-600/30'
            }`}
          >
            {question.userResponse ? '✏️ Update Response' : '✅ Mark as Solved'}
          </button>
        )}
      </div>

      {/* User's Response Details */}
      {question.userResponse && (
        <div className="mb-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-300">Your Response:</span>
            <span className="text-xs text-blue-400">
              {new Date(question.userResponse.submittedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-blue-400">Status:</span>
              <span className="ml-1 font-medium text-white">{question.userResponse.status}</span>
            </div>
            <div>
              <span className="text-blue-400">Your Rating:</span>
              <span className="ml-1 font-medium text-white">{question.userResponse.difficultyRating}</span>
            </div>
            {question.userResponse.timeToSolve && (
              <div>
                <span className="text-blue-400">Time:</span>
                <span className="ml-1 font-medium text-white">{question.userResponse.timeToSolve} min</span>
              </div>
            )}
          </div>
          {question.userResponse.notes && (
            <div className="mt-2 text-xs text-blue-300">
              <span className="font-medium">Notes:</span> {question.userResponse.notes}
            </div>
          )}
        </div>
      )}

      {/* Member Responses Section */}
      {isMember && (
        <div className="border-t border-slate-600/30 pt-4">
          <div className="flex justify-between items-center mb-3">
            <h6 className="font-medium text-white flex items-center">
              👥 Member Responses 
              <span className="ml-2 text-sm text-gray-400">
                ({question.totalResponses || 0} total)
              </span>
            </h6>
            <button
              onClick={() => onToggleResponses(question._id)}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center transition-colors"
              disabled={loadingResponses[question._id]}
            >
              {loadingResponses[question._id] ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400 mr-1"></div>
                  Loading...
                </>
              ) : (
                expandedResponses[question._id] ? '🔼 Hide Responses' : '🔽 View All Responses'
              )}
            </button>
          </div>

          {/* Quick Response Summary */}
          <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
            <div className="text-center p-2 bg-green-500/20 rounded border border-green-500/30">
              <div className="font-bold text-green-400">{question.solvedCount || 0}</div>
              <div className="text-green-300">Solved</div>
            </div>
            <div className="text-center p-2 bg-yellow-500/20 rounded border border-yellow-500/30">
              <div className="font-bold text-yellow-400">{question.attemptedCount || 0}</div>
              <div className="text-yellow-300">Attempted</div>
            </div>
            <div className="text-center p-2 bg-red-500/20 rounded border border-red-500/30">
              <div className="font-bold text-red-400">
                {(question.totalResponses || 0) - (question.solvedCount || 0) - (question.attemptedCount || 0)}
              </div>
              <div className="text-red-300">Need Help</div>
            </div>
          </div>

          {/* Expanded Responses */}
          {expandedResponses[question._id] && questionResponses[question._id] && (
            <div className="space-y-3">
              {questionResponses[question._id].error ? (
                <div className="text-center py-4 text-red-400">
                  {questionResponses[question._id].error}
                </div>
              ) : (
                <div>
                  {['solved', 'attempted', 'stuck'].map(status => {
                    const responses = questionResponses[question._id].responses?.[status] || [];
                    if (responses.length === 0) return null;

                    return (
                      <div key={status} className="mb-4">
                        <h7 className={`font-medium text-sm mb-2 flex items-center ${
                          status === 'solved' ? 'text-green-400' :
                          status === 'attempted' ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {status === 'solved' ? '✅ Solved' :
                           status === 'attempted' ? '🔄 Attempted' : '🆘 Need Help'}
                          <span className="ml-2 text-gray-400">({responses.length})</span>
                        </h7>
                        
                        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                          {responses.map((response, index) => (
                            <div key={index} className={`p-3 rounded-lg border text-xs ${
                              status === 'solved' ? 'bg-green-500/10 border-green-500/30' :
                              status === 'attempted' ? 'bg-yellow-500/10 border-yellow-500/30' :
                              'bg-red-500/10 border-red-500/30'
                            }`}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-white">
                                  {response.userId?.name || 'Anonymous'}
                                  {response.userId?._id === user?.id && (
                                    <span className="ml-1 text-blue-400">(You)</span>
                                  )}
                                </span>
                                <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(response.difficultyRating)}`}>
                                  {response.difficultyRating}
                                </span>
                              </div>
                              
                              <div className="space-y-1 text-gray-400">
                                {response.timeToSolve && (
                                  <div className="flex justify-between">
                                    <span>Time:</span>
                                    <span className="font-medium text-white">{response.timeToSolve}min</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span>Submitted:</span>
                                  <span className="text-white">{new Date(response.submittedAt).toLocaleDateString()}</span>
                                </div>
                                {response.notes && (
                                  <div className="mt-2 p-2 bg-slate-600/30 rounded text-xs">
                                    <span className="font-medium text-white">Notes:</span> {response.notes}
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