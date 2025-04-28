import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '../services';

const Header = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    loadCategories();
  }, []);

  return (
    <header className="container mx-auto px-10 mb-8">
      <div className="w-full border-b border-blue-400 py-8 inline-block">
        {/* Website Title / Logo */}
        <div className="block md:float-left">
          <Link href="/" passHref>
            <span className="text-4xl font-bold text-white cursor-pointer">
              Graph CMS
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex md:float-left">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`} passHref>
              <span className="mt-2 ml-4 font-semibold text-white cursor-pointer md:float-right align-middle hover:text-blue-200 transition-colors duration-200">
                {category.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
