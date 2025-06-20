import { createSlice } from '@reduxjs/toolkit';

// Get initial theme state
const getInitialThemeState = () => {
  try {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Default to dark mode, but respect saved preference
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && true); // Default to dark
    
    // Apply theme to document
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    return {
      isDarkMode: shouldBeDark
    };
  } catch (error) {
    console.error('Error getting theme state:', error);
    document.documentElement.classList.add('dark'); // Default to dark on error
    return {
      isDarkMode: true
    };
  }
};

const initialState = getInitialThemeState();

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      
      // Apply theme to document
      if (state.isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    },
    setTheme: (state, action) => {
      state.isDarkMode = action.payload;
      
      // Apply theme to document
      if (state.isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;