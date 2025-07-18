import { getSession } from './session';

export const fetchGraphQL = async (query: string, variables = {}) => {
  const response = await fetch(`${process.env.BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();
  if (result.errors) {
    console.error('GraphQL error:', result.errors);
    throw new Error('Failed to fetch data from GraphQL');
  }

  return result.data;
};

export const authFetchGraphQL = async (query: string, variables = {}) => {
  const session = await getSession();

  const response = await fetch(`${process.env.BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();
  if (result.errors) {
    console.error('GraphQL error:', result.errors);
    throw new Error('Failed to fetch data from GraphQL');
  }

  return result.data;
};
