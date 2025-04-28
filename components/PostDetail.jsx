import React from 'react';
import moment from 'moment';

const PostDetail = ({ post }) => {
  const renderContentFragment = (index, text, obj, type) => {
    let formattedText = text;

    // Apply text styles if present
    if (obj) {
      if (obj.bold) {
        formattedText = (<b key={index}>{text}</b>);
      }
      if (obj.italic) {
        formattedText = (<em key={index}>{text}</em>);
      }
      if (obj.underline) {
        formattedText = (<u key={index}>{text}</u>);
      }
    }

    // Return content based on type
    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{formattedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{formattedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{formattedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return formattedText;
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        {/* Featured Image */}
        <div className="relative overflow-hidden shadow-md mb-6">
          <img
            src={post.featuredImage.url}
            alt=""
            className="object-top h-full w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
          />
        </div>

        {/* Post Details */}
        <div className="px-4 lg:px-0">
          {/* Author and Date */}
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
              <img
                alt={post.author.name}
                height="30px"
                width="30px"
                className="align-middle rounded-full"
                src={post.author.photo.url}
              />
              <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post.author.name}</p>
            </div>
            <div className="font-medium text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
            </div>
          </div>

          {/* Post Title */}
          <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>

          {/* Post Content */}
          {post.content.raw.children.map((typeObj, index) => {
            const contentChildren = typeObj.children.map((item, itemIndex) => renderContentFragment(itemIndex, item.text, item));

            return renderContentFragment(index, contentChildren, typeObj, typeObj.type);
          })}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
