import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Award, Users, Home as HomeIcon, Briefcase } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { TypeAnimation } from 'react-type-animation';

// Effect Components
import {
  FloatingParticles,
  MagneticText,
  GlowOrbs,
  AnimatedCounter
} from '../components/effects';

export const Home: React.FC = () => {
  const { projects, culturalProjects, siteContent } = useProjects();
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax effect for hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -10, transition: { duration: 0.3, ease: 'easeOut' } }
  };

  return (
    <div className="overflow-hidden bg-cosmos-dark">
      {/* Floating Particles Background */}
      <FloatingParticles particleCount={isMobile ? 10 : 30} />

      {/* ========== HERO SECTION ========== */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-cosmos-gradient" />

        {/* Radial Gradient Pulse */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(45, 27, 78, 0.8) 0%, transparent 70%)',
          }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Glow Orbs */}
        <GlowOrbs count={5} />

        {/* Hero Content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 container mx-auto px-6 text-center"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.span
              variants={fadeInUp}
              className="inline-block mb-8 px-6 py-2 glass rounded-full text-neon-aqua uppercase tracking-[0.3em] text-xs font-bold"
            >
              Arquitetura & Design
            </motion.span>

            {/* Main Title with Magnetic Effect */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light mb-8 leading-[1.1] text-text-light"
            >
              {isMobile ? (
                <span className="gradient-text-animated text-glow-lilac">
                  Projetando espaços para viver melhor
                </span>
              ) : (
                <MagneticText
                  text="Projetando espaços para viver melhor"
                  className="gradient-text-animated text-glow-lilac inline-block"
                  strength={20}
                />
              )}
            </motion.h1>

            {/* Typewriter Subtitle */}
            <motion.div variants={fadeInUp} className="mb-12">
              <TypeAnimation
                sequence={[
                  'Transformando sonhos em projetos únicos',
                  3000,
                  'Criando espaços que inspiram e acolhem',
                  3000,
                  'Arquitetura sensorial e atemporal',
                  3000,
                ]}
                wrapper="p"
                speed={50}
                className="text-lg md:text-xl lg:text-2xl text-text-muted font-light"
                repeat={Infinity}
              />
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={fadeInUp}>
              <Link
                to="/portfolio"
                className="group inline-flex items-center space-x-4 glass-card px-8 py-4 md:px-10 md:py-5 rounded-full 
                         border border-glass-border hover:border-neon-lilac
                         transition-all duration-300 btn-glow btn-ripple"
              >
                <span className="text-text-light font-medium tracking-wide text-base md:text-lg">
                  Explorar Projetos
                </span>
                <ArrowRight className="w-5 h-5 text-neon-aqua group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 border-2 border-text-muted/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-neon-aqua rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ========== FEATURED PROJECTS ========== */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-cosmos-dark via-cosmos-mid to-cosmos-dark">
        <div className="container mx-auto px-6 mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-3 text-text-light">
              Projetos <span className="gradient-text">Selecionados</span>
            </h2>
            <p className="text-text-muted text-base md:text-lg font-light">
              Projetos curados do nosso portfólio recente.
            </p>
          </motion.div>
          <Link
            to="/portfolio"
            className="animated-underline text-sm font-bold uppercase tracking-widest text-text-light hover:text-neon-aqua transition"
          >
            Ver Todos
          </Link>
        </div>

        {/* Horizontal Scroll Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex overflow-x-auto pb-6 space-x-6 md:space-x-8 px-6 md:px-20 lg:px-32 xl:px-40 obras-scroll snap-x snap-mandatory scroll-pl-6 md:scroll-pl-20"
        >
          {(projects.filter(p => p.featured).length > 0
            ? projects.filter(p => p.featured)
            : projects.slice(0, 5)
          ).map((project, index) => (
            <Tilt
              key={project.id}
              tiltMaxAngleX={isMobile ? 0 : 8}
              tiltMaxAngleY={isMobile ? 0 : 8}
              glareEnable={!isMobile}
              glareMaxOpacity={0.2}
              glareColor="#c9a9e9"
              glarePosition="all"
              className="min-w-[280px] md:min-w-[450px] flex-shrink-0 snap-start"
            >
              <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={cardHover}
              >
                <Link to={`/project/${project.id}`} className="group block">
                  <div className="glass-card rounded-2xl overflow-hidden">
                    <div className="w-[280px] h-[350px] md:w-[450px] md:h-[500px] overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cosmos-dark/90 via-cosmos-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Project Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="inline-block px-3 py-1 glass text-neon-aqua text-xs uppercase tracking-wider rounded-full mb-3">
                          {project.category || 'Arquitetura'}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl md:text-2xl font-serif text-text-light group-hover:text-neon-lilac transition">
                        {project.title}
                      </h3>
                      <p className="text-sm text-text-muted mt-2 uppercase tracking-wide">
                        {project.location} — {project.year}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </Tilt>
          ))}
        </motion.div>
      </section>

      {/* ========== CULTURAL PROJECTS ========== */}
      {(culturalProjects.filter(p => p.featured).length > 0 || culturalProjects.length > 0) && (
        <section className="py-12 md:py-20 bg-cosmos-mid">
          <div className="container mx-auto px-6 mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-serif mb-3 text-text-light">
                Projetos <span className="text-neon-gold">Culturais</span>
              </h2>
              <p className="text-text-muted text-base md:text-lg font-light">
                Iniciativas culturais e projetos especiais.
              </p>
            </motion.div>
            <Link
              to="/cultural"
              className="animated-underline text-sm font-bold uppercase tracking-widest text-text-light hover:text-neon-gold transition"
            >
              Ver Todos
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex overflow-x-auto pb-6 space-x-6 md:space-x-8 px-6 md:px-20 lg:px-32 xl:px-40 obras-scroll snap-x snap-mandatory scroll-pl-6 md:scroll-pl-20"
          >
            {(culturalProjects.filter(p => p.featured).length > 0
              ? culturalProjects.filter(p => p.featured)
              : culturalProjects.slice(0, 5)
            ).map((project) => (
              <Tilt
                key={project.id}
                tiltMaxAngleX={isMobile ? 0 : 8}
                tiltMaxAngleY={isMobile ? 0 : 8}
                glareEnable={!isMobile}
                glareMaxOpacity={0.2}
                glareColor="#ffd700"
                glarePosition="all"
                className="min-w-[280px] md:min-w-[450px] flex-shrink-0 snap-start"
              >
                <Link to={`/cultural/${project.id}`} className="group block">
                  <div className="glass-card rounded-2xl overflow-hidden">
                    <div className="w-[280px] h-[350px] md:w-[450px] md:h-[500px] overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cosmos-dark/90 via-cosmos-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl md:text-2xl font-serif text-text-light group-hover:text-neon-gold transition">
                        {project.title}
                      </h3>
                      <p className="text-sm text-text-muted mt-2 uppercase tracking-wide">
                        {project.category} — {project.year}
                      </p>
                    </div>
                  </div>
                </Link>
              </Tilt>
            ))}
          </motion.div>
        </section>
      )}

      {/* ========== STATISTICS SECTION ========== */}
      <section className="py-20 md:py-32 bg-cosmos-dark relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-text-light mb-4">
              Nossos <span className="gradient-text">Números</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Anos de experiência transformando espaços e vidas.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Briefcase, value: 150, suffix: '+', label: 'Projetos Entregues' },
              { icon: Users, value: 200, suffix: '+', label: 'Clientes Satisfeitos' },
              { icon: Award, value: 12, suffix: '', label: 'Prêmios Recebidos' },
              { icon: HomeIcon, value: 8, suffix: '', label: 'Anos de Experiência' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card glass-card-hover rounded-2xl p-6 md:p-8 text-center neon-border-lilac"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-neon-lilac animate-pulse" />
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  className="text-4xl md:text-5xl font-bold gradient-text block mb-2"
                  duration={2}
                />
                <p className="text-text-muted text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ABOUT TEASER ========== */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-cosmos-dark to-cosmos-mid">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 relative group"
          >
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-neon-lilac/30 rounded-2xl z-0 hidden md:block group-hover:border-neon-lilac/60 transition-colors duration-500" />
            <div className="relative z-10 overflow-hidden rounded-2xl glass-card">
              <img
                src="https://pycvlkcxgfwsquzolkzw.supabase.co/storage/v1/object/public/storage-Fran/img-sobre-home.png"
                alt="About"
                className="w-full h-auto transition-transform duration-1000 ease-in-out group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <span className="text-neon-aqua uppercase tracking-widest text-xs font-bold mb-4 block">
              Sobre o Escritório
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 md:mb-8 leading-tight text-text-light">
              Arquitetura <span className="gradient-text">Sensorial</span> e Atemporal
            </h2>
            <p className="text-text-muted leading-relaxed md:leading-loose mb-8 md:mb-10 text-base md:text-lg font-light">
              Acreditamos que a arquitetura não é apenas sobre edifícios, mas sobre como experimentamos o mundo.
              Cada linha traçada é uma decisão sobre como a luz entrará em uma sala, como o som viajará e como uma pessoa se sentirá.
            </p>
            <Link
              to="/about"
              className="inline-block glass-card px-8 py-4 md:px-10 md:py-4 rounded-full 
                       text-text-light hover:text-cosmos-dark hover:bg-neon-aqua
                       transition-all duration-300 text-sm tracking-widest font-bold uppercase btn-glow"
            >
              Nossa Filosofia
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== VISIT US SECTION ========== */}
      <section className="py-20 bg-cosmos-mid">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-0 glass-card rounded-3xl overflow-hidden">
            {/* Info Column */}
            <div className="w-full lg:w-1/3 bg-gradient-to-br from-cosmos-dark to-cosmos-light p-8 md:p-12 flex flex-col justify-center">
              <span className="text-neon-gold uppercase tracking-widest text-xs font-bold mb-6 block">
                Visite-nos
              </span>
              <h2 className="text-3xl md:text-4xl font-serif mb-8 leading-tight text-text-light">
                Nosso Ateliê <br />Criativo
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="p-3 glass rounded-xl">
                    <MapPin className="w-6 h-6 text-neon-aqua" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1 text-text-light">Endereço</p>
                    <p className="text-text-muted font-light text-sm leading-relaxed">
                      {siteContent?.office?.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 glass rounded-xl">
                    <Clock className="w-6 h-6 text-neon-aqua" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1 text-text-light">Horário</p>
                    <p className="text-text-muted font-light text-sm leading-relaxed">
                      {siteContent?.office?.hoursDescription}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href={siteContent?.office?.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full bg-neon-aqua text-cosmos-dark text-center py-4 rounded-full font-bold uppercase text-xs tracking-wider hover:bg-neon-lilac hover:text-cosmos-dark transition-all duration-300 btn-ripple"
                >
                  Traçar Rota
                </a>
                <Link
                  to="/office"
                  className="block w-full glass text-text-light text-center py-4 rounded-full font-bold uppercase text-xs tracking-wider hover:bg-white/20 transition-all duration-300"
                >
                  Conheça o Escritório
                </Link>
              </div>
            </div>

            {/* Map Column */}
            <div className="w-full lg:w-2/3 h-[400px] lg:h-auto relative bg-cosmos-dark">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(siteContent?.office?.mapQuery || siteContent?.office?.address || '')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="transition duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-24 md:py-32 bg-gradient-to-r from-cosmos-light via-cosmos-mid to-cosmos-dark relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-neon-lilac/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-aqua/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 text-text-light text-glow-lilac">
              Vamos Criar <span className="gradient-text-animated">Juntos</span>
            </h2>
            <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Transforme suas ideias em espaços extraordinários. Entre em contato e comece seu projeto dos sonhos.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-4 bg-neon-aqua text-cosmos-dark px-10 py-5 rounded-full 
                       font-bold uppercase tracking-wider text-sm
                       hover:bg-neon-lilac hover:scale-105 transition-all duration-300 btn-glow btn-ripple glow-aqua"
            >
              <span>Iniciar Projeto</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;