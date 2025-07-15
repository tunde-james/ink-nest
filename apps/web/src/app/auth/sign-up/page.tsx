import Link from 'next/link';
import SignUpForm from './_components/sign-up-form';

function SignUpPage() {
  return (
    <div className="bg-white p-8 rounded-md shadow-md w-96 flex flex-col justify-center items-center">
      <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>

      <SignUpForm />

      <div className="">
        <p className="">Already hav an account?</p>
        <Link href={'/auth/signin'} className="underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
