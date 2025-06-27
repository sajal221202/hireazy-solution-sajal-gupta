// File validation utilities

const ALLOWED_TYPES = ['.pdf', '.txt'];
const MAX_FILE_SIZE_MB = 5;

export const validateFileType = (file) => {
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
  return ALLOWED_TYPES.includes(fileExtension);
};

export const validateFileSize = (file) => {
  const maxSizeInBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
  return {
    isValid: file.size <= maxSizeInBytes,
    size: file.size,
    maxSize: maxSizeInBytes,
    sizeInMB: (file.size / 1024 / 1024).toFixed(2)
  };
};

export const validateFile = (file) => {
  const validationType = validateFileType(file);
  const sizeValidation = validateFileSize(file);

  return {
    isValid: validationType && sizeValidation.isValid,
    errors: {
      type: !validationType ? `File type not supported. Please upload ${ALLOWED_TYPES.join(' or ')} files.` : null,
      size: !sizeValidation.isValid ? `File size (${sizeValidation.sizeInMB} MB) exceeds ${MAX_FILE_SIZE_MB}MB limit.` : null
    },
    warnings: {
      size: sizeValidation.isValid && sizeValidation.sizeInMB > MAX_FILE_SIZE_MB / 2 
        ? `Large file detected (${sizeValidation.sizeInMB} MB). This might take longer to process.` 
        : null
    }
  };
};

export const getFileInfo = (file) => {
  return {
    name: file.name,
    size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    type: file.type,
    lastModified: new Date(file.lastModified).toLocaleDateString()
  };
};

export const generateUniqueFileName = (fileName, existingFiles = []) => {
  const extension = fileName.split('.').pop();
  const baseName = fileName.slice(0, -(extension.length + 1));
  let newFileName = fileName;
  let counter = 1;

  while (existingFiles.includes(newFileName)) {
    newFileName = `${baseName} (${counter}).${extension}`;
    counter++;
  }

  return newFileName;
}; 