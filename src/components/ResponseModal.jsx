import React, { useState } from 'react';
import { X, CheckCircle, Clock, AlertCircle, ArrowRight } from 'lucide-react';

const ResponseModal = ({ question, onSubmit, onClose, isSubmitting, existingResponse }) => {
  const [formData, setFormData] = useState({
    status: existingResponse?.status || 'solved',
    difficultyRating: existingResponse?.difficultyRating || question.difficulty,
    timeToSolve: existingResponse?.timeToSolve || '',
    notes: existingResponse?.notes || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const responseData = {
      ...formData,
      timeToSolve: formData.timeToSolve ? parseInt(formData.timeToSolve) : null
    };

    onSubmit(responseData);
  };

  const statusOptions = [
    { value: 'solved', icon: CheckCircle, label: 'Solved', color: 'green' },
    { value: 'attempted', icon: Clock, label: 'Attempted', color: 'yellow' },
    { value: 'stuck', icon: AlertCircle, label: 'Need Help', color: 'red' }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Modal Container with proper height constraints */}
      <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-600/50 rounded-2xl w-full max-w-lg max-h-[90vh] relative flex flex-col">
        {/* Fixed Header */}
        <div className="flex-shrink-0 p-6 pb-4">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Header */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {existingResponse ? 'Update Response' : 'Submit Response'}
            </h3>
            <p className="text-gray-400">
              How did you find this problem?
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6">
          {/* Question Info */}
          <div className="mb-6 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
            <h4 className="font-medium text-white mb-2 line-clamp-2">{question.title}</h4>
            <p className="text-sm text-gray-400 line-clamp-3">{question.description}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Status *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {statusOptions.map((option) => {
                  const IconComponent = option.icon;
                  const isSelected = formData.status === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, status: option.value }))}
                      className={`p-3 rounded-xl border transition-all duration-300 text-center ${
                        isSelected 
                          ? option.color === 'green' ? 'bg-green-600/20 border-green-500/50 text-green-200' :
                            option.color === 'yellow' ? 'bg-yellow-600/20 border-yellow-500/50 text-yellow-200' :
                            'bg-red-600/20 border-red-500/50 text-red-200'
                          : 'bg-slate-700/30 border-slate-600/30 text-gray-300 hover:border-purple-500/30'
                      }`}
                    >
                      <IconComponent className="w-5 h-5 mx-auto mb-2" />
                      <div className="text-xs font-medium">{option.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                How difficult was it for you? *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Easy', 'Medium', 'Hard'].map((difficulty) => (
                  <button
                    key={difficulty}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, difficultyRating: difficulty }))}
                    className={`p-3 rounded-xl border transition-all duration-300 text-center ${
                      formData.difficultyRating === difficulty
                        ? difficulty === 'Easy' ? 'bg-green-600/20 border-green-500/50 text-green-200' :
                          difficulty === 'Medium' ? 'bg-yellow-600/20 border-yellow-500/50 text-yellow-200' :
                          'bg-red-600/20 border-red-500/50 text-red-200'
                        : 'bg-slate-700/30 border-slate-600/30 text-gray-300 hover:border-purple-500/30'
                    }`}
                  >
                    <div className="text-sm font-medium">{difficulty}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time to Solve */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Time to solve (minutes)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.timeToSolve}
                  onChange={(e) => setFormData(prev => ({ ...prev, timeToSolve: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors pr-12"
                  min="1"
                  placeholder="e.g., 30"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Notes (optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors resize-none"
                rows="3"
                placeholder="Any thoughts, approach, or tips..."
              />
            </div>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 p-6 pt-4 border-t border-slate-600/30">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-700/50 text-gray-300 rounded-xl border border-slate-600/50 hover:bg-slate-600/50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center group"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  {existingResponse ? 'Update' : 'Submit'}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseModal;