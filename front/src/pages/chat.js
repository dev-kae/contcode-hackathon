import { Header, HeroSection } from "../components/sections";
import React from "react";

import { header } from "@/data";

const Chat = () => {
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
        title="Digite aqui abaixo:"
        description=""
        buttons={[]}
        OtherComponents={<h1>oi</h1>}
      >
        <div class="form-floating">
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea"
          ></textarea>
        </div>
      </HeroSection>
    </>
  );
};

export default Chat;
