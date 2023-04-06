import Container from "components/container";
import Meta from "components/meta";
import Posts from "components/posts";
import { eyecatchLocal } from "lib/constant";
import Hero from "components/hero";
import { getAllPosts } from "lib/api";
import { getPlaiceholder } from "plaiceholder";

export default function Blog({ posts }) {
  return (
    <>
      <Container>
        <Meta pageTitle="Blog" pageDesc="ブログの記事一覧" />
        <Hero title="Blog" subtitle="Recent Posts" />
        <Posts posts={posts} />
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts();
  for (const post of posts) {
    if (!post.hasOwnProperty("eyecatch")) {
      post.eyecatch = eyecatchLocal;
    }
    const { base64 } = await getPlaiceholder(post.eyecatch.url);
    post.eyecatch.blurDataUrl = base64;
  }

    return {
      props: {
        posts: posts,
      },
    };
  }
