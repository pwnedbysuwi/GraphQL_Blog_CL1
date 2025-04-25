import { request, gql } from 'graphql-request';  // Importing the necessary functions for making GraphQL requests

// Defining the GraphQL API endpoint URL, typically fetched from environment variables for better security
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// Fetching all posts from the GraphCMS API
export const fetchPosts = async () => {
  const query = gql`
    query GetPosts {
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
  const { postsConnection } = await request(graphqlAPI, query);
  return postsConnection.edges;
};

// Fetching all categories available in the system
export const fetchCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;
  const { categories } = await request(graphqlAPI, query);
  return categories;
};

// Fetching detailed information of a single post based on its slug
export const fetchPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
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
  const { post } = await request(graphqlAPI, query, { slug });
  return post;
};

// Fetching similar posts based on shared categories and excluding the current post by slug
export const fetchSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetSimilarPosts($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
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
  const { posts } = await request(graphqlAPI, query, { slug, categories });
  return posts;
};

// Fetching adjacent posts (next and previous) based on the creation date and excluding the current post
export const fetchAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
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
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
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
  const { next, previous } = await request(graphqlAPI, query, { slug, createdAt });
  return { next: next[0], previous: previous[0] };
};

// Fetching posts for a specific category based on its slug
export const fetchCategoryPosts = async (slug) => {
  const query = gql`
    query GetCategoryPosts($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
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
  const { postsConnection } = await request(graphqlAPI, query, { slug });
  return postsConnection.edges;
};

// Fetching featured posts marked as "featuredPost" from the GraphCMS API
export const fetchFeaturedPosts = async () => {
  const query = gql`
    query GetFeaturedPosts {
      posts(where: { featuredPost: true }) {
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
  const { posts } = await request(graphqlAPI, query);
  return posts;
};

// Submitting a comment to the backend API
export const postComment = async (commentData) => {
  const response = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),
  });
  return response.json();
};

// Fetching comments associated with a specific post based on its slug
export const fetchComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;
  const { comments } = await request(graphqlAPI, query, { slug });
  return comments;
};

// Fetching the most recent posts ordered by creation date
export const fetchRecentPosts = async () => {
  const query = gql`
    query GetRecentPosts {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const { posts } = await request(graphqlAPI, query);
  return posts;
};
