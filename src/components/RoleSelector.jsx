import React, { useState } from 'react';

const RoleSelector = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState('');

  const roles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Scientist',
    'Product Manager',
    'UX/UI Designer',
    'DevOps Engineer',
    'Software Engineer'
  ];

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    if (onRoleSelect && role) {
      onRoleSelect(role);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Select Role</h3>
      <select
        value={selectedRole}
        onChange={handleRoleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Choose a role...</option>
        {roles.map((role, index) => (
          <option key={index} value={role}>
            {role}
          </option>
        ))}
      </select>
      {selectedRole && (
        <p className="mt-2 text-sm text-green-600">
          Selected: {selectedRole}
        </p>
      )}
    </div>
  );
};

export default RoleSelector; 