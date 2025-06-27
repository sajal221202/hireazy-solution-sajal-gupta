# HireAzy - Interview Simulation Platform

A modern, real-time interview simulation platform built with React. This application enables seamless interaction between interviewers and candidates in a clean, intuitive interface.

## Tech Stack

- **Frontend Framework**: React with Vite
- **Styling**: Tailwind CSS for modern, responsive design
- **State Management**: React Hooks (useState, useContext) for efficient state handling
- **File Handling**: Native File API for document uploads
- **Real-time Features**: Custom hooks for chat functionality
- **Build Tool**: Vite for fast development and optimized production builds
- **Package Manager**: npm
- **Code Quality**: ESLint for code consistency

## How It Works

The application follows a simple yet effective flow:

1. **Role Selection**
   - Users choose between Interviewer or Candidate role
   - Clean interface with clear role descriptions
   - Seamless role-based feature access

2. **Interview Room**
   - Real-time chat interface with distinct message styling
   - AI messages appear on the left in blue
   - Candidate messages appear on the right in green
   - Visual typing indicators and message timestamps
   - Progress tracking for interview questions

3. **File Management** (Interviewer Only)
   - PDF/TXT file upload capability
   - File validation and error handling
   - Clear upload status indicators

4. **Interview Controls**
   - Start/End interview functionality
   - Question progress tracking
   - Session management

## Core Features

- Two-way real-time chat communication
- Role-based access control
- Document upload for interviewers
- Clean, minimalist UI design
- Responsive layout for all devices
- Interview progress tracking
- Intuitive user feedback system

## What I'd Improve With More Time

1. **Enhanced Features**
   - Video/Audio chat capabilities
   - Screen sharing for technical interviews
   - Code editor for programming assessments
   - Interview recording and playback
   - AI-powered interview assistance

2. **Technical Improvements**
   - Backend integration for persistent data
   - User authentication system
   - WebSocket implementation for better real-time performance
   - Comprehensive test coverage
   - Advanced error handling and recovery

3. **UX Enhancements**
   - Customizable themes
   - Interview templates
   - Rich text formatting in chat
   - File preview functionality
   - Interview scheduling system

4. **Performance Optimization**
   - Message pagination for long interviews
   - Image/file compression
   - Lazy loading for components
   - Service Worker for offline capability
   - Enhanced caching strategies

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hireazy.git
```

2. Install dependencies:
```bash
cd hireazy
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## Project Structure

```
hireazy/
├── src/
│   ├── components/        # React components
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Helper functions
│   ├── styles/           # Global styles
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
├── public/              # Static assets
└── package.json         # Project dependencies
```

## Development Approach

The development followed these principles:

1. **Component-Based Architecture**
   - Modular, reusable components
   - Clear separation of concerns
   - Maintainable code structure

2. **User-Centric Design**
   - Intuitive interface
   - Responsive feedback
   - Accessible features

3. **Performance First**
   - Optimized rendering
   - Efficient state management
   - Fast load times

## Future Roadmap

1. **Short-term Goals**
   - Add authentication
   - Implement persistent storage
   - Add more interview templates

2. **Long-term Vision**
   - AI-powered interview assistance
   - Advanced analytics
   - Integration with ATS systems

## Contributing

Feel free to submit issues and enhancement requests!
