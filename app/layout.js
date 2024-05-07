import Header from "@/components/Client/Header";
import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white h-full">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
