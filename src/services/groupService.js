import axios from './axiosInstance';

const groupService = {
  // Create a new group
  create: (groupData) => axios.post('/api/groups/create', groupData),

  // Get all groups created/joined by the user
  getMyGroups: () => axios.get('/api/groups/my-groups'),

  // Get group by ID
  getGroupById: (groupId) => axios.get(`/api/groups/${groupId}`),

  // Join group by invite code
  joinGroup: (inviteCode) => axios.post('/api/groups/join', { inviteCode }),

  // Leave group
  leaveGroup: (groupId) => axios.post(`/api/groups/${groupId}/leave`),

  // Update group
  updateGroup: (groupId, updateData) => axios.put(`/api/groups/${groupId}`, updateData),
};

export default groupService;