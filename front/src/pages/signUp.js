import axios from "axios";
import React from "react";
import { Header } from "../components/sections";
import { header } from "@/data";
import { useRouter } from "next/router";
const signUp = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  const router = useRouter();

  const url = process.env.backend + "/auth/sign-up";

  async function submit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(url, {
        email: email,
        password: password,
        fullName: name,
      });

      if (response.status === 200) {
        router.push("/signIn");
      }
    } catch (error) {
      console.log(error.message);
      localStorage.removeItem("token");
      setError("Falha ao efetuar cadastro. Tente novamente");
    }
  }

  return (
    <>
      <Header logo={header.logo} links={[]} buttons={header.buttons} />

      <div style={{ display: "flex", alignItems: "center", height: "100vh" }}>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Criar conta!</h1>

            <p className="mt-4 text-gray-500">
              Tenha acesso aos melhores agentes de IA!
            </p>

            {error && (
              <p className="mt-4 text-red-500">
                {error && <p className="mt-4 text-red-500">{error}</p>}
              </p>
            )}
          </div>

          <form
            onSubmit={submit}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Nome
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Seu nome"
                  required
                />
              </div>
            </div>

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
                Possui conta?
                <a className="underline" href="/signIn">
                  Entrar
                </a>
              </p>

              <button
                type="submit"
                className="inline-block rounded-lg px-5 py-3 text-sm font-medium text-white"
                style={{ backgroundColor: "black" }}
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default signUp;
