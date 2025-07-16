import Link from 'next/link';
import SignInForm from './_components/sign-in-form';

function SignIn() {
  return (
    <div className="bg-white p-8 border rounded-md shadow-md w-96 flex flex-col justify-center items-center gap-3">
      <h1 className="text-center text-2xl font-bold mb-4">Sign In</h1>

      <SignInForm />

      <Link href={'/auth/forgot-passowrd'}>Forgot Your Password?</Link>
    </div>
  );
}

export default SignIn;
