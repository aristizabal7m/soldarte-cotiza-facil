import { createFileRoute, Link } from "@tanstack/react-router";
import { servicios, cop } from "@/lib/soldarte";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SoldArte | Taller de soldadura y arte en metal" },
      {
        name: "description",
        content:
          "Puertas, rejas, ventanas, escaleras y estructuras metálicas a la medida. Cotiza tu construcción en línea con SoldArte.",
      },
      { property: "og:title", content: "SoldArte | Taller de soldadura y arte en metal" },
      {
        property: "og:description",
        content: "Cotiza en minutos tu puerta, reja, ventana, escalera o estructura metálica.",
      },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  return (
    <div className="pb-14">
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={servicios[3]!.foto}
          alt="Escalera metálica en caracol fabricada por SoldArte"
          width={1024}
          height={768}
          className="h-72 w-full object-cover opacity-40 sm:h-96"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end gap-3 p-5 sm:p-10">
          <span className="w-fit border border-forge/50 bg-forge/10 px-2 py-1 text-xs font-bold tracking-widest text-forge uppercase">
            Taller propio · Pereira
          </span>
          <h1 className="font-display text-3xl leading-none font-bold tracking-tight uppercase sm:text-5xl">
            Metal que aguanta,
            <br />
            <span className="text-forge">trabajo que se ve</span>
          </h1>
          <p className="max-w-lg text-sm text-muted-foreground sm:text-base">
            Fabricamos puertas, rejas, ventanas, escaleras y estructuras a la medida. Cotice desde
            el celular, sin llamadas ni esperas.
          </p>
        </div>
      </section>

      <div className="p-5 sm:p-8">
        <Link
          to="/cotizar"
          className="flex w-full items-center justify-center gap-3 border-b-4 border-black/40 bg-primary px-6 py-5 font-display text-lg font-bold tracking-wide uppercase text-primary-foreground transition-colors hover:bg-primary/90 active:translate-y-px sm:text-xl"
        >
          Cotizar mi construcción
        </Link>

        <h2 className="mt-10 font-display text-2xl font-bold tracking-wide uppercase">
          Lo que hacemos
        </h2>
        <p className="text-sm text-muted-foreground">Trabajos entregados en obra y en casa.</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servicios.map((s) => (
            <Link
              key={s.id}
              to="/cotizar"
              search={{ tipo: s.id }}
              className="group overflow-hidden border border-border bg-card transition-colors hover:border-forge/60"
            >
              <img
                src={s.foto}
                alt={s.nombre}
                loading="lazy"
                width={1024}
                height={768}
                className="h-44 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-display text-lg font-bold tracking-wide uppercase">
                  {s.nombre}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.descripcion}</p>
                <p className="mt-3 text-sm font-bold text-forge group-hover:underline">
                  Desde {cop(s.desde)} · Cotizar
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 border border-border bg-card p-5">
          <h2 className="font-display text-xl font-bold tracking-wide uppercase">
            ¿Necesita herramienta o material?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            También vendemos soldadoras, pulidoras, electrodos, tubería y ángulo.
          </p>
          <Link
            to="/herramientas"
            className="mt-4 inline-block border border-forge px-4 py-2 text-sm font-bold tracking-wide uppercase text-forge hover:bg-forge/10"
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
