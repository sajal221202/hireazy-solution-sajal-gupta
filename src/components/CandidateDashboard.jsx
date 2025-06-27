import React, { useState } from 'react';
import ChatBox from './ChatBox';
import RoleSelector from './RoleSelector';
import StartInterviewBtn from './StartInterviewBtn';

const CandidateDashboard = ({ onRoleChange, resumeFile }) => {
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const handleStartInterview = () => {
    if (selectedRole) {
      setIsInterviewStarted(true);
      console.log('Interview started!');
    }
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const isReadyToStart = selectedRole;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                👤 Candidate Portal - HireAzy
              </h1>
              <p className="text-gray-600 mt-1">
                Prepare for your next interview with AI-powered practice sessions
              </p>
            </div>
            <button
              onClick={onRoleChange}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Switch Role
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isInterviewStarted ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Setup Your Interview
                </h2>
                <div className="space-y-4">
                  <div className="relative">
                    <RoleSelector onRoleSelect={handleRoleSelection} />
                    {selectedRole && (
                      <div className="absolute -top-2 -right-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs rounded-full">
                          ✓
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {resumeFile && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <div>
                          <p className="text-sm font-medium text-green-800">
                            Resume Uploaded
                          </p>
                          <p className="text-sm text-green-600">
                            {resumeFile.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <StartInterviewBtn 
                    disabled={!isReadyToStart} 
                    onClick={handleStartInterview}
                  />
                  
                  {!isReadyToStart && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-start">
                        <span className="text-yellow-400 mr-2">⚠️</span>
                        <div className="text-sm text-yellow-700">
                          <strong>Setup Required:</strong>
                          <ul className="mt-1 list-disc list-inside">
                            {!selectedRole && <li>Select your target role</li>}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Interview Preparation Tips */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Interview Preparation Tips
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">
                      Review your resume and be ready to discuss your experience
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">
                      Practice explaining your projects and technical decisions
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">
                      Prepare questions about the role and company
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">
                      Ensure you have a quiet environment for the interview
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">How it works</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Select Your Role</h3>
                      <p className="text-gray-600 text-sm">Choose the position you're interviewing for</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Resume Status</h3>
                      <p className="text-gray-600 text-sm">
                        {resumeFile 
                          ? "Your resume is ready for the interview"
                          : "You can still interview without a resume"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Start Interview</h3>
                      <p className="text-gray-600 text-sm">Begin your AI-powered practice session</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Practice Sessions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Your Recent Sessions
                </h3>
                <div className="space-y-3">
                  {[
                    { role: 'Frontend Developer', score: 8.5, date: 'Yesterday' },
                    { role: 'Full Stack Developer', score: 7.8, date: '3 days ago' },
                    { role: 'React Developer', score: 9.2, date: '1 week ago' }
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{session.role}</div>
                        <div className="text-sm text-gray-600">{session.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-blue-600">{session.score}/10</div>
                        <div className="text-sm text-gray-500">Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ChatBox 
                userRole="candidate"
                selectedRole={selectedRole}
                resumeFile={resumeFile}
              />
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Interview Progress
                </h3>
                {/* Progress indicators are now handled by ChatBox */}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CandidateDashboard; 