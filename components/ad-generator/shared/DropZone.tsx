'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { UploadCloud, X } from 'lucide-react';

interface DropZoneProps {
  onFile: (dataUrl: string, file: File) => void;
  accept?: Record<string, string[]>;
  label?: string;
  preview?: string | null;
  onRemove?: () => void;
  className?: string;
  maxSizeMB?: number;
}

export default function DropZone({
  onFile,
  accept = { 'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.svg'] },
  label = 'Drop image here or click to browse',
  preview,
  onRemove,
  className = '',
  maxSizeMB = 5,
}: DropZoneProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      setError(null);
      if (rejected.length > 0) {
        setError(rejected[0].errors[0]?.message || 'File rejected');
        return;
      }
      const file = accepted[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        onFile(dataUrl, file);
      };
      reader.readAsDataURL(file);
    },
    [onFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
    maxSize: maxSizeMB * 1024 * 1024,
  });

  if (preview) {
    return (
      <div className={`relative rounded-xl overflow-hidden border border-white/10 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={preview} alt="Preview" className="w-full h-full object-contain bg-black/20" />
        {onRemove && (
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white rounded-full p-1 transition-colors"
            type="button"
          >
            <X size={14} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center gap-3
          ${isDragActive
            ? 'border-indigo-500 bg-indigo-500/10'
            : 'border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/8'
          }`}
      >
        <input {...getInputProps()} />
        <UploadCloud className={`w-8 h-8 ${isDragActive ? 'text-indigo-400' : 'text-white/40'}`} />
        <p className="text-sm text-white/60">{label}</p>
        <p className="text-xs text-white/30">Max {maxSizeMB}MB</p>
      </div>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
