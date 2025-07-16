import Link from 'next/link';

import SignInForm from './_components/sign-in-form';
import { Button } from '@/components/ui/button';

function SignIn() {
  return (
    <div className="bg-white p-8 border rounded-md shadow-md w-96 flex flex-col justify-center items-center gap-3">
      <h1 className="text-center text-2xl font-bold mb-4">Sign In</h1>

      <SignInForm />

      <Link href={'/auth/forgot-passowrd'}>Forgot Your Password?</Link>

      <Button>
        <a href={`${process.env.BACKEND_URL}/auth/google/login`}>Sign In With Google</a>
      </Button>
    </div>
  );
}

export default SignIn;
