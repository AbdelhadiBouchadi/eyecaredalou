import React, { MouseEventHandler } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';

interface ButtonProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  Icon?: React.ComponentType<{ className?: string }>;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  loading = false,
  Icon,
}) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className="w-full flex-rows gap-4 hover:opacity-80 transitions bg-subMain text-white text-sm font-medium px-1 py-2 rounded"
    >
      {loading ? (
        <BiLoaderCircle className="animate-spin text-white text-2xl" />
      ) : (
        <>
          {label}
          {Icon && <Icon className="text-white text-xl" />}
        </>
      )}
    </button>
  );
};
