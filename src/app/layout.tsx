import '~/app/globals.css';
import { Providers } from '~/app/providers';

export const metadata = {
  title: "DoItOrNot",
  description: "Stop overthinking. Just do it or not.",
  openGraph: {
    title: "DoItOrNot",
    description: "Ask anything. It decides your fate.",
    images: [
      {
        url: "https://doitornot.vercel.app/og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  other: {
    "fc:frame": '{"version":"next","imageUrl":"https://doitornot.vercel.app/og.png","button":{"title":"Start","action":{"type":"launch_miniapp","name":"DoItOrNot","url":"https://doitornot.vercel.app"}}}',
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
