import { useState, useEffect } from 'react';

// Sample question templates based on role
const roleBasedQuestions = {
  'Frontend Developer': [
    "Can you explain the difference between controlled and uncontrolled components in React?",
    "How do you handle state management in your React applications?",
    "What's your experience with responsive design and CSS frameworks?",
    "How do you optimize the performance of a React application?",
    "Explain your approach to testing React components"
  ],
  'Backend Developer': [
    "How do you handle database optimization and query performance?",
    "Explain your experience with RESTful API design",
    "How do you implement authentication and authorization?",
    "What's your approach to handling large-scale data processing?",
    "How do you ensure the security of an API?"
  ],
  'Full Stack Developer': [
    "How do you coordinate frontend and backend development?",
    "Explain your experience with deployment and DevOps",
    "How do you handle data consistency across the stack?",
    "What's your approach to system architecture?",
    "How do you manage state between frontend and backend?"
  ],
  'default': [
    "Tell me about your most challenging project",
    "How do you handle tight deadlines?",
    "What's your approach to learning new technologies?",
    "How do you handle conflicts in a team?",
    "Where do you see yourself in 5 years?"
  ]
};

// Resume-based question generator
const generateResumeQuestions = (resumeText) => {
  const questions = [];

  // Extract technologies/skills
  const techPattern = /\b(React|Angular|Vue|Node|Python|Java|JavaScript|TypeScript|SQL|MongoDB|AWS|Docker)\b/g;
  const technologies = [...new Set(resumeText.match(techPattern) || [])];
  
  // Extract years of experience
  const expPattern = /(\d+)[\s-]*years? of experience/i;
  const experienceMatch = resumeText.match(expPattern);
  const yearsOfExperience = experienceMatch ? parseInt(experienceMatch[1]) : null;

  // Generate technology-specific questions
  technologies.forEach(tech => {
    questions.push(`Can you describe a project where you used ${tech}?`);
    questions.push(`What are the best practices you follow when working with ${tech}?`);
  });

  // Experience-based questions
  if (yearsOfExperience) {
    if (yearsOfExperience > 5) {
      questions.push("How has your approach to problem-solving evolved over your career?");
      questions.push("What leadership challenges have you faced and how did you overcome them?");
    } else {
      questions.push("What's the most important lesson you've learned in your career so far?");
      questions.push("How do you stay updated with the latest industry trends?");
    }
  }

  // Project-based questions (look for project keywords)
  if (resumeText.toLowerCase().includes('project')) {
    questions.push("Could you elaborate on one of the projects mentioned in your resume?");
    questions.push("What was the most challenging technical problem you solved in your projects?");
  }

  return questions;
};

const useInterviewQuestions = (selectedRole, resumeFile) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        let allQuestions = [];

        // Add role-based questions
        const roleQuestions = roleBasedQuestions[selectedRole] || roleBasedQuestions.default;
        allQuestions = [...roleQuestions];

        // Add resume-based questions if resume is provided
        if (resumeFile) {
          const reader = new FileReader();
          reader.onload = async (e) => {
            const resumeText = e.target.result;
            const resumeQuestions = generateResumeQuestions(resumeText);
            
            // Combine and shuffle questions
            allQuestions = [...allQuestions, ...resumeQuestions];
            allQuestions = allQuestions.sort(() => Math.random() - 0.5);
            
            setQuestions(allQuestions);
            setLoading(false);
          };
          reader.onerror = () => {
            setError("Error reading resume file");
            setLoading(false);
          };
          reader.readAsText(resumeFile);
        } else {
          // If no resume, just shuffle role-based questions
          allQuestions = allQuestions.sort(() => Math.random() - 0.5);
          setQuestions(allQuestions);
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadQuestions();
  }, [selectedRole, resumeFile]);

  const getNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return questions[currentQuestionIndex + 1];
    }
    return null;
  };

  const getCurrentQuestion = () => {
    return questions[currentQuestionIndex];
  };

  const resetInterview = () => {
    setCurrentQuestionIndex(0);
    // Reshuffle questions
    setQuestions(questions.sort(() => Math.random() - 0.5));
  };

  return {
    loading,
    error,
    getCurrentQuestion,
    getNextQuestion,
    resetInterview,
    hasMoreQuestions: currentQuestionIndex < questions.length - 1,
    progress: {
      current: currentQuestionIndex + 1,
      total: questions.length
    }
  };
};

export default useInterviewQuestions; 