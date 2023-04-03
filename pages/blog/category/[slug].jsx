import { getAllCatalogs } from "lib/api";
import Container from "components/container";
import PostHeader from "@/components/post-header";

export default function Category({ name }) {
  return (
    <Container>
      <PostHeader title={name} subtitle="Blog Category" />
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

  return {
    props: {
      name: cat.name,
    },
  };
}

