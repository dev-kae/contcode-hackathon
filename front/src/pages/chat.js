import React, { useState } from "react";
import { Header, HeroSection } from "../components/sections";
import { header } from "@/data";
import { useChat } from "ai/react";
import { Chat } from "@/components/ui/chat";
import axios from "axios";
import api from "@/axiosConfig";

const ChatPage = () => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
    stop,
  } = useChat();

  const [chatClosed, setChatClosed] = useState(false);

  async function createSession() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      if (!localStorage.getItem("sessionSlug")) {
        const response = await api.post("/agent-collector/create-session");
        console.log(response);
        localStorage.setItem("sessionSlug", response.data.sessionSlug);
      }
    } catch (error) {}
  }

  async function handleSubmitCustom(message) {
    try {
      await createSession();

      if (!localStorage.getItem("sessionSlug")) {
        append({
          id: Math.random()
            .toString(36)
            .substring(2, 2 + 10),
          content:
            "Falha ao iniciar conversa, atualize a pagina e tente novamente",
          role: "assistant",
        });

        return;
      }

      append({
        id: Math.random()
          .toString(36)
          .substring(2, 2 + 10),
        content: message,
        role: "user",
      });

      handleInputChange({ target: { value: "" } });

      const response = await axios.post("/api/chat", {
        message: message,
        sessionSlug: localStorage.getItem("sessionSlug"),
        token: localStorage.getItem("token"),
      });
      append(response.data.message);

      if (response.data.collected) setChatClosed(true);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  return (
    <>
      <Header logo={header.logo} links={[]} buttons={header.buttons} />
      <HeroSection
        id="home"
        badge={{
          href: "#",
          icon: "tabler:arrow-right",
          label: "😻 Conte-nos sobre sua empresa",
        }}
        title="Escreva aqui abaixo:"
        description=""
        buttons={[]}
        style={{ justifyContent: "start" }}
      >
        <Chat
          chatClosed={chatClosed}
          messages={messages}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isGenerating={isLoading}
          handleSubmitCustom={handleSubmitCustom}
          stop={stop}
          append={append}
          suggestions={[]}
          style={{
            boxShadow: "-1px 8px 15px -12px rgba(66, 68, 90, 1)",
            borderRadius: "10px",
            border: "1px solid #F5F5F5",
            padding: "1rem",
          }}
        />
      </HeroSection>
    </>
  );
};

export default ChatPage;
