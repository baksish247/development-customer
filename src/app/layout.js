import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Menu/Header";
import CartProvider from "./redux/CartProvider";
import Button from "./OffersButton/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://customer.baksish.in"),
  title: {
    default: "Baksish | Table to Kitchen tech",
    template: "%s - CustomerBaksish",
  },
  alternates: {
    canonical: "https://www.customer.baksish.in",
  },
  description:
    "Efficient restaurant management system featuring scan and order, inventory control, billing, and analytics. Streamline operations effortlessly.",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <CartProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* <Button/> */}
          {children}</body>
      </html>
    </CartProvider>
  );
}
