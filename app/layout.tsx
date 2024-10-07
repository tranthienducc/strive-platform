import { Inter } from "next/font/google";
import { ConvexClientProvider } from "@/services/providers/convex-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import type { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });
import { UserProvider } from "@/context/UserContext";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Wrapper from "@/components/Wrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.strive-platform.xyz/"),
  title: "Strive - Template Platform",
  description:
    "The platform provides free and paid templates with beautiful designs, updated every day for everyone from beginners to experienced people. Developed and built by Tran Thien Duc.",
  keywords: "tranthienduc, strive-platform, template-platform, strive",
  applicationName: "Strive",
  openGraph: {
    title: "Strive",
    description:
      "The platform provides free and paid templates with beautiful design",
    images: ["/assets/images/dashboard-img.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <html lang="en" className="h-full scroll-smooth">
          <body className={inter.className}>
            <EdgeStoreProvider>
              <UserProvider>
                <Wrapper>{children}</Wrapper>
              </UserProvider>
            </EdgeStoreProvider>
          </body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
