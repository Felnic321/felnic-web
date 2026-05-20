"use client";

import React, { useMemo, useState } from "react";

const whatsappNumber = "5491161079798";
const whatsappSecundario =
  "https://wa.me/5491133432795?text=Hola%20Felnic%2C%20quiero%20hacer%20una%20consulta";
const instagramUrl = "https://www.instagram.com/felnic.m";

const servicios = [
  "Cocinas a medida",
  "Placares y vestidores",
  "Racks y muebles TV",
  "Vanitorys",
  "Escritorios",
  "Muebles de guardado",
];

const pasos = [
  {
    icon: "💬",
    title: "Nos escribís",
    text: "Contanos qué mueble necesitás, tu zona y medidas aproximadas.",
  },
  {
    icon: "📐",
    title: "Te asesoramos",
    text: "Revisamos la idea, materiales, distribución y detalles del diseño.",
  },
  {
    icon: "🛠️",
    title: "Fabricamos",
    text: "Realizamos el mueble a medida cuidando terminaciones y funcionalidad.",
  },
  {
    icon: "🏠",
    title: "Entregamos",
    text: "Coordinamos entrega o instalación según el tipo de trabajo.",
  },
];

const trabajos = [
  {
    title: "Rack de TV moderno",
    text: "Rack de TV minimalista con estantes superiores y mesita móvil integrada debajo del módulo principal.",
    category: "Rack TV",
    images: ["/images/rack-tv.jpeg"],
  },
  {
    title: "Cocina compacta funcional",
    text: "Cocina en melamina con alacenas superiores, cajonera lateral y excelente aprovechamiento del espacio.",
    category: "Cocina",
    images: ["/images/cocina-a.jpeg", "/images/cocina-b.jpeg"],
  },
  {
    title: "Placard interior personalizado",
    text: "Placard con espacios de guardado, cajones y distribución pensada para optimizar organización.",
    category: "Placard",
    images: ["/images/placard-1.jpeg"],
  },
  {
    title: "Placard corredizo moderno",
    text: "Placard de piso a techo con puertas corredizas texturadas y distribución interior personalizada.",
    category: "Placard",
    images: ["/images/placard-2a.jpeg", "/images/placard-2b.jpeg"],
  },
];

const tiposDeMueble = [
  "Cocina",
  "Placard / vestidor",
  "Rack / mueble TV",
  "Vanitory",
  "Escritorio",
  "Mueble de guardado",
  "Otro",
];

