import React, { useRef, useEffect } from "react";
import { Header, HeroSection } from "../components/sections";
import { useChat } from "ai/react";
import { Chat } from "@/components/ui/chat";
import { header } from "@/data";
import axios from "axios";

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

  async function handleSubmitCustom(message) {
    try {
      append({
        id: Math.random()
          .toString(36)
          .substring(2, 2 + 10),
        content: message,
        role: "user",
      });
      const response = await axios.post("/api/chat", { message });
      append(response.data);
      handleInputChange({ target: { value: "" } });
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
