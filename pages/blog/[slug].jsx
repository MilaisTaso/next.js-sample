import Image from "next/image";
import Container from "components/container";
import PostHeader from "components/post-header";
import { getPostBySlug, getAllSlugs } from "lib/api";
import PostBody from "components/post-body";
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from "components/two-column";
import ConvertBody from "components/convert-body";
import PostCategories from "components/post-categories";
import { extractText } from "lib/extract-text";
import Meta from "@/components/meta";
import { eyecatchLocal } from "lib/constant";
import { getPlaiceholder } from "plaiceholder";
import { prevNextPost } from "lib/prev-next-post";
import Pagination from "components/pagination";

export default function Post({
  title,
  publish,
  content,
  eyecatch,
  categories,
  description,
  prevPost,
  nextPost,
}) {
  return (
    <Container>
      <Meta
        pageTitle={title}
        pageDesc={description}
        pageImg={eyecatch.url}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <article>
        <PostHeader title={title} subtitle="Blog Article" publish={publish} />
        <figure>
          <Image
            src={eyecatch.url}
            alt="アイキャッチ画像"
            width={eyecatch.width}
            height={eyecatch.height}
            sizes="(min-width: 1152px) 1152, 100vw"
            style={{ width: "100%", height: "auto" }}
            priority
            placeholder="blur"
            blurDataURL={eyecatch.blurDataURL}
          />
        </figure>
        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <ConvertBody contentHTML={content} />
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <PostCategories categories={categories} />
          </TwoColumnSidebar>
        </TwoColumn>
        <Pagination
          prevText={prevPost.title}
          prevUrl={`/blog/${prevPost.slug}`}
          nextText={nextPost.title}
          nextUrl={`/blog/${nextPost.slug}`}
        />
      </article>
    </Container>
  );
}

export async function getStaticPaths() {
  const allSlugs = await getAllSlugs(5);
  return {
    paths: allSlugs.map(({ slug }) => `/blog/${slug}`),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const post = await getPostBySlug(slug);
  // if (!post) return { notFound: true };
  if (!post) {
    return {
      notFound: true,
    };
  } else {
    const description = extractText(post.content);
    const eyecatach = post.eyecatch ?? eyecatchLocal;
    const { base64 } = await getPlaiceholder(eyecatach.url);
    eyecatach.blurDataURL = base64;
    const allSlugs = await getAllSlugs();
    const [prevPost, nextPost] = prevNextPost(allSlugs, slug);

    return {
      props: {
        title: post.title,
        publish: post.publishDate,
        content: post.content,
        eyecatch: eyecatach,
        categories: post.categories,
        description: description,
        prevPost: prevPost,
        nextPost: nextPost,
      },
    };
  }
}
