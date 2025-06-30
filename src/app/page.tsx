'use client';

import { gql, useQuery } from '@apollo/client';
import client from '@/lib/apolloClient';
import Link from 'next/link';


const GET_POSTS = gql`
  query GetPosts {
    posts {
      nodes {
        id
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;



export default function HomePage() {
  const { loading, error, data } = useQuery(GET_POSTS, { client });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Articles WordPress</h1>
      <ul className="space-y-4">
    
{data.posts.nodes.map((post: any) => (
  <li key={post.id} className="mb-8">
    {post.featuredImage?.node?.sourceUrl && (
      <img
        src={post.featuredImage.node.sourceUrl}
        alt={post.title}
        className="w-full h-auto mb-2 rounded"
      />
    )}
    <Link href={`/article/${post.slug}`}>
      <h2 className="text-xl font-bold hover:underline">{post.title}</h2>
    </Link>
    <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
  </li>
))}

      </ul>
    </div>
  );
}
