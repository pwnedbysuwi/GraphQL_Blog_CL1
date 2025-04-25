import { request, gql } from 'graphql-request';  // Importing the necessary functions for making GraphQL requests

// Defining the GraphQL API endpoint URL, typically fetched from environment variables for better security
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// Fetching all posts from the GraphCMS API
export const getPosts = async () => {
  const query = gql`
    query FetchPosts {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  // Making a request to the GraphCMS API with the defined query
  const result = await request(graphqlAPI, query);

  // Returning the posts data, specifically the edges array which contains the individual posts
  return result.postsConnection.edges;
};

// Fetching all categories available in the system
export const getCategories = async () => {
  const query = gql`
    query FetchCategories {
      categories {
        name
        slug
      }
    }
  `;

  // Requesting categories data from the API
  const result = await request(graphqlAPI, query);

  // Returning the categories fetched from the GraphCMS API
  return result.categories;
};

// Fetching detailed information of a single post based on its slug
export const getPostDetails = async (slug) => {
  const query = gql`
    query FetchPostDetails($slug: String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  // Requesting post details with the provided slug
  const result = await request(graphqlAPI, query, { slug });

  // Returning the specific post details
  return result.post;
};

// Fetching similar posts based on shared categories and excluding the current post by slug
export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query FetchSimilarPosts($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  // Requesting similar posts from the API, excluding the current post and filtering by categories
  const result = await request(graphqlAPI, query, { slug, categories });

  // Returning the similar posts
  return result.posts;
};

// Fetching adjacent posts (next and previous) based on the creation date and excluding the current post
export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query FetchAdjacentPosts($createdAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous: posts(
        first: 1
        orderBy: createdAt_DESC
        where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  // Requesting the next and previous posts based on the creation date and the provided slug
  const result = await request(graphqlAPI, query, { slug, createdAt });

  // Returning both next and previous posts
  return { next: result.next[0], previous: result.previous[0] };
};

// Fetching posts for a specific category based on its slug
export const getCategoryPost = async (slug) => {
  const query = gql`
    query FetchCategoryPosts($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  // Requesting posts belonging to a specific category
  const result = await request(graphqlAPI, query, { slug });

  // Returning the posts under the given category
  return result.postsConnection.edges;
};

// Fetching featured posts marked as "featuredPost" from the GraphCMS API
export const getFeaturedPosts = async () => {
  const query = gql`
    query FetchFeaturedPosts {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }
  `;

  // Requesting featured posts from the GraphCMS API
  const result = await request(graphqlAPI, query);

  // Returning the featured posts
  return result.posts;
};

// Submitting a comment to the backend API
export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),  // Sending the comment data as a JSON string
  });

  // Returning the response from the API after converting it to JSON
  return result.json();
};

// Fetching comments associated with a specific post based on its slug
export const getComments = async (slug) => {
  const query = gql`
    query FetchComments($slug: String!) {
      comments(where: {post: {slug: $slug}}) {
        name
        createdAt
        comment
      }
    }
  `;

  // Requesting the comments associated with the given post
  const result = await request(graphqlAPI, query, { slug });

  // Returning the comments for the specified post
  return result.comments;
};

// Fetching the most recent posts ordered by creation date
export const getRecentPosts = async () => {
  const query = gql`
    query FetchRecentPosts {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  
  // Requesting the most recent posts from the API
  const result = await request(graphqlAPI, query);

  // Returning the recent posts
  return result.posts;
};
