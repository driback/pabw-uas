"use client";

import { QueryClientProvider, QueryClient } from "react-query";
import "../style/style.scss";
import "@fontsource/plus-jakarta-sans";
import CarsNavigation from "@/components/Navigation";

export default function RootLayout({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: true,
        retry: false,
        staleTime: 1000 * 60 * 60 * 24,
      },
    },
  });

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <header>
          <CarsNavigation />
        </header>
        <QueryClientProvider client={queryClient}>
          <main>{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
