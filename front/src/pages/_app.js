import "@/styles/globals.css";
import { Inter, Syne } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});
export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const validateToken = async () => {
      // Apenas para rotas que começam com /dashboard
      if (
        // router.pathname.startsWith("/dashboard") ||
        router.pathname.startsWith("/chat")
      ) {
        const token = localStorage.getItem("token");

        // Se o token não existir, redireciona para login
        if (!token) {
          router.push("/signIn");
          return;
        }

        // try {
        //   await axios.post(process.env.backend + "/api/validate-token", null, {
        //     headers: { Authorization: `Bearer ${token}` },
        //   });
        // } catch (error) {
        //   console.error("Erro na validação do token:", error);

        //   localStorage.removeItem("authToken");

        //   router.push("/signIn");
        // }
      }
    };

    validateToken();
  }, [router]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <main
        className={`${display.variable} ${body.variable} flex min-h-screen flex-col font-body text-base-600 dark:text-base-500 bg-base-50 dark:bg-base-950`}
      >
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}
