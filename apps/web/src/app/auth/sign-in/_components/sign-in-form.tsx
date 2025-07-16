'use client';

import { useActionState } from 'react';

import SubmitButton from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from '@/lib/actions/auth-actions';

function SignInForm() {
  const [state, formAction] = useActionState(signIn, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      {!!state?.message ? (
        <p className="text-red-500 text-sm">{state.message}</p>
      ) : (
        ''
      )}

      <div className="">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="john@example.com"
          defaultValue={state?.data.email}
        />
      </div>
      {!!state?.errors?.email ? (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      ) : (
        ''
      )}

      <div className="">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" />
      </div>
      {!!state?.errors?.password ? (
        <p className="text-red-500 text-sm">{state.errors.password}</p>
      ) : (
        ''
      )}

      <SubmitButton>Sign In</SubmitButton>
    </form>
  );
}

export default SignInForm;
