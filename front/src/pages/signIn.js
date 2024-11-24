import axios from "axios";
import React from "react";
import { Header } from "../components/sections";
import { header } from "@/data";
import { useRouter } from "next/router";

const signIn = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  const router = useRouter();

  const url = process.env.backend + "/auth/login";

  async function submit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(url, {
        email: email,
        password: password,
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        router.push("/chat");
      }
    } catch (error) {
      localStorage.removeItem("token");
      console.log(error.message);
      setError("Falha ao efetuar login. Tente novamente.");
    }
  }

  return (
    <>
      <Header logo={header.logo} links={[]} buttons={header.buttons} />

      <div style={{ display: "flex", alignItems: "center", height: "100vh" }}>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Entrar!</h1>

            <p className="mt-4 text-gray-500">
              Tenha acesso aos melhores agentes de IA!
            </p>

            {error && <p className="mt-4 text-red-500">{error}</p>}
          </div>

          <form
            onSubmit={submit}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Seu email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>

              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Sua senha"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Não possui conta?
                <a className="underline" href="/signUp">
                  Criar
                </a>
              </p>

              <button
                type="submit"
                className="inline-block rounded-lg px-5 py-3 text-sm font-medium text-white"
                style={{ backgroundColor: "black" }}
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default signIn;
