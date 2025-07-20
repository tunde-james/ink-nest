import { fetchUserPosts } from '@/lib/actions/posts-actions';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import NoPost from './_components/no-post';
import PostList from './_components/post-list';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function UserPostPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const { posts, totalPosts } = await fetchUserPosts({
    page: page ? +page : 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  return (
    <div>
      {!posts || !posts.length ? (
        <NoPost />
      ) : (
        <PostList
          posts={posts}
          currentPage={page ? +page : 1}
          totalPages={Math.ceil(totalPosts / DEFAULT_PAGE_SIZE)}
        />
      )}
    </div>
  );
}

export default UserPostPage;
