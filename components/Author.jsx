import React from 'react';
import Image from 'next/image';

import { grpahCMSImageLoader } from '../util';

const Author = ({ author }) => {
  return (
    <div className="relative mt-20 mb-8 p-12 rounded-lg bg-black bg-opacity-20 text-center">
      <div className="absolute -top-14 left-0 right-0 flex justify-center">
        <Image
          unoptimized
          loader={grpahCMSImageLoader}
          src={author.photo.url}
          alt={`Photo of ${author.name}`}
          width={100}
          height={100}
          className="rounded-full align-middle"
        />
      </div>
      <h3 className="mt-4 mb-4 text-xl font-bold text-white">
        {author.name}
      </h3>
      <p className="text-white text-ls">
        {author.bio}
      </p>
    </div>
  );
};

export default Author;
