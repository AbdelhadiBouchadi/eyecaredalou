import { X } from 'lucide-react';

interface ImageModalProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageModal({ imageUrl, isOpen, onClose }: ImageModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-4xl w-full h-full p-4">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 bg-white rounded-full hover:bg-gray-100"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={imageUrl}
            alt="Observation"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
