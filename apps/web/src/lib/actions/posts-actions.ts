'use server';

import { print } from 'graphql';

import { fetchGraphQL } from '../fetch-graphql';
import { GET_POSTS } from '../gql-queries';
import { Post } from '../types/model-types';

export const fetchPosts = async () => {
  const data = await fetchGraphQL(print(GET_POSTS));

  return data.posts as Post[];
};
