import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { getCategories } from '../services';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch category data when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryList = await getCategories();
        setCategories(categoryList);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl font-semibold border-b pb-4 mb-8 text-gray-800">
        Browse Categories
      </h3>

      {isLoading ? (
        <p className="text-gray-500 text-center">Loading categories...</p>
      ) : categories.length > 0 ? (
        categories.map((category, index) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            passHref
          >
            <span
              className={`block pb-3 mb-3 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                index === categories.length - 1 ? 'border-b-0' : 'border-b'
              }`}
              aria-label={`Navigate to ${category.name} category`}
            >
              {category.name}
            </span>
          </Link>
        ))
      ) : (
        <p className="text-gray-500 text-center">No categories found.</p>
      )}
    </div>
  );
};

export default Categories;
