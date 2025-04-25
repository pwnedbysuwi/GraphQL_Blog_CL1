import React, { useState, useEffect } from 'react';  // Importing necessary React hooks
import Carousel from 'react-multi-carousel';  // Importing the carousel component for displaying posts in a slider
import 'react-multi-carousel/lib/styles.css';  // Importing carousel styles

import { FeaturedPostCard } from '../components';  // Importing the FeaturedPostCard component for rendering each post
import { getFeaturedPosts } from '../services';  // Importing the service to fetch featured posts

// Defining the responsive breakpoints for the carousel's layout
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,  // Display 5 items on large screens
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,  // Display 3 items on medium screens
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,  // Display 2 items on tablet-sized screens
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,  // Display 1 item on mobile screens
  },
};

const FeaturedPosts = () => {
  // State to hold the featured posts data and loading status
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Fetching featured posts when the component mounts
  useEffect(() => {
    getFeaturedPosts().then((result) => {
      // Storing the fetched featured posts data in state
      setFeaturedPosts(result);
      setDataLoaded(true);  // Marking the data as loaded
    });
  }, []);  // Empty dependency array means this effect runs once on mount

  // Custom left arrow for the carousel
  const customLeftArrow = (
    <div className="absolute arrow-btn left-0 text-center py-3 cursor-pointer bg-pink-600 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </div>
  );

  // Custom right arrow for the carousel
  const customRightArrow = (
    <div className="absolute arrow-btn right-0 text-center py-3 cursor-pointer bg-pink-600 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  );

  return (
    <div className="mb-8">
      {/* Rendering the carousel with custom arrows and responsive design */}
      <Carousel 
        infinite  // Infinite loop of carousel items
        customLeftArrow={customLeftArrow}  // Custom left arrow for the carousel
        customRightArrow={customRightArrow}  // Custom right arrow for the carousel
        responsive={responsive}  // Setting the responsive breakpoints
        itemClass="px-4"  // Padding for each carousel item
      >
        {dataLoaded && featuredPosts.map((post, index) => (
          // Rendering each featured post inside the carousel
          <FeaturedPostCard key={index} post={post} />
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedPosts;
