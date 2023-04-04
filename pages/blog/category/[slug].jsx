import { getAllCatalogs, getAllPostsByCategory } from "lib/api";
import Container from "components/container";
import Posts from "components/posts";
import PostHeader from "components/post-header";
import { getPlaiceholder } from "plaiceholder";
import { eyecatchLocal } from "lib/constant";
import Meta from "components/meta";

export default function Category({ name, posts }) {
  return (
    <Container>
      <Meta pageTitle={name} pageDescription={`${name}に関する記事`} />
      <PostHeader title={name} subtitle="Blog Category" />
      <Posts posts={posts}/>
    </Container>
  );
}

export async function getStaticPaths() {
  const allCats = await getAllCatalogs();
  return {
    paths: allCats.map(({ slug }) => `/blog/category/${slug}`),
    fallback: false,
  };
}

export async function getStaticProps(content) {
  const catSlug = content.params.slug;
  const allCats = await getAllCatalogs();
  const cat = allCats.find(({ slug }) => slug === catSlug);

  const posts = await getAllPostsByCategory(cat.id);
  for (const post of posts) {
    if (!post.hasOwnProperty("eyecatch")) {
      post.eyecatch = eyecatchLocal;
    }
    const { base64 } = await getPlaiceholder(post.eyecatch.url);
    post.eyecatch.blurDataUrl = base64;
  }

  return {
    props: {
      name: cat.name,
      posts: posts,
    },
  };
}
