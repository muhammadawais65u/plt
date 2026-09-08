import "./globals.css";
import {
  Montserrat,
  Playfair_Display,
  Poppins,
  Cormorant_Garamond,
} from "next/font/google";
import localFont from "next/font/local";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const avenirNext = localFont({
  src: [
    {
      path: "../public/Avenir Next/WOFF2/Avenir Next Ultra Light.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/Avenir Next/WOFF2/Avenir Next Ultra Light Italic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/Avenir Next/WOFF2/Avenir Next Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/Avenir Next/WOFF2/Avenir Next Thin Italic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/Avenir Next/WOFF2/Avenir Next Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/Avenir Next/WOFF2/Avenir Next Light Italic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/Avenir Next/WOFF2/Avenir Next Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Avenir Next/WOFF2/Avenir Next Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/Avenir Next/WOFF2/Avenir Next Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/Avenir Next/WOFF2/Avenir Next Medium Italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/Avenir Next/WOFF2/Avenir Next Demi.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/Avenir Next/WOFF2/Avenir Next Demi Italic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/Avenir Next/WOFF2/Avenir Next Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/Avenir Next/WOFF2/Avenir Next Bold Italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/Avenir Next/WOFF2/Avenir Next Heavy.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/Avenir Next/WOFF2/Avenir Next Heavy Italic.woff2",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-avenir-next",
  display: "swap",
});

const pangram = localFont({
  src: [
    {
      path: "../public/Pangram-FullFamily-FreeForPersonalUse/Pangram-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/Pangram-FullFamily-FreeForPersonalUse/Pangram-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/Pangram-FullFamily-FreeForPersonalUse/Pangram-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Pangram-FullFamily-FreeForPersonalUse/Pangram-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/Pangram-FullFamily-FreeForPersonalUse/Pangram-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/Pangram-FullFamily-FreeForPersonalUse/Pangram-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/Pangram-FullFamily-FreeForPersonalUse/Pangram-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-pangram",
  display: "swap",
});

export const metadata = {
  title: "PLT Tower | Business Bay, Dubai — by PLT Properties",
  description:
    "A standard set in Europe, built in Dubai. Discover PLT Tower, Business Bay's new landmark residence by PLT Properties.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${playfair.variable} ${poppins.variable} ${cormorant.variable} ${avenirNext.variable} ${pangram.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full bg-[#0b0b0c] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}