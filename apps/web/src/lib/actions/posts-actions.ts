'use server';

import { print } from 'graphql';
import { z } from 'zod';

import { authFetchGraphQL, fetchGraphQL } from '../fetch-graphql';
import {
  CREATE_POST_MUTATION,
  DELETE_POST_MUTATION,
  GET_POST_BY_ID,
  GET_POSTS,
  GET_USER_POSTS,
  UPDATE_POST_MUTATION,
} from '../gql-queries';
import { Post } from '../types/model-types';
import { transformTakeSkip } from '../helpers';
import { PostFormState } from '../types/form-state';
import { PostFormSchema } from '../zod-schemas/post-form-schema';
import { uploadThumbnail } from '../upload-file';

export async function fetchPosts({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) {
  const { skip, take } = transformTakeSkip({ page, pageSize });
  const data = await fetchGraphQL(print(GET_POSTS), { skip, take });

  return { posts: data.posts as Post[], totalPosts: data.postCount };
}

export async function fetchPostById(id: number) {
  const data = await fetchGraphQL(print(GET_POST_BY_ID), { id });

  return data.getPostById as Post;
}

export async function fetchUserPosts({
  page,
  pageSize,
}: {
  page?: number;
  pageSize: number;
}) {
  const { skip, take } = transformTakeSkip({ page, pageSize });

  const data = await authFetchGraphQL(print(GET_USER_POSTS), {
    take,
    skip,
  });

  return {
    posts: data.getUserPosts as Post[],
    totalPosts: data.userPostCount as number,
  };
}

export async function saveNewPost(
  state: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const validatedFields = PostFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  let thumbnailUrl = '';

  if (validatedFields.data.thumbnail) {
    thumbnailUrl = await uploadThumbnail(validatedFields.data.thumbnail);
  }

  const data = await authFetchGraphQL(print(CREATE_POST_MUTATION), {
    input: {
      ...validatedFields.data,
      thumbnail: thumbnailUrl,
    },
  });

  if (data) {
    return {
      message: 'Success! New post saved.',
      ok: true,
    };
  }

  return {
    message: 'Oops, something went wrong!',
    data: Object.fromEntries(formData.entries()),
  };
}

export async function updatePost(
  state: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const validatedFields = PostFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const { thumbnail, ...inputs } = validatedFields.data;

  let thumbnailUrl = '';

  if (thumbnail) {
    thumbnailUrl = await uploadThumbnail(thumbnail);
  }

  const data = await authFetchGraphQL(print(UPDATE_POST_MUTATION), {
    input: {
      ...inputs,
      ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
    },
  });

  if (data) {
    return {
      message: 'Success! Post updated.',
      ok: true,
    };
  }

  return {
    message: 'Oops, something went wrong!',
    data: Object.fromEntries(formData.entries()),
  };
}

export async function deletePost(postId: number) {
  const data = await authFetchGraphQL(print(DELETE_POST_MUTATION), {
    postId,
  });

  return data.deletePost;
}
