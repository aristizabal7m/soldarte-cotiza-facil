import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { cop, productos } from "@/lib/soldarte";

export const Route = createFileRoute("/herramientas")({
  head: () => ({
    meta: [
      { title: "Herramientas y materiales de soldadura | SoldArte" },
      {
        name: "description",
        content:
          "Soldadoras, pulidoras, máscaras, electrodos, tubería y ángulo de hierro con precios en pesos colombianos.",
      },
      { property: "og:title", content: "Herramientas y materiales de soldadura | SoldArte" },
      {
        property: "og:description",
        content: "Catálogo de herramienta y material para soldadura y metalistería.",
      },
    ],
  }),
  component: Herramientas,
});

function Herramientas() {
  const [carrito, setCarrito] = useState<Record<number, number>>({});
  const total = productos.reduce((s, p) => s + p.precio * (carrito[p.id] ?? 0), 0);
  const unidades = Object.values(carrito).reduce((s, n) => s + n, 0);

  return (
    <div className="p-5 pb-28 sm:p-8">
      <h1 className="font-display text-3xl font-bold tracking-tight uppercase">
        Herramientas y materiales
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Entrega en obra en Pereira y municipios cercanos.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productos.map((p) => (
          <article key={p.id} className="flex flex-col border border-border bg-card">
            <img
              src={p.foto}
              alt={p.nombre}
              loading="lazy"
              width={800}
              height={800}
              className="h-44 w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-4">
              <h2 className="font-display text-base font-bold tracking-wide uppercase">
                {p.nombre}
              </h2>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{p.detalle}</p>
              <p className="mt-3 font-display text-2xl font-bold text-forge">{cop(p.precio)}</p>
              <button
                onClick={() => setCarrito((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + 1 }))}
                className="mt-3 w-full border-b-4 border-black/40 bg-primary px-4 py-3 text-sm font-bold tracking-widest uppercase text-primary-foreground hover:bg-primary/90 active:translate-y-px"
              >
                {carrito[p.id] ? `En el carrito (${carrito[p.id]})` : "Agregar al carrito"}
              </button>
            </div>
          </article>
        ))}
      </div>

      {unidades > 0 && (
        <div className="fixed inset-x-0 bottom-0 border-t border-forge/60 bg-card/95 p-4 backdrop-blur">
          <div className="mx-auto grid max-w-3xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                {unidades} {unidades === 1 ? "producto" : "productos"}
              </p>
              <p className="truncate font-display text-xl font-bold text-forge">{cop(total)}</p>
            </div>
            <button
              onClick={() => setCarrito({})}
              className="shrink-0 border border-border px-4 py-3 text-xs font-bold tracking-widest uppercase text-muted-foreground hover:border-forge/60"
            >
              Vaciar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
