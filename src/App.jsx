import React, { useState, useEffect, useRef } from "react";

// --- Utility Components ---

const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Sections ---

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
          <img
            src="/images/logo.jpg"
            alt="Pôr do Sol"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-between h-5 w-8 z-50 focus:outline-none group"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span
            className={`h-0.5 w-full bg-current rounded transition-all duration-300 ${
              isMobileMenuOpen
                ? "rotate-45 translate-y-2.5 bg-dark"
                : isScrolled
                ? "bg-dark"
                : "bg-white"
            }`}
          ></span>
          <span
            className={`h-0.5 w-full bg-current rounded transition-all duration-300 ${
              isMobileMenuOpen
                ? "opacity-0"
                : isScrolled
                ? "bg-dark"
                : "bg-white"
            }`}
          ></span>
          <span
            className={`h-0.5 w-full bg-current rounded transition-all duration-300 ${
              isMobileMenuOpen
                ? "-rotate-45 -translate-y-2.5 bg-dark"
                : isScrolled
                ? "bg-dark"
                : "bg-white"
            }`}
          ></span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            {[
              "Início",
              "Experiência",
              "Menu",
              "Eventos",
              "Galeria",
              "Localização",
            ].map((item) => (
              <li key={item}>
                <a
                  href={`#${item
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")}`}
                  className={`text-sm uppercase tracking-widest font-medium transition-colors hover:text-primary ${
                    isScrolled ? "text-dark" : "text-white"
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://wa.me/244926472133"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-2 rounded-full border text-sm font-semibold uppercase tracking-wider transition-all hover:scale-105 ${
              isScrolled
                ? "border-primary text-primary hover:bg-primary hover:text-white"
                : "border-white text-white hover:bg-white hover:text-primary"
            }`}
          >
            Reservar
          </a>
        </nav>

        {/* Mobile Nav Overlay */}
        <div
          className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-transform duration-500 ease-in-out md:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col items-center gap-8 mb-8">
            {[
              "Início",
              "Experiência",
              "Menu",
              "Eventos",
              "Galeria",
              "Localização",
            ].map((item) => (
              <li key={item}>
                <a
                  href={`#${item
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")}`}
                  className="text-2xl font-heading font-medium text-dark hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://wa.me/244926472133"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-primary text-white rounded-full font-bold uppercase tracking-widest shadow-lg hover:bg-primary-dark transition-colors"
          >
            Reservar Agora
          </a>
        </div>
      </div>
    </header>
  );
};

const Hero = () => (
  <section
    id="inicio"
    className="relative h-screen flex items-center justify-center text-center overflow-hidden"
  >
    {/* Background Parallax simulated via fixed bg attachment in config or here */}
    <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-fixed z-0"></div>

    <div className="container mx-auto px-6 relative z-10">
      <RevealOnScroll>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 leading-tight drop-shadow-lg">
          Pôr do Sol
        </h1>
        <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md">
          Uma experiência gastronómica única à beira-mar em Luanda.{" "}
          <br className="hidden md:block" />
          Onde a boa gastronomia encontra o pôr do sol perfeito.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <a
            href="https://wa.me/244926472133"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-primary text-white rounded-full font-semibold uppercase tracking-widest shadow-xl hover:bg-primary-dark hover:-translate-y-1 transition-all w-full md:w-auto"
          >
            Reservar Mesa
          </a>
          <a
            href="#experiencia"
            className="px-8 py-4 bg-transparent border border-white text-white rounded-full font-semibold uppercase tracking-widest hover:bg-white hover:text-primary hover:-translate-y-1 transition-all w-full md:w-auto"
          >
            Explorar
          </a>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

const Experience = () => (
  <section id="experiencia" className="py-20 md:py-32 bg-light">
    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <RevealOnScroll>
          <span className="text-primary font-semibold uppercase tracking-[0.2em] text-sm">
            Nossa Essência
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark mt-2 mb-6">
            Mais que um restaurante
          </h2>
          <p className="text-text leading-relaxed">
            O <strong className="text-primary">Pôr do Sol</strong> é um espaço
            projetado para despertar os sentidos. Do som das ondas à brisa do
            mar, cada detalhe é pensado para proporcionar momentos de puro
            relaxamento e prazer.
          </p>
          <p className="text-text leading-relaxed">
            Seja um almoço de negócios que se estende até ao entardecer ou um
            jantar romântico sob as estrelas, aqui o tempo para.
          </p>
        </RevealOnScroll>
      </div>
      <div className="relative">
        <RevealOnScroll delay={200}>
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <img
              src="/images/seafood.jpg"
              alt="Experiência Pôr do Sol"
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full -z-10 blur-xl"></div>
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

const Gastronomy = () => (
  <section id="menu" className="py-20 md:py-32 bg-white">
    <div className="container mx-auto px-6">
      <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-primary font-semibold uppercase tracking-[0.2em] text-sm">
          Sabores do Mar
        </span>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark mt-2">
          Nossa Gastronomia
        </h2>
      </RevealOnScroll>

      {/* Horizontal Scroll Menu for Mobile, Grid for Desktop */}
      <div className="flex overflow-x-auto pb-8 -mx-6 px-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:overflow-visible gap-6 snap-x snap-mandatory">
        {[
          {
            title: "Entradas",
            items: [
              "Carpaccio de Polvo",
              "Camarão ao Alho",
              "Salada Pôr do Sol",
            ],
          },
          {
            title: "Marisco Fresco",
            items: ["Lagosta Grelhada", "Caranguejo Real", "Camarão Tigre"],
          },
          {
            title: "Carnes Premium",
            items: ["Bife do Lombo", "Costeletas de Borrego", "Picanha Angus"],
          },
          {
            title: "Sobremesas",
            items: ["Mousse de Maracujá", "Cheesecake", "Petit Gâteau"],
          },
        ].map((category, idx) => (
          <RevealOnScroll
            key={idx}
            delay={idx * 100}
            className="min-w-[280px] snap-center"
          >
            <div className="bg-light p-8 rounded-xl h-full border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-heading font-bold text-primary mb-6 border-b border-primary/20 pb-4">
                {category.title}
              </h3>
              <ul className="space-y-4">
                {category.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center text-dark hover:text-primary transition-colors cursor-default"
                  >
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="https://wa.me/244926472133"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-3 border-2 border-primary text-primary rounded-full font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300"
        >
          Ver Menu Completo
        </a>
      </div>
    </div>
  </section>
);

const Cocktails = () => (
  <section
    id="cocktails"
    className="relative py-24 bg-cocktail-pattern bg-cover bg-fixed bg-center text-white"
  >
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <RevealOnScroll className="order-2 md:order-1">
          <img
            src="https://c.pxhere.com/images/4b/0a/a7ce8e47b38a62161f14bb46adcd-1699564.jpg!d"
            alt="Signature Cocktails"
            className="rounded-lg shadow-2xl border-l-4 border-secondary transform md:rotate-2 hover:rotate-0 transition-all duration-500"
          />
        </RevealOnScroll>
        <div className="order-1 md:order-2 space-y-6">
          <RevealOnScroll>
            <span className="text-secondary font-semibold uppercase tracking-[0.2em] text-sm">
              Bar & Lounge
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mt-2">
              Arte em Cocktails
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Nossos mixologistas criam bebidas exclusivas para acompanhar a
              beleza do pôr do sol. Sabores tropicais, clássicos reinventados e
              uma carta de vinhos selecionada para os paladares mais exigentes.
            </p>
            <div className="pt-4">
              <a
                href="#galeria"
                className="text-secondary border-b border-secondary pb-1 hover:text-white hover:border-white transition-all"
              >
                Ver Nossa Carta
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  </section>
);

const Events = () => (
  <section id="eventos" className="py-20 md:py-32 bg-light">
    <div className="container mx-auto px-6 text-center">
      <RevealOnScroll>
        <span className="text-primary font-semibold uppercase tracking-[0.2em] text-sm">
          Momentos Especiais
        </span>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark mt-2 mb-6">
          Celebre Conosco
        </h2>
        <p className="text-text max-w-2xl mx-auto mb-16">
          O cenário ideal para aniversários, encontros românticos e eventos
          corporativos. Criamos memórias inesquecíveis.
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { img: "/images/food1.jpg", title: "Jantares Românticos" },
          { img: "/images/hero.jpg", title: "Eventos Corporativos" },
          { img: "/images/seafood.jpg", title: "Aniversários" },
        ].map((item, index) => (
          <RevealOnScroll
            key={index}
            delay={index * 150}
            className="group relative overflow-hidden rounded-xl h-80 cursor-pointer"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
              <h3 className="text-white text-xl font-bold font-heading">
                {item.title}
              </h3>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

const Location = () => (
  <section id="localizacao" className="py-20 bg-darker text-white">
    <div className="container mx-auto px-6 text-center">
      <RevealOnScroll>
        <span className="text-secondary font-semibold uppercase tracking-[0.2em] text-sm">
          Visite-nos
        </span>
        <h2 className="text-4xl md:text-5xl font-heading font-bold mt-2 mb-8">
          Localização Privilegiada
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
          Localizado na Ilha de Luanda, junto à praia, o Pôr do Sol oferece o
          ambiente perfeito para relaxar e aproveitar cada momento.
        </p>
        <a
          href="https://maps.app.goo.gl/j6bj784bCTEttRAL7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-neutral-600 gap-2 px-8 py-3 bg-transparent border border-gray-600 rounded-full hover:border-primary hover:text-primary transition-all"
        >
          Ver no Google Maps
        </a>
      </RevealOnScroll>
    </div>
  </section>
);

const CtaFinal = () => (
  <section className="relative py-32 text-center text-white bg-cta-pattern bg-cover bg-center bg-fixed">
    <div className="absolute inset-0 bg-black/50 z-0"></div>
    <div className="container mx-auto px-6 relative z-10">
      <RevealOnScroll>
        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
          Viva o pôr do sol. <br /> Viva a experiência.
        </h2>
        <p className="text-xl text-gray-200 mb-10 font-light">
          A sua mesa à beira-mar está à espera.
        </p>
        <a
          href="https://wa.me/244926472133"
          target="_blank"
          rel="noopener noreferrer"
          className="px-10 py-5 bg-[#25D366] text-white rounded-full font-bold uppercase tracking-widest shadow-lg hover:bg-[#1faa51] hover:-translate-y-1 transition-all inline-flex items-center gap-2"
        >
         Reservar via WhatsApp
        </a>
      </RevealOnScroll>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-darker text-white py-16 border-t border-gray-800">
    <div className="container mx-auto px-6 flex flex-col items-center">
      <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-2 border-gray-700">
        <img
          src="/images/logo.jpg"
          alt="Pôr do Sol Logo"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex gap-8 mb-8">
        <a
          href="https://www.instagram.com/pordosol_luanda/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-primary transition-colors text-sm uppercase tracking-widest"
        >
          Instagram
        </a>
        <a
          href="https://wa.me/244926472133"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-green-500 transition-colors text-sm uppercase tracking-widest"
        >
          WhatsApp
        </a>
      </div>
      <p className="text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Restaurante Pôr do Sol. Todos os
        direitos reservados.
      </p>
    </div>
  </footer>
);

// --- Main App Component ---

function App() {
  return (
    <div className="font-body text-text bg-white overflow-x-hidden selection:bg-primary selection:text-white">
      <Header />
      <main>
        <Hero />
        <Experience />
        <Gastronomy />
        <Cocktails />
        <Events />
        <Location />
        <CtaFinal />
      </main>
      <Footer />

      {/* Floating Action Button for Mobile */}
      <a
        href="https://wa.me/244926472133"
        className="md:hidden fixed bottom-8 right-6 z-50 p-4 bg-[#25D366] hover:bg-[#1faa51] text-white rounded-full shadow-2xl transition-transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Reservar no WhatsApp"
      >
        <span className="text-2xl">💬</span>
      </a>
    </div>
  );
}

export default App;
