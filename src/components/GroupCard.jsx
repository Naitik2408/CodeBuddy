import React from 'react';
import { useNavigate } from 'react-router-dom';

const GroupCard = ({ group }) => {
  const navigate = useNavigate();

  return (
    <div
      className="p-4 bg-white rounded shadow hover:bg-gray-50 cursor-pointer"
      onClick={() => navigate(`/groups/${group._id}`)}
    >
      <h3 className="text-xl font-semibold">{group.name}</h3>
      <p className="text-sm text-gray-600">{group.description || 'No description'}</p>
      <p className="text-xs mt-1 text-gray-500">
        Members: {group.members.length} | {group.isPrivate ? 'Private' : 'Public'}
      </p>
    </div>
  );
};

export default GroupCard;
