import Hero from '@/components/hero';
import Posts from '@/components/posts';
import { fetchPosts } from '@/lib/actions/posts-actions';

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <main>
      <Hero />
      <Posts posts={posts} />
    </main>
  );
}
