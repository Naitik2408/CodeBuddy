import React from 'react';
import { Crown, Calendar, Activity } from 'lucide-react';

const MemberCard = ({ member }) => {
  const getInitials = (name) => {
    return name?.charAt(0)?.toUpperCase() || 'U';
  };

  const isAdmin = member.role === 'admin';

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] group">
      {/* Admin Badge */}
      {isAdmin && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-2 shadow-lg">
          <Crown className="w-4 h-4 text-white" />
        </div>
      )}

      <div className="flex items-center space-x-4 mb-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">
              {getInitials(member.userId?.name)}
            </span>
          </div>
          {/* Online indicator (you can add logic for this) */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
        </div>

        {/* Member Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h4 className="font-bold text-white group-hover:text-purple-300 transition-colors">
              {member.userId?.name || 'Unknown User'}
            </h4>
            {isAdmin && (
              <div className="flex items-center px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30">
                <Crown className="w-3 h-3 mr-1" />
                Admin
              </div>
            )}
          </div>
          <p className="text-sm text-gray-400 capitalize">{member.role}</p>
        </div>
      </div>

      {/* Member Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
          <div className="text-lg font-bold text-purple-400">24</div>
          <div className="text-xs text-gray-400">Problems Solved</div>
        </div>
        <div className="text-center p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
          <div className="text-lg font-bold text-blue-400">85%</div>
          <div className="text-xs text-gray-400">Success Rate</div>
        </div>
      </div>

      {/* Activity Info */}
      <div className="space-y-2 text-xs text-gray-400">
        <div className="flex items-center justify-between">
          <span className="flex items-center">
            <Calendar className="w-3 h-3 mr-2" />
            Joined
          </span>
          <span className="text-white">{new Date(member.joinedAt).toLocaleDateString()}</span>
        </div>
        
        {member.lastActive && (
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <Activity className="w-3 h-3 mr-2" />
              Last Active
            </span>
            <span className="text-white">{new Date(member.lastActive).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Member Actions */}
      <div className="mt-4 pt-4 border-t border-slate-600/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">Active</span>
          </div>
          <button className="text-purple-400 hover:text-purple-300 text-xs font-medium transition-colors">
            View Profile
          </button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default MemberCard;