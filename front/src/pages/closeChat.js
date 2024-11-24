import api from "@/axiosConfig";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

const CloseChat = () => {
  const router = useRouter();

  useEffect(() => {
    const concludeChat = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/dashboard");
          return;
        }

        if (localStorage.getItem("sessionSlug")) {
          await api.patch("/agent-collector/conclude-collect");
          console.log("Sessão encerrada com sucesso.");
        }
      } catch (error) {
        console.error("Erro ao encerrar a sessão:", error);
      } finally {
        router.push("/dashboard"); // Redireciona para o dashboard após finalizar
      }
    };

    concludeChat();
  }, [router]); // Adiciona `router` como dependência

  return <div>Encerrando o chat...</div>; // Opcionalmente, pode exibir uma mensagem ou spinner
};

export default CloseChat;
