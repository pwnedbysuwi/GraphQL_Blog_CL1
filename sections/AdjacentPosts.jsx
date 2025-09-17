import React, { useState, useEffect } from 'react';
import { AdjacentPostCard } from '../components';
import { getAdjacentPosts } from '../services';

const AdjacentPosts = ({ createdAt, slug }) => {
  const [posts, setPosts] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // Fetch adjacent posts whenever createdAt or slug changes
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAdjacentPosts(createdAt, slug);
      setPosts(result);
      setIsReady(true);
    };

    fetchData();
  }, [createdAt, slug]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-8 gap-12 mb-8">
      {isReady && (
        <>
          {posts?.previous && (
            <div
              className={`${
                posts.next ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'
              } adjacent-post rounded-lg relative h-72`}
            >
              <AdjacentPostCard post={posts.previous} position="LEFT" />
            </div>
          )}

          {posts?.next && (
            <div
              className={`${
                posts.previous ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'
              } adjacent-post rounded-lg relative h-72`}
            >
              <AdjacentPostCard post={posts.next} position="RIGHT" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdjacentPosts;
