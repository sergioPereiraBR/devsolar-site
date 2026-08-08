'use client';

import { useState } from 'react';

import styles from './abaut_section_ds.module.css';

export default function AboutDevSolar() {
  const [activeVideo, setActiveVideo] = useState(null);

  // Mídias focadas na equipe técnica, processos e instaladores
  const etapasInstalacao = [
    {
      id: 'vistoria',
      titulo: '1. Vistoria Técnica & Engenharia',
      desc: 'Nossos engenheiros analisam a estrutura do telhado, sombreamento e padrão elétrico no local.',
      thumb: '/images/equipe/vistoria-tecnica.jpg',
      videoUrl: 'https://www.youtube.com/embed/placeholder-vistoria',
    },
    {
      id: 'instalacao',
      titulo: '2. Montagem & Equipe Própria',
      desc: 'Instaladores treinados e equipados com EPIs realizam a fixação dos módulos com total segurança.',
      thumb: '/images/equipe/montagem-paineis.jpg',
      videoUrl:
        'https://rr2---sn-gpv7ynel.googlevideo.com/videoplayback?expire=1786157586&ei=8n12apzcCbSOwrcP19GOwQc&ip=200.195.86.243&id=53cbddb9dac2cf8a&itag=18&source=contrib_service_geo_ugc&begin=0&requiressl=yes&xpc=EghoqJzIP3oBAQ==&met=1786150386,&mh=jx&mm=32&mn=sn-gpv7ynel&ms=su&mv=m&mvi=2&pl=24&rms=su,su&sc=yes&susc=gugc&app=fife&ic=1104&eaua=KYUM_BxKKd8&pcm2=yes&mime=video/mp4&vprv=1&rqh=1&dur=18.715&lmt=1744402653583746&mt=1786149876&txp=0000224&sparams=expire,ei,ip,id,itag,source,requiressl,xpc,susc,app,ic,eaua,pcm2,mime,vprv,rqh,dur,lmt&sig=AE0s2JYwRQIhAK_-xGQB0U3MAr8S-KHtCxI0Jcg0DqQqtf46JE9x0LX5AiBre6oNdSA1WS_r653LZJKI6CVP7crvwMR_BsuosmK2Xg==&lsparams=met,mh,mm,mn,ms,mv,mvi,pl,rms,sc&lsig=APaTxxMwRQIhANFbKYrOtbrsCIzoYAwZKuj2-3_R6eChdpWGv1pmVu21AiAiBsoTPMwQ2CEiQdn9vNGTrhT_CtXP9Fy6hH8tNXwOrg==',
    },
    {
      id: 'homologacao',
      titulo: '3. Homologação & Ligação',
      desc: 'Testes elétricos, parametrização dos inversores e acompanhamento junto à concessionária (Light/Enel).',
      thumb: '/images/equipe/homologacao-comissionamento.jpg',
      videoUrl: 'https://www.youtube.com/embed/placeholder-homologacao',
    },
  ];

  return (
    <section id="sobre-devsolar" className={styles.sectionAbout}>
      <div className="container">
        <div className="mb-5 text-center">
          <h2 className={`${styles.sectionTitle} fw-bold`}>
            Sobre a Dev Solar
          </h2>
          <p className={`${styles.sectionSubtitle} lead`}>
            Conheça a história, a proposta e os diferenciais da nossa empresa.
          </p>

          {/* Cabeçalho */}
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-500 sm:text-sm">
              Corpo Técnico & Engenharia
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Quem Faz Acontecer na DEV Solar
            </h2>
            <p className="mt-3 text-base text-slate-600 sm:text-lg">
              Por trás de cada projeto de energia solar, há uma equipe
              qualificada de engenheiros e instaladores comprometida com a
              segurança, padrão ABNT e eficiência máxima do seu sistema.
            </p>
          </div>

          {/* Bloco 1: Vídeo da Equipe em Campo + Apresentação Institucional */}
          <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Player de Vídeo Institucional (Foco na Equipe/Loja) */}
            <div className="lg:col-span-7">
              <div className="group relative aspect-video overflow-hidden rounded-2xl bg-slate-900 shadow-2xl">
                <img
                  src="/images/equipe/instaladores-devsolar-campo.jpg"
                  alt="Equipe de Instaladores da DEV Solar em Ação"
                  className="h-full w-full object-cover opacity-85 transition-opacity group-hover:opacity-75"
                />

                {/* Overlay do Botão de Play */}
                <button
                  onClick={() =>
                    setActiveVideo(
                      'https://www.youtube.com/embed/devsolar-institucional-equipe',
                    )
                  }
                  className="absolute inset-0 flex flex-col items-center justify-center text-white focus:outline-none"
                  aria-label="Assistir vídeo da equipe de instaladores"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 shadow-lg transition-transform group-hover:scale-110 sm:h-20 sm:w-20">
                    <svg
                      className="ml-1 h-8 w-8 fill-current text-white sm:h-10 sm:w-10"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="mt-4 text-sm font-semibold drop-shadow-md sm:text-base">
                    Assista ao Bastidor das Nossas Instalações
                  </span>
                </button>

                <div className="absolute bottom-4 left-4 rounded-lg bg-slate-900/90 px-4 py-2 text-xs text-white backdrop-blur">
                  📍 [Sede Física na Av. Jambeiro, 474 - Vila Valqueire,
                  RJ](https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.118130595175!2d-43.37059842468548!3d-22.90897007925271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997bf1462a02f9%3A0x10336504dfc62b21!2sAv.%20Jambeiro%2C%20474%20-%20C%20-%20Vila%20Valqueire%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2021330-300!5e0!3m2!1spt-BR!2sbr!4v1716489334614!5m2!1spt-BR!2sbr)
                </div>
              </div>
            </div>

            {/* Texto de Autoridade Técnica */}
            <div className="space-y-6 lg:col-span-5">
              <h3 className="text-2xl font-bold text-slate-900">
                Instalação Profissional, Rigor Técnico e Suporte Humano
              </h3>
              <p className="leading-relaxed text-slate-600">
                Com sede em Vila Valqueire e atuação em todo o Estado do Rio de
                Janeiro, a **DEV Solar** ([DEV Eficiência Energética
                Ltda](http://localhost:3000/#contato).) não terceiriza a
                qualidade. Nossos engenheiros e instaladores acompanham cada
                etapa, desde o dimensionamento inicial até a vistoria da
                concessionária.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 rounded-lg bg-amber-500 p-1.5 font-bold text-white">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      ART no CREA-RJ
                    </h4>
                    <p className="text-sm text-slate-600">
                      Todo projeto é assinado e homologado por engenheiros
                      habilitados.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 mt-1 rounded-lg bg-amber-500 p-1.5 font-bold text-white">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Normas NR-10 e NR-35
                    </h4>
                    <p className="text-sm text-slate-600">
                      Equipe de campo 100% certificada para trabalho em altura e
                      instalações elétricas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-3 mt-1 rounded-lg bg-amber-500 p-1.5 font-bold text-white">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Homologação Rápida
                    </h4>
                    <p className="text-sm text-slate-600">
                      Gestão direta do processo junto à Light e Enel sem dor de
                      cabeça.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bloco 2: Mídias do Processo de Instalação (Vídeos/Fotos dos Instaladores) */}
          <div className="border-t border-slate-200 pt-10">
            <div className="mb-8 text-center md:text-left">
              <h3 className="text-2xl font-bold text-slate-900">
                Como Nossos Instaladores Trabalham
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Transparência do primeiro parafuso ao ligar da chave
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {etapasInstalacao.map((item) => (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"
                >
                  <div className="relative aspect-video bg-slate-800">
                    <img
                      src={item.thumb}
                      alt={item.titulo}
                      className="h-full w-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-105"
                    />
                    <button
                      onClick={() => setActiveVideo(item.videoUrl)}
                      className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-90 transition-opacity group-hover:opacity-100"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 shadow-md">
                        <svg
                          className="ml-0.5 h-6 w-6 fill-current text-white"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </button>
                  </div>

                  <div className="p-5">
                    <h4 className="text-base font-bold text-slate-900">
                      {item.titulo}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {item.desc}
                    </p>
                    <button
                      onClick={() => setActiveVideo(item.videoUrl)}
                      className="mt-4 inline-flex items-center text-xs font-bold uppercase tracking-wide text-amber-600 hover:text-amber-700"
                    >
                      Ver Etapa em Vídeo →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Banner de Garantia e Infraestrutura */}
          <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl bg-slate-900 p-8 text-white md:flex-row">
            <div>
              <h4 className="text-xl font-bold">
                Inversores e Módulos com Suporte Direto do Fabricante
              </h4>
              <p className="mt-1 text-sm text-slate-300">
                Trabalhamos com marcas de topo global como [[WEG
                Solar](http://localhost:3000/#parceiros), [Intelbras
                Solar](http://localhost:3000/#parceiros) e [Canadian
                Solar](http://localhost:3000/#parceiros)] com até 25 anos de
                garantia.
              </p>
            </div>
            <a
              href="#contato"
              className="whitespace-nowrap rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-600"
            >
              Falar com a Engenharia
            </a>
          </div>
        </div>

        {/* Modal Lightbox de Vídeo */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-xl bg-black shadow-2xl">
              <button
                onClick={() => setActiveVideo(null)}
                className="bg-white/20 hover:bg-white/40 absolute right-4 top-4 z-10 rounded-full p-2 text-white focus:outline-none"
              >
                ✕
              </button>
              <iframe
                src={activeVideo}
                title="Vídeo DEV Solar Tecnico"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
