import { Inter } from "next/font/google";
import { ConvexClientProvider } from "@/services/providers/convex-provider";
import { ModalProvider } from "@/services/providers/modal-provider";
import { Toaster } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";
import type { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css";

export const metadata: Metadata = {
  title: "Strive - Template Platform",
  description: "SasS Platform",
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
          <EdgeStoreProvider>
            <main className="relative">
              <ModalProvider />
              <Toaster position="bottom-right" />
              {children}
            </main>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
