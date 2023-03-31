import Image from "next/image";
import Container from "components/container";
import PostHeader from "components/post-header";
import { getPostBySlug } from "lib/api";
import PostBody from "components/post-body";
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from "components/two-column";
import ConvertBody from "components/convert-body";

export default function Schedule({
  title,
  publish,
  content,
  eyecatch,
  categories,
}) {
  return (
    <Container>
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
          />
        </figure>
        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <ConvertBody contentHTML={content} />
              {/* <div dangerouslySetInnerHTML={{__html: content}}></div> */}
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar></TwoColumnSidebar>
        </TwoColumn>
      </article>
    </Container>
  );
}

export async function getStaticProps() {
  const slug = "schedule";
  const post = await getPostBySlug(slug);

  return {
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      eyecatch: post.eyecatch,
      categories: post.categories,
    },
  };
}
