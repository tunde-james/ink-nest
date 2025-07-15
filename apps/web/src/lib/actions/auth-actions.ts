'use server';

import { print } from 'graphql';
import { redirect } from 'next/navigation';

import { fetchGraphQL } from '../fetch-graphql';
import { SignUpFormState } from '../types/form-state';
import { SignUpFormSchema } from '../zod-schemas/sign-up-form-schema';
import { CREATE_USER_MUTATION } from '../gql-queries';

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
      errors: validatedFields.error.flatten().fieldErrors,
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
