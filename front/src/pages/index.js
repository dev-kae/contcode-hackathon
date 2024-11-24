import Head from "next/head";
import { FeatureSection } from "@/components/sections/FeatureSection";
import {
  Header,
  HeroSection,
  TestimonialSection,
  FaqSection,
  Footer,
  PricingSection,
  LargeFeatureSection,
  CtaSection,
} from "../components/sections";

import {
  header,
  faqs,
  testimonials,
  features,
  pricing,
  clients,
  footer,
} from "@/data";

export default function Home() {
  return (
    <>
      <Head>
        <title>WindMill</title>
      </Head>
      <Header logo={header.logo} links={[]} buttons={header.buttons} />
      <HeroSection
        id="home"
        badge={{
          href: "/",
          icon: "tabler:arrow-right",
          label: "😻 Aprenda Sobre as novidades",
        }}
        title="Transforme sua Ideia em uma Marca de Sucesso!"
        description="Com nossa plataforma, pequenos empreendedores têm acesso a ferramentas inteligentes de criação e gestão para levar seus negócios ao próximo nível."
        buttons={[
          {
            href: "/chat",
            label: "Comece Agora",
            color: "dark",
          },
          {
            href: "#",
            label: "Saiba mais",
            color: "transparent",
            variant: "link",
            icon: "tabler:arrow-right",
          },
        ]}
        image={{
          src: "/tablet-mockup.png",
          alt: "Product Screenshot on Tablet",
          className: "w-full h-auto",
        }}
        clientsLabel="Trusted by 100+ Brands"
        clients={clients}
      />
      <FeatureSection
        id="features"
        title="Descubra Nossas Funcionalidades Incríveis"
        description="Explore as poderosas ferramentas que nossa plataforma oferece. De automações inteligentes a insights personalizados, temos tudo o que você precisa para impulsionar sua marca."
        features={features}
      />
      <LargeFeatureSection
        title="Controle Seu Negócio"
        description="Monitore, analise e otimize sua marca com ferramentas inteligentes e fáceis de usar. Nossa plataforma coloca o poder dos dados e da automação nas suas mãos, para que você tome as melhores decisões e esteja sempre à frente."
        list={features.slice(0, 3)}
        image={{
          src: "/phone-mockup.png",
          alt: "Image",
          className:
            "w-full aspect-square object-contain rotate-6 hover:rotate-0 duration-300 ease-in-out",
        }}
      />
      <LargeFeatureSection
        reverse={true}
        title="Stay on top of your business"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis similique"
        list={features.slice(0, 3)}
        image={{
          src: "/phone-mockup.png",
          alt: "Image",
          className:
            "w-full aspect-square object-contain -rotate-6 hover:rotate-0 duration-300 ease-in-out",
        }}
      />
      <PricingSection
        id="pricing"
        title="Pricing for Everyone"
        description="Choose a plan that works for you. All plans include a 7-day free trial."
        badge={{
          leading: true,
          icon: "tabler:credit-card",
          label: "Plans",
        }}
        pricing={pricing}
      />
      <TestimonialSection
        id="testimonials"
        title="Love from our customers"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis similique
        veritatis"
        badge={{
          leading: true,
          icon: "tabler:heart",
          label: "TESTIMONIALS",
        }}
        testimonials={testimonials}
        button={{
          icon: "tabler:brand-x",
          label: "Share Your Feedback on",
          href: "#",
          color: "white",
        }}
      />
      <FaqSection
        id="faqs"
        title="Frequently Asked Questions"
        description="Here are some of our most frequently asked questions. If you have a question that isn't answered here, please feel free to contact us."
        buttons={[
          {
            label: "Contact Support",
            href: "#",
            color: "primary",
            variant: "link",
            icon: "tabler:arrow-right",
          },
        ]}
        faqs={faqs}
      />
      <CtaSection
        title="Ready to get started?"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis similique"
        buttons={[{ label: "Start for Free", href: "#", color: "dark" }]}
      />
      <Footer
        id="footer"
        copyright={footer.copyright}
        logo={footer.logo}
        social={footer.social}
        links={footer.links}
      />
    </>
  );
}
