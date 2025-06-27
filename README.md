# HireAzy - Interview Simulation Platform

## Assignment Questions & Answers

### 1. Tell me about a time when you made a mistake while building something. What did you do next?

While developing the chat interface for HireAzy, I encountered a significant challenge with message alignment and styling. Initially, all messages were appearing on the right side with identical styling, making it impossible to distinguish between interviewer and candidate messages.

To resolve this issue:
1. Identified the root cause in the message styling logic
2. Simplified the code by implementing explicit sender type checks
3. Added clear visual distinction (blue for AI, green for user)
4. Implemented proper alignment using Tailwind's utility classes
5. Added comprehensive testing to prevent similar issues

This experience reinforced the importance of thorough testing and the value of maintaining simple, clear code structure.

### 2. Why are you applying to an early-stage startup instead of a safer job or internship?

The development of HireAzy demonstrates my alignment with startup culture:
- Made independent architectural decisions
- Implemented multiple features simultaneously (chat, file upload, role selection)
- Balanced immediate functionality with scalable design
- Worked with modern tech stack and best practices

This project showcases my ability to:
- Take ownership of end-to-end development
- Make product-focused decisions
- Build scalable solutions
- Adapt quickly to technical challenges

These experiences align perfectly with the dynamic nature of startup environments.

### 3. If you were to build a product alone, how would you go about it – step by step?

Based on my experience building HireAzy:

1. Requirements Analysis
   - Define core features
   - Identify MVP requirements
   - Set project scope and boundaries

2. Technical Planning
   - Select appropriate tech stack
   - Design component architecture
   - Plan state management approach

3. Iterative Development
   - Start with core functionality
   - Add features incrementally
   - Continuous testing and refactoring

4. User Experience Focus
   - Design intuitive interfaces
   - Implement user feedback
   - Ensure responsive design

5. Polish & Optimization
   - Code cleanup
   - Performance optimization
   - Error handling implementation

## Technical Implementation

### Tech Stack Used
- **Frontend**: React with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **File Handling**: Native File API
- **Build Tools**: Vite, npm
- **Code Quality**: ESLint

### Core Features
1. **Role-Based Interface**
   - Interviewer and Candidate modes
   - Dynamic feature access
   - Seamless role switching

2. **Real-Time Chat**
   - Distinct message styling
   - Typing indicators
   - Message timestamps
   - Auto-scrolling

3. **File Management**
   - PDF/TXT upload support
   - File validation
   - Upload status tracking

4. **Interview Controls**
   - Start/End functionality
   - Progress tracking
   - Session management

### How It Works

The application provides a streamlined interview simulation experience:

1. **Initial Setup**
   - User selects role (Interviewer/Candidate)
   - System configures appropriate features
   - Clean, intuitive interface presentation

2. **Interview Process**
   - Real-time messaging system
   - Role-specific capabilities
   - Progress tracking
   - File sharing (Interviewer only)

3. **User Experience**
   - Clear visual feedback
   - Responsive design
   - Intuitive controls
   - Error handling

### What I'd Improve With More Time

1. **Feature Enhancements**
   - Video/Audio integration
   - Screen sharing
   - Code editor for technical interviews
   - Interview recording
   - AI-powered assistance

2. **Technical Improvements**
   - Backend integration
   - Authentication system
   - WebSocket implementation
   - Comprehensive testing
   - Advanced error handling

3. **UX Improvements**
   - Customizable themes
   - Interview templates
   - Rich text support
   - File previews
   - Scheduling system

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

3. Start development server:
```bash
npm run dev
```

4. Access the application at http://localhost:5173

## Project Structure
```
hireazy/
├── src/
│   ├── components/    # React components
│   ├── hooks/        # Custom hooks
│   ├── utils/        # Helper functions
│   ├── styles/       # Global styles
│   ├── App.jsx      # Main component
│   └── main.jsx     # Entry point
├── public/          # Static assets
└── package.json     # Dependencies
```

## Development Philosophy

1. **Component Architecture**
   - Modular design
   - Reusable components
   - Clean code structure

2. **User-Centric Approach**
   - Intuitive interfaces
   - Clear feedback
   - Responsive design

3. **Performance Focus**
   - Optimized rendering
   - Efficient state management
   - Fast load times

## Future Vision

1. **Short-term Goals**
   - User authentication
   - Data persistence
   - Additional templates

2. **Long-term Vision**
   - AI integration
   - Analytics dashboard
   - ATS integration

## Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.
