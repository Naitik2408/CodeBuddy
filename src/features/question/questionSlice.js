import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import questionService from '../../services/questionService';

// Create question - FIX: Use the correct service method
export const createQuestion = createAsyncThunk(
  'question/createQuestion',
  async (questionData, { rejectWithValue }) => {
    try {
      const response = await questionService.createQuestion(questionData); // Fixed method name
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create question');
    }
  }
);

// Get questions by group - FIX: Use the correct service method
export const getQuestionsByGroup = createAsyncThunk(
  'question/getQuestionsByGroup',
  async (groupId, { rejectWithValue }) => {
    try {
      const response = await questionService.getGroupQuestions(groupId); // Fixed method name
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch questions');
    }
  }
);

// Get question by ID - FIX: Use the correct service method
export const getQuestionById = createAsyncThunk(
  'question/getQuestionById',
  async (questionId, { rejectWithValue }) => {
    try {
      const response = await questionService.getQuestionById(questionId); // Fixed method name
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch question');
    }
  }
);

// Update question
export const updateQuestion = createAsyncThunk(
  'question/updateQuestion',
  async ({ questionId, updateData }, { rejectWithValue }) => {
    try {
      const response = await questionService.update(questionId, updateData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update question');
    }
  }
);

// Delete question
export const deleteQuestion = createAsyncThunk(
  'question/deleteQuestion',
  async (questionId, { rejectWithValue }) => {
    try {
      await questionService.delete(questionId);
      return questionId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete question');
    }
  }
);

const initialState = {
  questions: [],
  currentQuestion: null,
  loading: false,
  error: null
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentQuestion: (state) => {
      state.currentQuestion = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Question
      .addCase(createQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.questions.unshift(action.payload.question || action.payload);
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Questions by Group
      .addCase(getQuestionsByGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestionsByGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.questions || action.payload;
      })
      .addCase(getQuestionsByGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Question by ID
      .addCase(getQuestionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentQuestion = action.payload.question || action.payload;
      })
      .addCase(getQuestionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Question
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.loading = false;
        const updatedQuestion = action.payload.question || action.payload;
        const index = state.questions.findIndex(q => q._id === updatedQuestion._id);
        if (index !== -1) {
          state.questions[index] = updatedQuestion;
        }
        if (state.currentQuestion?._id === updatedQuestion._id) {
          state.currentQuestion = updatedQuestion;
        }
      })
      
      // Delete Question
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = state.questions.filter(q => q._id !== action.payload);
        if (state.currentQuestion?._id === action.payload) {
          state.currentQuestion = null;
        }
      });
  }
});

export const { clearError, clearCurrentQuestion } = questionSlice.actions;
export default questionSlice.reducer;