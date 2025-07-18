'use server';

import z from 'zod';
import { print } from 'graphql';

import { authFetchGraphQL, fetchGraphQL } from '../fetch-graphql';
import { CREATE_COMMENT_MUTATION, GET_POST_COMMENTS } from '../gql-queries';
import { CommentEntity } from '../types/model-types';
import { CreateCommentFormState } from '../types/form-state';
import { CommentFormSchema } from '../zod-schemas/comment-form-schema';

export async function getPostComments({
  postId,
  skip,
  take,
}: {
  postId: number;
  skip: number;
  take: number;
}) {
  const data = await fetchGraphQL(print(GET_POST_COMMENTS), {
    postId,
    take,
    skip,
  });

  return {
    comments: data.getPostComments as CommentEntity[],
    count: data.postCommentCount as number,
  };
}

export async function saveComment(
  state: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const validatedFields = CommentFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const data = await authFetchGraphQL(print(CREATE_COMMENT_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  if (data) {
    return {
      message: 'Success! Your comment is saved!',
      ok: true,
      open: false,
    };
  }

  return {
    message: 'Oops! Something went wrong!',
    ok: false,
    open: true,
    data: Object.fromEntries(formData.entries()),
  };
}
