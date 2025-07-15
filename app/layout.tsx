import { Oswald, Sora } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const oswald = Oswald({
  variable: "--oswald",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--sora",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.className} ${oswald.className}  antialiased bg-[#040B11]`}
        suppressHydrationWarning
      >
        <Navigation />
          {children}
        <Footer />
      </body>
    </html>
  );
}
