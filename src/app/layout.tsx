import type { Metadata } from 'next';
import { Inter, Saira } from 'next/font/google';
import StyledComponentsRegistry from './lib/registry';
import { Providers } from './providers';
import Header from '@/components/Header';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // opcional, caso queira usar variável CSS
});

const saira = Saira({
  subsets: ["latin"],
  variable: "--font-saira",
})

export const metadata: Metadata = {
  title: 'InsanyShop',
  description: 'O lugar onde você encontra tudo que precisa para o seu dia a dia',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning className={`${inter.className} ${saira.className}`}>
        <StyledComponentsRegistry>
          <Providers>
            <Header />
            {children}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
