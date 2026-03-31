import type { Metadata } from 'next';

import '~/app/globals.css';
import { Providers } from '~/app/providers';
import { APP_NAME, APP_DESCRIPTION } from '~/lib/constants';

export const metadata = {
  title: "DoItOrNot",
  description: "Stop overthinking. Just do it or not.",
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://doitornot.vercel.app/og.png",
    "fc:frame:button:1": "Open App",
    "fc:frame:post_url": "https://doitornot.vercel.app",
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
