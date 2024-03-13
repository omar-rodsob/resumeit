
import type { Metadata } from "next";
import { GFS_Didot } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = GFS_Didot({ subsets: ["greek"],weight:"400" });



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
      <body className={inter.className}>
        <GoogleAnalytics gaId="G-ZHSC7D36W8" />
        {children}
        </body>
    </html>
  );
}
