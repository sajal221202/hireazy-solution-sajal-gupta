import React, { useState } from 'react';
import { validateFile } from '../utils/fileValidators';

const RoleSelection = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const roles = [
    {
      id: 'candidate',
      title: 'Candidate',
      description: 'Practice your interview skills and get AI-powered feedback',
      icon: '👤',
      features: [
        'Practice interview questions',
        'Upload your resume for personalized questions',
        'Get real-time feedback',
        'Track your progress'
      ],
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'interviewer',
      title: 'Interviewer',
      description: 'Conduct AI-assisted interviews and evaluate candidates',
      icon: '💼',
      features: [
        'AI-generated interview questions',
        'Real-time candidate evaluation',
        'Structured interview flow',
        'Performance analytics'
      ],
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  const handleRoleClick = (roleId) => {
    setSelectedRole(roleId);
    setIsConfirming(false);
  };

  const handleConfirm = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole, resumeFile);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Reset states
    setError(null);
    setWarning(null);

    // Validate file
    const validation = validateFile(file);

    if (!validation.isValid) {
      setError(validation.errors.type || validation.errors.size);
      return;
    }

    if (validation.warnings.size) {
      setWarning(validation.warnings.size);
    }

    // Store the resume
    setResumeFile(file);

    // Reset input
    event.target.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      const input = document.createElement('input');
      input.type = 'file';
      input.files = e.dataTransfer.files;
      handleFileUpload({ target: input });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to HireAzy
          </h1>
          <p className="text-xl text-gray-600">
            Choose your role to get started with AI-powered interviews
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group ${
                selectedRole === role.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleRoleClick(role.id)}
            >
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {role.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {role.title}
                  </h2>
                  <p className="text-gray-600">
                    {role.description}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {role.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full text-white py-3 px-4 rounded-lg font-semibold transition-colors ${role.color}`}
                >
                  Select {role.title}
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedRole === 'candidate' && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Upload Your Resume (Optional)
            </h2>
            <div 
              className={`
                relative rounded-xl border-2 border-dashed transition-all p-8
                ${isDragging 
                  ? 'border-primary-400 bg-primary-50' 
                  : resumeFile
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label 
                htmlFor="resume-upload" 
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                {resumeFile ? (
                  <>
                    <svg 
                      className="h-12 w-12 text-green-500 mb-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-lg font-medium text-green-600 mb-1">
                      Resume Uploaded Successfully
                    </p>
                    <p className="text-sm text-green-500">
                      {resumeFile.name}
                    </p>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setResumeFile(null);
                      }}
                      className="mt-4 text-sm text-red-500 hover:text-red-600"
                    >
                      Remove Resume
                    </button>
                  </>
                ) : (
                  <>
                    <svg 
                      className={`h-12 w-12 transition-colors mb-4 ${isDragging ? 'text-primary-500' : 'text-gray-400'}`}
                      stroke="currentColor" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                      />
                    </svg>
                    <p className="text-lg font-medium text-gray-700 mb-1">
                      {isDragging ? 'Drop your resume here' : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-gray-500">
                      PDF or TXT files up to 5MB
                    </p>
                  </>
                )}
              </label>
            </div>

            {/* Error message */}
            {error && (
              <div className="mt-4 flex items-center text-sm text-red-600">
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            {/* Warning message */}
            {warning && (
              <div className="mt-4 flex items-center text-sm text-yellow-600">
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {warning}
              </div>
            )}
          </div>
        )}

        {selectedRole && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleConfirm}
              className={`px-8 py-3 text-white rounded-lg font-semibold transition-colors ${
                selectedRole === 'candidate' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              Continue as {selectedRole === 'candidate' ? 'Candidate' : 'Interviewer'}
            </button>
          </div>
        )}

        <div className="mt-8 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
            <div className="flex items-center text-sm text-blue-700">
              <span className="text-blue-400 mr-2">ℹ️</span>
              <span>
                <strong>Single Role Policy:</strong> You can only select one role per session. 
                Refresh the page to change roles.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection; 