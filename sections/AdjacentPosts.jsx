import React, { useState, useEffect } from 'react';

import { AdjacentPostCard } from '../components';  // Importing the AdjacentPostCard component for displaying adjacent posts
import { getAdjacentPosts } from '../services';  // Importing the service function to fetch adjacent posts based on creation date and slug

const AdjacentPosts = ({ createdAt, slug }) => {
  // State to hold the adjacent post data and loading status
  const [adjacentPost, setAdjacentPost] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Fetch adjacent posts when the component mounts or when the slug changes
  useEffect(() => {
    // Calling the service function to fetch adjacent posts
    getAdjacentPosts(createdAt, slug).then((result) => {
      // Setting the fetched data to state once the request is complete
      setAdjacentPost(result);
      setDataLoaded(true);  // Marking data as loaded
    });
  }, [createdAt, slug]);  // Adding both 'createdAt' and 'slug' as dependencies to re-fetch when either changes

  return (
    <div className="grid grid-cols-1 lg:grid-cols-8 gap-12 mb-8">
      {dataLoaded && (  // Only render adjacent posts when the data has been loaded
        <>
          {adjacentPost.previous && (  // Rendering the previous post if it exists
            <div className={`${adjacentPost.next ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'} adjacent-post rounded-lg relative h-72`}>
              <AdjacentPostCard post={adjacentPost.previous} position="LEFT" />  {/* Displaying the previous post */}
            </div>
          )}
          {adjacentPost.next && (  // Rendering the next post if it exists
            <div className={`${adjacentPost.previous ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'} adjacent-post rounded-lg relative h-72`}>
              <AdjacentPostCard post={adjacentPost.next} position="RIGHT" />  {/* Displaying the next post */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdjacentPosts;
