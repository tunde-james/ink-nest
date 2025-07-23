import gql from 'graphql-tag';

export const GET_POSTS = gql`
  query posts($skip: Float, $take: Float) {
    posts(skip: $skip, take: $take) {
      id
      title
      thumbnail
      content
      createdAt
      slug
    }
    postCount
  }
`;

export const GET_POST_BY_ID = gql`
  query getPostById($id: Int!) {
    getPostById(id: $id) {
      id
      title
      thumbnail
      content
      createdAt
      author {
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id
    }
  }
`;

export const SIGN_IN_MUTATION = gql`
  mutation signIn($input: SignInInput!) {
    signIn(signInInput: $input) {
      id
      name
      avatar
      accessToken
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query getPostComments($postId: Int!, $take: Int, $skip: Int) {
    getPostComments(postId: $postId, take: $take, skip: $skip) {
      id
      content
      createdAt
      author {
        name
        avatar
      }
    }

    postCommentCount(postId: $postId)
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(createCommentInput: $input) {
      id
    }
  }
`;

export const POST_LIKES = gql`
  query postLikeData($postId: Int!) {
    postLikesCount(postId: $postId)
    userLikedPost(postId: $postId)
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation likePostMutation($postId: Int!) {
    likePost(postId: $postId)
  }
`;

export const UNLIKE_POST_MUTATION = gql`
  mutation unlikePostMutation($postId: Int!) {
    unlikePost(postId: $postId)
  }
`;

export const GET_USER_POSTS = gql`
  query GetUserPosts($skip: Int, $take: Int) {
    getUserPosts(skip: $skip, take: $take) {
      id
      title
      slug
      thumbnail
      published
      createdAt
      content
      _count {
        comments
        likes
      }
    }
    userPostCount
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPostMutation($input: CreatePostInput!) {
    createPost(createPostInput: $input) {
      id
    }
  }
`;
