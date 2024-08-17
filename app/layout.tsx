import { Inter } from "next/font/google";
import { ConvexClientProvider } from "@/services/providers/convex-provider";
import { Toaster } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";
import type { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });
import { UserProvider } from "@/context/UserContext";
import "./globals.css";
import { QueryProvider } from "@/lib/react-query/QueryProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://strive-platform.vercel.app/"),
  title: "Strive - Template Platform",
  description:
    "The platform provides free and paid templates with beautiful designs, updated every day for everyone from beginners to experienced people. Developed and built by Tran Thien Duc.",
  keywords: "tranthienduc, strive-platform, template-platform",
  applicationName: "Strive",
  openGraph: {
    title: "Strive - Template Platform",
    description:
      "The platform provides free and paid templates with beautiful design",
    images: ["/assets/images/bg-dashboard.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={inter.className}>
        <ConvexClientProvider>
          <QueryProvider>
            <EdgeStoreProvider>
              <UserProvider>
                <main className="relative">
                  <Toaster position="bottom-right" />
                  {children}
                </main>
              </UserProvider>
            </EdgeStoreProvider>
          </QueryProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
