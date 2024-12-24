"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Cloud, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  name: string;
  maxSize?: number; // in bytes
  onFileChange?: (file: File | null) => void;
}

export function FileUpload({
  name,
  maxSize = 5 * 1024 * 1024, // 5MB default
  onFileChange,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      if (onFileChange) {
        onFileChange(selectedFile);
      }
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
  });

  const removeFile = () => {
    setFile(null);
    if (onFileChange) {
      onFileChange(null);
    }
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 transition cursor-pointer",
          isDragActive ? "border-primary bg-primary/10" : "border-gray-200",
          file ? "border-success bg-success/10" : ""
        )}
      >
        <input {...getInputProps()} name={name} />

        <div className="flex flex-col items-center justify-center gap-2 p-4">
          {file ? (
            <>
              <File className="size-8 text-green-500" />
              <div className="text-sm font-medium text-green-500">
                {file.name}
              </div>
              <div className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)}MB
              </div>
            </>
          ) : (
            <>
              <Cloud className="size-8 text-gray-400" />
              <div className="text-sm font-medium">
                {isDragActive
                  ? "Drop the file here"
                  : "Drag & drop or click to upload"}
              </div>
              <div className="text-xs text-gray-500">
                PDF, PNG, JPG up to {maxSize / 1024 / 1024}MB
              </div>
            </>
          )}
        </div>
      </div>

      {file && (
        <div className="mt-2 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive"
            onClick={removeFile}
          >
            <X className="mr-1 size-4" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}
