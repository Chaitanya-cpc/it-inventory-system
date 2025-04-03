'use client';

import { useState, useRef } from 'react';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  label?: string;
  accept?: string;
  id?: string;
  initialPreview?: string;
}

export default function FileUpload({ 
  onFileChange, 
  label = "Upload File", 
  accept = "image/*", 
  id = "file-upload",
  initialPreview
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    onFileChange(file);
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      // For non-image files, just show the file name
      setPreview(null);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setPreview(null);
    onFileChange(null);
  };

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm text-tron-cyan">{label}</label>
      <div 
        className={`border border-dashed ${isDragging ? 'border-tron-cyan' : 'border-tron-cyan/30'} 
          rounded p-6 text-center ${isDragging ? 'bg-tron-cyan/5' : 'bg-black'} transition-colors`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="flex flex-col items-center">
            {preview.startsWith('data:image') ? (
              <img 
                src={preview} 
                alt="Preview" 
                className="max-h-40 max-w-full mb-3 border border-tron-cyan/30 rounded" 
              />
            ) : (
              <div className="p-4 mb-3 border border-tron-cyan/30 rounded">
                <svg className="w-12 h-12 mx-auto text-tron-cyan/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            )}
            <div className="flex space-x-2">
              <button 
                type="button"
                onClick={handleButtonClick}
                className="px-3 py-1 border border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10 rounded transition text-sm"
              >
                CHANGE FILE
              </button>
              <button 
                type="button"
                onClick={handleRemove}
                className="px-3 py-1 border border-tron-red text-tron-red bg-black hover:bg-tron-red/10 rounded transition text-sm"
              >
                REMOVE
              </button>
            </div>
          </div>
        ) : (
          <>
            <svg className="w-12 h-12 mx-auto text-tron-cyan/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mt-2 text-sm text-tron-cyan/70">Click to upload or drag and drop</p>
            <input 
              ref={fileInputRef}
              id={id} 
              type="file" 
              className="hidden" 
              onChange={handleFileInput}
              accept={accept}
            />
            <button 
              type="button"
              onClick={handleButtonClick}
              className="mt-4 px-4 py-2 border border-tron-cyan text-tron-cyan bg-black hover:bg-tron-cyan/10 rounded transition text-sm"
            >
              SELECT FILE
            </button>
          </>
        )}
      </div>
    </div>
  );
} 