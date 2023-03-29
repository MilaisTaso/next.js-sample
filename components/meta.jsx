import Head from "next/head";
import { useRouter } from "next/router";
import { siteMeta } from "lib/constant";
import siteImg from "images/ogp.jpg";
const { siteTitle, siteDesc, siteUrl, siteLocale, siteType, siteIcon } = siteMeta;

export default function Meta({ pageTitle, pageDesc, pageImg, pageImgW, pageImgH }) {
  // ページタイトルの設定
  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle

  // ページ説明
  const desc = pageDesc ?? siteDesc

  //ページのURL
  const router = useRouter()
  const url = `${siteUrl}${router.asPath}`

  //OGP画像
  const img = pageImg || siteImg.src
  const imgW = pageImgW || siteImg.width
  const imgH = pageImgH || siteImg.height
  const imgUrl = img.startsWith('https') ? img : `${siteUrl}${img}`

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={`${pageTitle} | ${siteTitle}`} />
      <meta name="description" content={desc} />
      <meta name="og:description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url}/>
      <link rel="icon" href={siteIcon} />
      <link rel="apple-touch-icon" href={siteIcon} />

      <meta property="og:image" content={imgUrl}/>
      <meta property="og:image:width" content={imgW}/>
      <meta property="og:image:height" content={imgH}/>
    </Head>
  );
}
