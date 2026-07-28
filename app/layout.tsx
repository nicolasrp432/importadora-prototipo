import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { MotionProvider } from "@/components/providers/motion-provider";
import { VehicleStoreProvider } from "@/lib/vehicle-store";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["opsz"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eleven Motorworks — From Dubai. Driven worldwide.",
  description: "Importación de vehículos exclusivos desde Dubái, con el coste real por delante.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bricolage.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <VehicleStoreProvider>
          <Navbar />
          <MotionProvider>{children}</MotionProvider>
          <Footer />
        </VehicleStoreProvider>
      </body>
    </html>
  );
}
