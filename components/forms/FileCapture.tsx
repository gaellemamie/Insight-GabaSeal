"use client";

import React, { useState, DragEvent, ChangeEvent } from "react";
import { cn } from "@/lib/utils"; // shadcn helper for conditional classes
import { UploadCloud, FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileCaptureProps {
  onComplete: (file: File) => void;
  allowedFiles: string[]; // Example: [".pfx", ".pdf"]
  name: string;
}

const FileCapture: React.FC<FileCaptureProps> = ({ onComplete, allowedFiles, name }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const validateFile = (file: File) => {
    if (allowedFiles.length === 0) return true;
    const lowerName = file.name.toLowerCase();
    return allowedFiles.some(ext => lowerName.endsWith(ext.toLowerCase()));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length === 0) return;

    const file = e.dataTransfer.files[0];
    if (!validateFile(file)) {
      toast.error("File type selected is not valid");
      return;
    }

    setSelectedFile(file);
    onComplete(file);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return toast.warning("No file selected!");

    const file = e.target.files[0];
    if (!validateFile(file)) {
      toast.error("File type selected is not valid");
      return;
    }

    setSelectedFile(file);
    onComplete(file);
  };

  return (
    <div className="w-full">
      {/* Dropzone */}
      {!selectedFile ? 
          <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition-colors cursor-pointer",
          isDragging ? "border-blue-600 bg-blue-50" : "border-gray-300 hover:border-blue-500"
        )}
        onClick={() => document.getElementById(`file-input-${name}`)?.click()}
      >
        <UploadCloud
          className={cn(
            "w-10 h-10 mb-3",
            isDragging ? "text-blue-600" : "text-gray-500"
          )}
        />
        <p className="text-gray-700 text-sm text-center">
          Drag & drop your file here, or{" "}
          <span className="text-blue-600 font-semibold">click to browse</span>
        </p>
        {allowedFiles.length > 0 && (
          <p className="text-xs text-gray-500 mt-1">
            Allowed: {allowedFiles.join(", ")}
          </p>
        )}
        <input
          aria-label={name}
          id={`file-input-${name}`}
          type="file"
          accept={allowedFiles.join(",")}
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
      :null}
      

      {/* Selected File Preview */}
      {selectedFile && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-2 shadow-sm">
            <FileIcon className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-700 truncate">{selectedFile.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileCapture;



