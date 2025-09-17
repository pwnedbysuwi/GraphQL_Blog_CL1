import React from 'react';
import { useRouter } from 'next/router';

import { getCategories, getCategoryPost } from '../../services';
import { PostCard, Categories, Loader } from '../../components';

const CategoryPage = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main posts */}
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, i) => (
            <PostCard key={i} post={post.node} />
          ))}
        </div>

        {/* Sidebar */}
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

/**
 * Fetch posts for a given category (runs at build time)
 */
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

/**
 * Define dynamic paths for category pages
 */
export async function getStaticPaths() {
  const categories = await getCategories();

  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
