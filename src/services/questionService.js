import axios from './axiosInstance';

const questionService = {
  // Get questions for a group with response statistics
  getGroupQuestions: (groupId) => axios.get(`/api/questions/group/${groupId}`),

  // Get a specific question by ID
  getQuestionById: (questionId) => axios.get(`/api/questions/${questionId}`),

  // Submit member response to a question
  submitResponse: (questionId, responseData) => 
    axios.post(`/api/questions/${questionId}/response`, responseData),

  // Get user's response for a question
  getUserResponse: (questionId) => 
    axios.get(`/api/questions/${questionId}/response`),

  // Get all responses for a question (for comparison)
  getQuestionResponses: (questionId) => 
    axios.get(`/api/questions/${questionId}/responses`),

  // Create a new question
  createQuestion: (questionData) => 
    axios.post('/api/questions/create', questionData),
};

export default questionService;