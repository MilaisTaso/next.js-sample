import { getAllPosts } from "lib/api";
import Container from "components/container";
import Meta from "components/meta";
import Hero from "components/hero";
import { getPlaiceholder } from "plaiceholder";
import { eyecatchLocal } from "lib/constant";
import Pagination from "@/components/pagination";
import Posts from "@/components/posts";

export default function Home({ posts }) {
  return (
    <>
      <Container>
        <Meta />
        <Hero title="CURE" subtitle="アウトプットしてくサイト" imageOn />
        <Posts posts={posts} />
        <Pagination nextUrl="/blog" nextText="More Posts" />
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts(4);
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
