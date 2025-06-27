import React, { useState } from 'react';
import ChatBox from './ChatBox';

const InterviewerDashboard = ({ onRoleChange }) => {
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState(null);

  const handleStartInterview = () => {
    setIsInterviewActive(true);
    setCurrentCandidate({
      name: 'Sample Candidate',
      role: 'Frontend Developer',
      experience: '3 years'
    });
  };

  const handleEndInterview = () => {
    setIsInterviewActive(false);
    setCurrentCandidate(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                💼 Interviewer Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Conduct AI-assisted interviews and evaluate candidates
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
        {!isInterviewActive ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Interview Controls */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Start New Interview
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interview Type
                    </label>
                    <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>Technical Interview</option>
                      <option>Behavioral Interview</option>
                      <option>System Design</option>
                      <option>Coding Challenge</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position Level
                    </label>
                    <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>Junior (0-2 years)</option>
                      <option>Mid-level (2-5 years)</option>
                      <option>Senior (5+ years)</option>
                      <option>Lead/Principal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>30 minutes</option>
                      <option>45 minutes</option>
                      <option>60 minutes</option>
                      <option>90 minutes</option>
                    </select>
                  </div>

                  <button
                    onClick={handleStartInterview}
                    className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors font-semibold"
                  >
                    Start Interview Session
                  </button>
                </div>
              </div>

              {/* AI Assistant Settings */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  AI Assistant Settings
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Auto-generate questions</span>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Real-time evaluation</span>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Provide hints</span>
                    <input type="checkbox" className="toggle" />
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics & Recent Interviews */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Interview Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <div className="text-sm text-gray-600">Interviews Today</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">4.2</div>
                    <div className="text-sm text-gray-600">Avg. Rating</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">45m</div>
                    <div className="text-sm text-gray-600">Avg. Duration</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">89%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Recent Interviews
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'John Doe', role: 'Frontend Developer', score: 8.5, time: '2 hours ago' },
                    { name: 'Jane Smith', role: 'Backend Developer', score: 7.2, time: '4 hours ago' },
                    { name: 'Mike Johnson', role: 'Full Stack Developer', score: 9.1, time: '6 hours ago' }
                  ].map((interview, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{interview.name}</div>
                        <div className="text-sm text-gray-600">{interview.role}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">{interview.score}/10</div>
                        <div className="text-sm text-gray-500">{interview.time}</div>
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
               <div className="h-96 lg:h-[600px]">
                 <ChatBox 
                   userRole="interviewer" 
                   onMessageSent={(message) => console.log('Interviewer sent:', message)}
                 />
               </div>
             </div>
            <div className="space-y-6">
              {/* Candidate Info */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Current Candidate</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Name:</span>
                    <span className="text-sm font-medium">{currentCandidate?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Role:</span>
                    <span className="text-sm font-medium">{currentCandidate?.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Experience:</span>
                    <span className="text-sm font-medium">{currentCandidate?.experience}</span>
                  </div>
                </div>
              </div>

              {/* Interview Progress */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Interview Progress</h3>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">Question 3 of 5</p>
              </div>

              {/* AI Evaluation */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-semibold text-gray-800 mb-3">AI Evaluation</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Technical Skills:</span>
                    <span className="text-sm font-medium text-green-600">8.5/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Communication:</span>
                    <span className="text-sm font-medium text-blue-600">7.8/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Problem Solving:</span>
                    <span className="text-sm font-medium text-purple-600">9.2/10</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleEndInterview}
                className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
              >
                End Interview
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default InterviewerDashboard; 