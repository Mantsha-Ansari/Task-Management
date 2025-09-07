import React, { useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';

export const FileUpload = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Handle file selection via input
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  // Process uploaded files
  const handleFiles = (files) => {
    files.forEach(file => {
      // Add file to uploaded files list
      const fileData = {
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString()
      };
      
      setUploadedFiles(prev => [...prev, fileData]);
      
      // Call parent function
      if (onFileUpload) {
        onFileUpload(file);
      }
    });
  };

  // Remove uploaded file
  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  // Format file size for display
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="file-upload-section">
      <div className="file-upload-header">
        <Upload className="icon" />
        <span className="file-upload-title">File Attachments</span>
      </div>

      {/* Drag and drop area */}
      <div 
        className={`file-drop-zone ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="file-drop-content">
          <Upload className="file-drop-icon" />
          <p className="file-drop-text">
            Drag and drop files here, or 
            <label className="file-input-label">
              browse
              <input
                type="file"
                className="file-input-hidden"
                onChange={handleFileSelect}
                multiple
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
              />
            </label>
          </p>
          <p className="file-drop-hint">
            Supports: PDF, DOC, TXT, Images
          </p>
        </div>
      </div>

      {/* Uploaded files list */}
      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h4 className="uploaded-files-title">Uploaded Files</h4>
          <div className="uploaded-files-list">
            {uploadedFiles.map(file => (
              <div key={file.id} className="uploaded-file-item">
                <div className="file-info">
                  <FileText className="file-icon" />
                  <div className="file-details">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">{formatFileSize(file.size)}</span>
                  </div>
                </div>
                <button
                  className="remove-file-btn"
                  onClick={() => removeFile(file.id)}
                  title="Remove file"
                >
                  <X className="icon" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};