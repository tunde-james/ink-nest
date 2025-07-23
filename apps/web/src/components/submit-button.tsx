'use client';

import { useFormStatus } from 'react-dom';

import { Button } from './ui/button';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

function SubmitButton({ children, className }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} className={className}>
      {pending ? (
        <span className="animate-pulse">Submitting...</span>
      ) : (
        children
      )}
    </Button>
  );
}

export default SubmitButton;
