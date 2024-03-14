
import type { Metadata } from "next";
import { GFS_Didot } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = GFS_Didot({ subsets: ["greek"],weight:"400" });
import Script from "next/script"
import * as gtag from "./tools/gtag"
import { useRouter } from "next/router";
import { useEffect } from "react";


export const metadata: Metadata = {
  title: "Omar Rodriguez Soberanes",
  description: "Omar Rodriguez Resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <body className={inter.className}>
        {/*<GoogleAnalytics gaId="G-ZHSC7D36W8" />*/}
        {children}
        </body>
    </html>
  );
}
