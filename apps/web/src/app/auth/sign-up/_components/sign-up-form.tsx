'use client';

import { useActionState } from 'react';

import SubmitButton from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUp } from '@/lib/actions/auth-actions';

function SignUpForm() {
  const [state, formAction] = useActionState(signUp, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      {!!state?.message ? (
        <p className="text-red-500 text-sm">{state.message}</p>
      ) : (
        ''
      )}

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          defaultValue={state?.data?.name}
        />
      </div>
      {!!state?.errors?.name ? (
        <p className="text-red-500 text-sm">{state.errors.name}</p>
      ) : (
        ''
      )}

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" defaultValue={state?.data?.email} />
      </div>
      {!!state?.errors?.email ? (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      ) : (
        ''
      )}

      <div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" />
      </div>
      {!!state?.errors?.password ? (
        <div className="text-red-500 text-sm">
          <p className="">Password must:</p>
          <ul className="">
            {state.errors.password.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}

      <SubmitButton>Sign Up</SubmitButton>
    </form>
  );
}

export default SignUpForm;