function buildWhatsAppUrl({
  nombre,
  tipo,
  medidas,
  referencia,
  archivoNombre,
}: any) {
  const mensaje = [
    "Hola Felnic, quiero pedir un presupuesto.",
    "",
    `Nombre: ${nombre || "-"}`,
    `Tipo de mueble: ${tipo || "-"}`,
    `Medidas aproximadas: ${medidas || "-"}`,
    `Referencia / idea: ${referencia || "-"}`,
    archivoNombre
      ? `Tengo una foto o esquema para enviar: ${archivoNombre}`
      : "No adjunté foto o esquema todavía.",
  ].join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    mensaje
  )}`;
}

function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition";

  const variants: any = {
    primary: "bg-emerald-700 text-white hover:bg-emerald-800",
    secondary:
      "border border-white/40 bg-white/10 text-white hover:bg-white/20",
    outline:
      "border border-emerald-700 bg-transparent text-emerald-800 hover:bg-emerald-50",
    ghost: "bg-stone-100 text-stone-900 hover:bg-stone-200",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </a>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-stone-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function PresupuestoForm() {
  const [form, setForm] = useState({
    nombre: "",
    tipo: "",
    medidas: "",
    referencia: "",
    archivoNombre: "",
  });

  const whatsappUrl = useMemo(() => buildWhatsAppUrl(form), [form]);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleFileChange(event: any) {
    const file = event.target.files?.[0];
    updateField("archivoNombre", file ? file.name : "");
  }

  return (
    <form className="rounded-[2rem] bg-white p-6 text-stone-900 shadow-2xl">
      <h3 className="text-2xl font-semibold">Solicitar presupuesto</h3>

      <div className="mt-6 grid gap-4">
        <input
          value={form.nombre}
          onChange={(e) => updateField("nombre", e.target.value)}
          placeholder="Nombre"
          className="rounded-2xl border border-stone-300 px-4 py-3"
        />

        <select
          value={form.tipo}
          onChange={(e) => updateField("tipo", e.target.value)}
          className="rounded-2xl border border-stone-300 px-4 py-3"
        >
          <option value="">Tipo de mueble</option>

          {tiposDeMueble.map((tipo) => (
            <option key={tipo}>{tipo}</option>
          ))}
        </select>

        <div>
          <p className="mb-2 text-sm font-medium">
            Medidas aproximadas (en metros)
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            <input
              placeholder="Largo"
              className="rounded-2xl border border-stone-300 px-4 py-3"
            />

            <input
              placeholder="Profundidad"
              className="rounded-2xl border border-stone-300 px-4 py-3"
            />

            <input
              placeholder="Altura"
              className="rounded-2xl border border-stone-300 px-4 py-3"
            />
          </div>
        </div>

        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="rounded-2xl border border-stone-300 px-4 py-3"
        />

        <textarea
          value={form.referencia}
          onChange={(e) => updateField("referencia", e.target.value)}
          placeholder="Comentario o idea"
          rows={4}
          className="rounded-2xl border border-stone-300 px-4 py-3"
        />

        <Button href={whatsappUrl}>
          Pedir presupuesto por WhatsApp
        </Button>
      </div>
    </form>
  );
}

export default function FelnicLanding() {
  const [imagenAbierta, setImagenAbierta] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#inicio" className="text-2xl font-semibold tracking-wide">
            Felnic
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-stone-700 md:flex">
            <a href="#servicios">Qué hacemos</a>
            <a href="#trabajos">Trabajos</a>
            <a href="#proceso">Cómo trabajamos</a>
            <a href="#presupuesto">Presupuesto</a>
          </nav>

          <Button href="#presupuesto">Presupuesto</Button>
        </div>
      </header>

      <main>
        <section
          id="inicio"
          className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-800"
        >
<div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 text-white lg:grid-cols-2 md:items-center md:py-32">
  <img
    src="/images/logo-2.png"
    alt="Logo Felnic"
    className="h-64 w-full object-contain md:h-80 lg:col-start-1"
  />

  <div className="lg:col-start-2">
    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
      Muebles a medida
    </p>

    <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-6xl">
      Diseñamos y fabricamos muebles de melamina a medida
    </h1>

    <p className="mt-6 max-w-xl text-lg leading-8 text-stone-200">
      Cocinas, placares, racks, escritorios y muebles de guardado.
    </p>

    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <Button href="#presupuesto">Pedir presupuesto →</Button>

      <Button href="#trabajos" variant="secondary">
        Ver trabajos
      </Button>
    </div>
  </div>


        
          </div>
        </section>

        <section id="servicios" className="mx-auto max-w-7xl px-5 py-20">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold md:text-4xl">
              Muebles pensados para tu espacio
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((servicio) => (
              <Card key={servicio}>
                <div className="flex items-center gap-3 p-6">
                  <span>✓</span>
                  <span className="font-medium">{servicio}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="trabajos" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="text-3xl font-bold md:text-4xl">
                Algunos trabajos
              </h2>

              <Button href={instagramUrl} variant="outline">
                Ver Instagram
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {trabajos.map((trabajo) => (
                <Card key={trabajo.title} className="overflow-hidden">
                  <div className="grid h-80 gap-1 overflow-hidden bg-stone-200">
                    {trabajo.images.length === 1 ? (
                      <button 
                      type="button"
  onClick={() => setImagenAbierta(trabajo.images[0])}
  className="h-full w-full overflow-hidden"
>
  <img
    src={trabajo.images[0]}
    alt={trabajo.title}
    className="h-full w-full object-cover transition duration-500 hover:scale-105"
  />
</button>
                    ) : (
                      <div className="grid h-full grid-cols-2 gap-1">
                        {trabajo.images.map((image) => (
                         <button
                         key={image}
  type="button"
  onClick={() => setImagenAbierta(image)}
  className="h-full w-full overflow-hidden"
>
  <img
    src={image}
    alt={trabajo.title}
    className="h-full w-full object-cover transition duration-500 hover:scale-105"
  />
</button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <span className="mb-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
                      {trabajo.category}
                    </span>

                    <h3 className="text-xl font-semibold">
                      {trabajo.title}
                    </h3>

                    <p className="mt-2 text-stone-600">{trabajo.text}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="proceso" className="mx-auto max-w-7xl px-5 py-20">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold md:text-4xl">
              Cómo trabajamos
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {pasos.map((paso, index) => (
              <Card key={paso.title}>
                <div className="p-6">
                  <div className="mb-5 text-2xl">{paso.icon}</div>

                  <p className="mb-2 text-sm font-bold text-emerald-700">
                    Paso {index + 1}
                  </p>

                  <h3 className="text-lg font-semibold">{paso.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {paso.text}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="presupuesto" className="bg-stone-900 py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold md:text-5xl">
                Contanos qué mueble necesitás
              </h2>

              <p className="mt-5 max-w-xl text-stone-300">
                Completá el formulario y se abre WhatsApp con toda la información lista.
              </p>
            </div>

            <PresupuestoForm />
          </div>
        </section>
        {imagenAbierta && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
    <button
      type="button"
      onClick={() => setImagenAbierta(null)}
      className="absolute right-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-900 shadow-lg"
    >
      Cerrar
    </button>

    <img
      src={imagenAbierta}
      alt="Trabajo de Felnic ampliado"
      className="max-h-[90vh] max-w-[95vw] rounded-3xl object-contain shadow-2xl"
    />
  </div>
)}
      </main>
    </div>
  );
}