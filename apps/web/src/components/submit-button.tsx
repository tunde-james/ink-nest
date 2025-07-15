import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

interface ButtonProps {
  children: React.ReactNode;
}

function SubmitButton({ children }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? (
        <span className="animate-pulse">Submitting...</span>
      ) : (
        children
      )}
    </Button>
  );
}

export default SubmitButton;
