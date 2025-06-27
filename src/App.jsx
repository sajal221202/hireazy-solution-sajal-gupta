import React, { useState } from 'react';
import RoleSelection from './components/RoleSelection';
import CandidateDashboard from './components/CandidateDashboard';
import InterviewerDashboard from './components/InterviewerDashboard';

function App() {
  // User role state - null means no role selected yet
  const [userRole, setUserRole] = useState(null);
  // Resume state for candidate
  const [resumeFile, setResumeFile] = useState(null);

  // Handle role selection from RoleSelection component
  const handleRoleSelect = (selectedRole, resume = null) => {
    setUserRole(selectedRole);
    setResumeFile(resume);
    console.log(`Role selected: ${selectedRole}${resume ? ' with resume' : ''}`);
  };

  // Handle role change/switch (resets to role selection)
  const handleRoleChange = () => {
    setUserRole(null);
    setResumeFile(null);
    console.log('Role cleared - returning to role selection');
  };

  // If no role is selected, show role selection screen
  if (!userRole) {
    return <RoleSelection onRoleSelect={handleRoleSelect} />;
  }

  // Render appropriate dashboard based on selected role
  if (userRole === 'candidate') {
    return <CandidateDashboard onRoleChange={handleRoleChange} resumeFile={resumeFile} />;
  }

  if (userRole === 'interviewer') {
    return <InterviewerDashboard onRoleChange={handleRoleChange} />;
  }

  // Fallback (should never reach here with proper role management)
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Error: Invalid Role
        </h1>
        <p className="text-gray-600 mb-4">
          An unexpected error occurred with role selection.
        </p>
        <button
          onClick={handleRoleChange}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Reset Application
        </button>
      </div>
    </div>
  );
}

export default App;
