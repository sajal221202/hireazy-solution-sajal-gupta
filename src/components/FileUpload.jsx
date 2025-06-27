import React, { useState } from 'react';
import { validateFile, generateUniqueFileName } from '../utils/fileValidators';

const FileUpload = ({ onFileUpload, userRole, existingFiles = [] }) => {
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Only show for interviewer role
  if (userRole !== 'interviewer') {
    return null;
  }

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

    // Handle duplicate filenames
    const uniqueFileName = generateUniqueFileName(file.name, existingFiles);
    const fileToUpload = uniqueFileName !== file.name 
      ? new File([file], uniqueFileName, { type: file.type })
      : file;

    // Call parent handler
    if (onFileUpload) {
      onFileUpload(fileToUpload);
    }

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
    <div className="mb-3">
      <div 
        className={`
          relative rounded-xl border-2 border-dashed transition-all
          ${isDragging 
            ? 'border-primary-400 bg-primary-50' 
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
          id="file-upload"
        />
        <label 
          htmlFor="file-upload" 
          className="flex flex-col items-center justify-center px-4 py-6 cursor-pointer"
        >
          <svg 
            className={`h-8 w-8 transition-colors ${isDragging ? 'text-primary-500' : 'text-gray-400'}`}
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
          <p className="mt-2 text-sm text-gray-600">
            {isDragging ? 'Drop your file here' : 'Click to upload or drag and drop'}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            PDF or TXT files up to 5MB
          </p>
        </label>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-2 flex items-center text-sm text-red-600">
          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* Warning message */}
      {warning && (
        <div className="mt-2 flex items-center text-sm text-yellow-600">
          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {warning}
        </div>
      )}
    </div>
  );
};

export default FileUpload; 