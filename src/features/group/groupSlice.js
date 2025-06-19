import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axiosInstance';

// Async thunk for fetching user's groups - Fix endpoint
export const fetchMyGroups = createAsyncThunk(
  'group/fetchMyGroups',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/groups/my-groups'); // Fixed endpoint
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch groups');
    }
  }
);

// Async thunk for creating a group - Fix endpoint
export const createGroup = createAsyncThunk(
  'group/createGroup',
  async (groupData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/groups/create', groupData); // Correct endpoint
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create group');
    }
  }
);

// Add alias for backward compatibility
export const createGroupAsync = createGroup;

// Async thunk for joining a group
export const joinGroup = createAsyncThunk(
  'group/joinGroup',
  async (inviteCode, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/groups/join', { inviteCode });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to join group');
    }
  }
);

const initialState = {
  groups: [],
  currentGroup: null,
  loading: false,
  error: null
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentGroup: (state, action) => {
      state.currentGroup = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch My Groups
      .addCase(fetchMyGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload.groups || action.payload;
      })
      .addCase(fetchMyGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Group
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups.push(action.payload.group || action.payload);
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Join Group
      .addCase(joinGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(joinGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups.push(action.payload.group || action.payload);
      })
      .addCase(joinGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, setCurrentGroup } = groupSlice.actions;
export default groupSlice.reducer;