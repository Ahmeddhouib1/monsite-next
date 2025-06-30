// @ts-nocheck ✅ Ignore tous les types dans ce fichier (temporairement)

import { gql } from '@apollo/client';
import client from '@/lib/apolloClient';

const GET_POST = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

export default function Page({ params }) {
  return <PostContent slug={params.slug} />;
}

async function PostContent({ slug }) {
  const { data } = await client.query({
    query: GET_POST,
    variables: { slug },
  });

  const post = data.post;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.featuredImage?.node?.sourceUrl && (
        <img
          src={post.featuredImage.node.sourceUrl}
          alt={post.title}
          className="w-full h-auto mb-4"
        />
      )}
      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        className="prose prose-invert"
      />
    </div>
  );
}
