import type { Metadata } from "next";
import { Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./containers/main-components/navbar";
import Footer from "./containers/main-components/footer";
import QualitySection from "./containers/main-components/quality-sec";
import Newsletter from "./containers/home-page/newsletter-sec";
import { CartProvider } from "./context/cartContext";
import { WishlistProvider } from "./context/wishlistContext";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

// Use next/font/google to optimize font loading

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Layers",
  description: "Make it Worth",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${manrope.variable} ${montserrat.variable} antialiased`}
        >
          <Navbar />
          <CartProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </CartProvider>
          <Toaster />
          <QualitySection />
          <Newsletter />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
