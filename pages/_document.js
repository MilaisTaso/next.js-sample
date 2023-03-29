import { Html, Head, Main, NextScript } from 'next/document'
import { siteMeta } from 'lib/constant'
const { siteLong} = siteMeta

export default function Document() {
  return (
    <Html lang={siteLong}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
