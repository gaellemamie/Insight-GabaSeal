"use client";

import React, { useState, DragEvent, ChangeEvent } from "react";
import { cn } from "@/lib/utils"; // shadcn helper for conditional classes
import { UploadCloud, FileIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilesCaptureProps {
  onComplete: (files: File[], name: string, allowedFiles: string[]) => void;
  allowedFiles: string[];
  name: string;
}

const FilesCapture: React.FC<FilesCaptureProps> = ({ onComplete, allowedFiles, name }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const validateFiles = (files: FileList | File[]) => {
    let validFiles = Array.from(files);
    if (allowedFiles.length > 0) {
      validFiles = validFiles.filter((file) =>
        allowedFiles.includes(file.type)
      );
    }
    return validFiles;
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

    const validFiles = validateFiles(e.dataTransfer.files);
    setSelectedFiles((prev) => [...prev, ...validFiles]);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const validFiles = validateFiles(e.target.files);
    setSelectedFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      {/* Dropzone */}
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
          Drag & drop your files here, or{" "}
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
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-2 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <FileIcon className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-700 truncate max-w-[200px]">{file.name}</span>
              </div>
              <X
                className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer"
                onClick={() => removeFile(index)}
              />
            </div>
          ))}
          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white mt-2"
            onClick={() => onComplete(selectedFiles, name, allowedFiles)}
          >
            Confirm Upload ({selectedFiles.length})
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilesCapture;
