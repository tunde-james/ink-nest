'use server';

import { print } from 'graphql';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import z from 'zod';

import { fetchGraphQL } from '../fetch-graphql';
import { SignUpFormState } from '../types/form-state';
import { SignUpFormSchema } from '../zod-schemas/sign-up-form-schema';
import { CREATE_USER_MUTATION, SIGN_IN_MUTATION } from '../gql-queries';
import { LoginFormSchema } from '../zod-schemas/login-form-schema';
import { createSession } from '../session';

export async function signUp(
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const validatedFields = SignUpFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const data = await fetchGraphQL(print(CREATE_USER_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  if (data.errors) {
    return {
      data: Object.fromEntries(formData.entries()),
      message: 'Something went wrong',
    };
  }

  redirect('/auth/signin');
}

export async function signIn(
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const validatedFields = LoginFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const data = await fetchGraphQL(print(SIGN_IN_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  if (data.errors) {
    return {
      data: Object.fromEntries(formData.entries()),
      message: 'Invalid Credentials',
    };
  }

  await createSession({
    user: {
      id: data.signIn.id,
      name: data.signIn.name,
      avatar: data.signIn.avatar,
    },
    accessToken: data.signIn.accessToken,
  });

  revalidatePath('/');
  redirect('/');
}
