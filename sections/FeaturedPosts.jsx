import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { FeaturedPostCard } from '../components';
import { getFeaturedPosts } from '../services';

// Carousel breakpoints
const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  tablet: { breakpoint: { max: 768, min: 640 }, items: 2 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

const FeaturedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [ready, setReady] = useState(false);

  // Fetch featured posts once on mount
  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getFeaturedPosts();
      setPosts(result);
      setReady(true);
    };
    fetchPosts();
  }, []);

  // Custom arrows
  const Arrow = ({ direction }) => (
    <div
      className={`absolute arrow-btn ${direction === 'left' ? 'left-0' : 'right-0'} 
                  text-center py-3 cursor-pointer bg-pink-600 rounded-full`}
    >
      {direction === 'left' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      )}
    </div>
  );

  return (
    <div className="mb-8">
      <Carousel
        infinite
        responsive={responsive}
        customLeftArrow={<Arrow direction="left" />}
        customRightArrow={<Arrow direction="right" />}
        itemClass="px-4"
      >
        {ready &&
          posts.map((post, i) => <FeaturedPostCard key={i} post={post} />)}
      </Carousel>
    </div>
  );
};

export default FeaturedPosts;
