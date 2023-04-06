import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "components/layout";
import "styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import * as gtag from "lib/gtag";
import Script from "next/script";
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('js', new Date());

      gtag('config', '${gtag.GA_MEASUREMENT_ID}');
      `,
        }}
      />
      <Layout>
        { getLayout(<Component {...pageProps} />)}
      </Layout>
    </>
  );
}
