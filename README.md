# CodeBuddy - Collaborative Coding Platform 🚀

<div align="center">
  <img src="./public/logo.png" alt="CodeBuddy Logo" width="120" height="120">
  
  [![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev/)
  [![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.x-764ABC.svg)](https://redux-toolkit.js.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC.svg)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

## 📖 Overview

**CodeBuddy** is a revolutionary collaborative coding platform designed to transform how developers practice and learn together. Whether you're preparing for technical interviews, improving your problem-solving skills, or building a coding community, CodeBuddy provides the perfect environment for collaborative learning.

### 🎯 Why CodeBuddy?

- **🤝 Learn Together**: Practice coding problems with friends and peers, share solutions, and learn from different approaches
- **📊 Track Progress**: Monitor your improvement with detailed analytics, success rates, and performance metrics
- **🧠 AI-Powered Insights**: Get personalized recommendations and insights powered by advanced AI to optimize your learning path
- **🎯 Interview Ready**: Perfect for technical interview preparation with real-world problem sets from LeetCode, HackerRank, and more
- **🏆 Gamified Learning**: Compete with group members, maintain streaks, and climb leaderboards to stay motivated
- **🔒 Private Groups**: Create private study groups for your team, class, or coding bootcamp

### ✨ Key Features

#### 👥 **Group Management**
- Create public or private coding groups
- Invite friends with unique group codes
- Role-based permissions (Admin/Member)
- Group analytics and member comparison

#### 📝 **Question Management**
- Add problems from popular platforms (LeetCode, HackerRank, GeeksforGeeks)
- Automatic problem categorization and tagging
- Difficulty rating system with community input
- Rich text descriptions and solution tracking

#### 🤖 **AI-Powered Analytics**
- Personalized performance insights
- Weakness identification and improvement suggestions
- Practice recommendations based on your progress
- Comparative analysis with group members

#### 🎨 **Beautiful UI/UX**
- Modern, responsive design with dark/light mode
- Smooth animations and micro-interactions
- Mobile-first approach
- Accessibility compliant

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn**
- **Git** for version control

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/code-collab-platform.git
   cd code-collab-platform/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   VITE_APP_NAME=CodeBuddy
   VITE_AI_SERVICE_URL=http://localhost:3001
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

---

## 🏗️ Project Structure

```
client/
├── public/                 # Static assets
│   ├── logo.png           # App logo
│   └── vite.svg          # Vite logo
├── src/
│   ├── app/              # Redux store configuration
│   │   ├── store.js      # Main store
│   │   └── rootReducer.js # Combined reducers
│   ├── assets/           # Images, icons, fonts
│   ├── components/       # Reusable UI components
│   │   ├── MemberCard.jsx          # Member display card
│   │   ├── QuestionCard.jsx        # Question display card
│   │   ├── ResponseModal.jsx       # Response submission modal
│   │   └── MemberComparison/       # AI analytics components
│   │       ├── index.js
│   │       ├── MemberComparison.jsx
│   │       ├── ComparisonChart.jsx
│   │       ├── AIInsights.jsx
│   │       └── PracticeRecommendations.jsx
│   ├── features/         # Redux slices (state management)
│   │   ├── auth/         # Authentication state
│   │   ├── group/        # Group management state
│   │   ├── question/     # Question management state
│   │   └── theme/        # Theme (dark/light mode) state
│   ├── layouts/          # Layout components
│   │   ├── LandingLayout.jsx      # Public pages layout
│   │   └── DashboardLayout.jsx    # Protected pages layout
│   ├── pages/            # Page components
│   │   ├── Landing.jsx             # Landing page
│   │   ├── Login.jsx              # Login page
│   │   ├── Register.jsx           # Registration page
│   │   ├── Dashboard.jsx          # User dashboard
│   │   ├── CreateGroup.jsx        # Group creation
│   │   ├── GroupPage.jsx          # Group details and management
│   │   └── AddQuestion.jsx        # Question addition
│   ├── router/           # Routing configuration
│   ├── services/         # API service layer
│   │   ├── axiosInstance.js       # HTTP client configuration
│   │   ├── authService.js         # Authentication API calls
│   │   ├── groupService.js        # Group management API calls
│   │   ├── questionService.js     # Question management API calls
│   │   └── aiService.js           # AI analytics API calls
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles (Tailwind CSS)
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── tailwind.config.js    # Tailwind CSS configuration
```

---

## 🔧 Technology Stack

### Frontend Framework
- **React 18.x** - Modern React with Hooks and Concurrent Features
- **Vite 5.x** - Next-generation frontend tooling for blazing fast development

### State Management
- **Redux Toolkit** - Efficient Redux development with less boilerplate
- **RTK Query** - Powerful data fetching and caching solution

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Lucide React** - Beautiful, customizable SVG icons
- **CSS Animations** - Smooth transitions and micro-interactions

### Routing & Navigation
- **React Router v6** - Declarative routing for React applications

### HTTP Client
- **Axios** - Promise-based HTTP client with interceptors

### Development Tools
- **ESLint** - Code linting and style enforcement
- **Prettier** - Code formatting
- **Vite Dev Server** - Hot Module Replacement (HMR)

---

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--purple-600: #9333ea;
--pink-600: #db2777;
--blue-600: #2563eb;

/* Gradients */
--gradient-primary: linear-gradient(to right, #9333ea, #db2777);
--gradient-secondary: linear-gradient(to right, #2563eb, #06b6d4);

/* Dark Mode */
--slate-900: #0f172a;
--slate-800: #1e293b;
--slate-700: #334155;

/* Light Mode */
--gray-50: #f8fafc;
--gray-100: #f1f5f9;
--white: #ffffff;
```

### Typography
- **Headings**: System font stack with bold weights
- **Body**: Inter font family for optimal readability
- **Code**: Monospace fonts for code snippets

### Components

#### Buttons
```jsx
// Primary Button
<button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all cursor-pointer hover:scale-105 active:scale-95">
  Create Group
</button>

// Secondary Button
<button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all">
  Cancel
</button>
```

#### Cards
```jsx
// Content Card
<div className="backdrop-blur-sm border rounded-2xl p-6 bg-white/40 border-gray-200/30 hover:shadow-lg transition-all duration-300">
  <h3 className="text-xl font-bold mb-2">Card Title</h3>
  <p className="text-gray-600">Card content goes here</p>
</div>
```

---

## 🔐 Authentication & Security

### Authentication Flow
1. **Registration** - Users create accounts with email verification
2. **Login** - JWT-based authentication with secure token storage
3. **Protected Routes** - Route guards for authenticated content
4. **Automatic Logout** - Token expiration handling

### Security Features
- **JWT Tokens** - Secure, stateless authentication
- **Route Protection** - Private routes require authentication
- **Input Validation** - Client-side and server-side validation
- **CORS Configuration** - Proper cross-origin resource sharing

---

## 🔄 State Management

### Redux Store Structure
```javascript
{
  auth: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  group: {
    groups: [],
    currentGroup: null,
    members: [],
    loading: false,
    error: null
  },
  question: {
    questions: [],
    currentQuestion: null,
    responses: [],
    loading: false,
    error: null
  },
  theme: {
    isDarkMode: false
  }
}
```

### Actions & Reducers
- **Async Actions** with Redux Toolkit's `createAsyncThunk`
- **Optimistic Updates** for better user experience
- **Error Handling** with proper error states
- **Loading States** for UI feedback

---

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_BACKEND_URL=http://localhost:5000
VITE_AI_SERVICE_URL=http://localhost:3001

# App Configuration
VITE_APP_NAME=CodeBuddy
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_AI_FEATURES=true
VITE_ENABLE_ANALYTICS=true
```

### Code Style Guidelines

#### Component Structure
```jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ComponentName = ({ prop1, prop2 }) => {
  // 1. Hooks
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.slice);
  const [localState, setLocalState] = useState('');

  // 2. Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // 3. Event handlers
  const handleClick = () => {
    // Handler logic
  };

  // 4. Render
  return (
    <div className="component-container">
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

#### CSS Classes
- Use **Tailwind CSS** utility classes
- Follow **responsive design** patterns
- Implement **dark mode** support
- Add **hover/focus states** for interactivity

---

## 🎯 Features Deep Dive

### 1. Group Management

#### Creating Groups
```jsx
// Group creation with form validation
const createGroup = async (groupData) => {
  const result = await dispatch(createGroupAsync({
    name: groupData.name,
    description: groupData.description,
    isPrivate: groupData.isPrivate,
    category: groupData.category
  }));
};
```

#### Group Features
- **Public/Private Groups** - Control group visibility
- **Invite System** - Share unique invite codes
- **Member Management** - Add/remove members, assign roles
- **Group Analytics** - Performance tracking and comparison

### 2. Question Management

#### Adding Questions
```jsx
// Question addition with platform integration
const addQuestion = async (questionData) => {
  const result = await dispatch(createQuestion({
    title: questionData.title,
    sourceUrl: questionData.sourceUrl,
    difficulty: questionData.difficulty,
    category: questionData.category,
    platform: questionData.platform,
    groupId: currentGroup.id
  }));
};
```

#### Question Features
- **Multi-Platform Support** - LeetCode, HackerRank, GeeksforGeeks
- **Auto-Extraction** - Parse problem details from URLs
- **Difficulty Rating** - Community-driven difficulty assessment
- **Solution Tracking** - Track member responses and solutions

### 3. AI-Powered Analytics

#### Performance Insights
```jsx
// AI-generated insights component
const AIInsights = ({ userData, groupData }) => {
  const [insights, setInsights] = useState([]);
  
  useEffect(() => {
    fetchAIInsights(userData, groupData)
      .then(setInsights);
  }, [userData, groupData]);

  return (
    <div className="insights-container">
      {insights.map(insight => (
        <InsightCard key={insight.id} insight={insight} />
      ))}
    </div>
  );
};
```

#### Analytics Features
- **Performance Comparison** - Compare with group members
- **Weakness Identification** - AI identifies improvement areas
- **Practice Recommendations** - Personalized study plans
- **Progress Tracking** - Visual progress charts and metrics

---

## 🎨 UI/UX Features

### Dark/Light Mode
```jsx
// Theme toggle implementation
const ThemeToggle = () => {
  const { isDarkMode } = useSelector(state => state.theme);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`p-3 rounded-xl transition-all ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      }`}
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </button>
  );
};
```

### Responsive Design
- **Mobile-First** approach with progressive enhancement
- **Flexible Grid** layouts that adapt to screen sizes
- **Touch-Friendly** interactions for mobile devices
- **Optimized Performance** for all device types

### Animations & Interactions
- **Smooth Transitions** using CSS transitions and transforms
- **Micro-Interactions** for better user feedback
- **Loading States** with skeleton screens and spinners
- **Hover Effects** for interactive elements

---

## 🔍 API Integration

### Service Layer Architecture
```javascript
// API service structure
class APIService {
  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
      timeout: 10000
    });
    
    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor for auth tokens
    this.client.interceptors.request.use(config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      response => response,
      error => this.handleError(error)
    );
  }
}
```

### Error Handling
- **Global Error Handling** with axios interceptors
- **User-Friendly Messages** for different error types
- **Retry Logic** for network failures
- **Offline Support** with cached data

---

## 🚀 Performance Optimization

### Code Splitting
```jsx
// Lazy loading for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const GroupPage = lazy(() => import('./pages/GroupPage'));

