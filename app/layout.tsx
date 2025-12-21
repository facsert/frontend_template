import "./globals.css";

import { Toaster } from "sonner"
import { ThemeProvider } from "next-themes"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en h-screen w-screen" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="h-screen w-screen">
            {children}
            <Toaster position="top-center" richColors closeButton />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