// Usage with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/group/:id" element={<GroupPage />} />
  </Routes>
</Suspense>
```

### Optimization Techniques
- **Lazy Loading** - Code splitting for route-based chunks
- **Memoization** - React.memo and useMemo for expensive operations
- **Virtual Scrolling** - For large lists of questions/members
- **Image Optimization** - Lazy loading and responsive images

---

## 🧪 Testing

### Testing Setup
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

### Test Examples
```jsx
// Component testing
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import CreateGroup from '../pages/CreateGroup';

describe('CreateGroup', () => {
  test('renders create group form', () => {
    render(
      <Provider store={store}>
        <CreateGroup />
      </Provider>
    );
    
    expect(screen.getByText('Create New Group')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter group name')).toBeInTheDocument();
  });
});
```

---

## 📱 Mobile Responsiveness

### Breakpoint Strategy
```css
/* Tailwind CSS breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X Extra large devices */
```

### Mobile-Specific Features
- **Touch Gestures** - Swipe navigation and touch interactions
- **Mobile Menu** - Collapsible navigation for small screens
- **Optimized Forms** - Touch-friendly form inputs
- **Performance** - Optimized for mobile networks

---

## 🔧 Configuration

### Vite Configuration
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#9333ea',
          600: '#7c3aed'
        }
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite'
      }
    }
  },
  plugins: []
};
```

---

## 📈 Deployment

### Build for Production
```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

### Deployment Options

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify
```bash
# Build command: npm run build
# Publish directory: dist
```

#### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🤝 Contributing

We welcome contributions to CodeBuddy! Please follow our contribution guidelines:

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- Follow **ESLint** and **Prettier** configurations
- Write **meaningful commit messages**
- Add **tests** for new features
- Update **documentation** as needed

### Pull Request Guidelines
- Provide a clear description of changes
- Include screenshots for UI changes
- Ensure all tests pass
- Update relevant documentation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Frontend Developer** - React, Redux, UI/UX
- **Backend Developer** - Node.js, Express, MongoDB
- **AI Engineer** - Machine Learning, Analytics
- **DevOps Engineer** - Deployment, CI/CD

---

## 📞 Support

Need help? Reach out to us:

- **Email**: support@codebuddy.dev
- **Discord**: [Join our community](https://discord.gg/codebuddy)
- **GitHub Issues**: [Report bugs](https://github.com/yourusername/code-collab-platform/issues)
- **Documentation**: [Full docs](https://docs.codebuddy.dev)

---

## 🚀 Roadmap

### Upcoming Features
- [ ] **Real-time Collaboration** - Live coding sessions
- [ ] **Video Chat Integration** - Built-in video calls
- [ ] **Code Review System** - Peer code reviews
- [ ] **Contest Mode** - Timed coding competitions
- [ ] **Mobile App** - Native iOS and Android apps
- [ ] **IDE Integration** - VS Code extension
- [ ] **Advanced Analytics** - ML-powered insights

### Version History
- **v1.0.0** - Initial release with core features
- **v1.1.0** - AI analytics and insights
- **v1.2.0** - Mobile responsiveness improvements
- **v2.0.0** - Real-time collaboration (planned)

---

<div align="center">
  <h3>Built with ❤️ by the CodeBuddy Team</h3>
  <p>Happy Coding! 🎉</p>
</div>