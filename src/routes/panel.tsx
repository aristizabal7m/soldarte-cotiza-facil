import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { cop, solicitudes as data, type Estado, type Solicitud } from "@/lib/soldarte";

export const Route = createFileRoute("/panel")({
  head: () => ({
    meta: [
      { title: "Panel del taller | SoldArte" },
      {
        name: "description",
        content:
          "Solicitudes de cotización recibidas con cliente, trabajo, precio estimado y estado del pedido.",
      },
      { property: "og:title", content: "Panel del taller | SoldArte" },
      {
        property: "og:description",
        content: "Gestione las solicitudes de cotización del taller SoldArte.",
      },
    ],
  }),
  component: Panel,
});

const estados: Estado[] = ["Pendiente", "En proceso", "Entregado"];

const colorEstado: Record<Estado, string> = {
  Pendiente: "border-accent/60 bg-accent/15 text-accent",
  "En proceso": "border-primary bg-primary/20 text-primary-foreground",
  Entregado: "border-border bg-secondary text-muted-foreground",
};

function Panel() {
  const [lista, setLista] = useState<Solicitud[]>([...data]);
  const [filtro, setFiltro] = useState<Estado | "Todas">("Todas");

  const cambiar = (id: string, estado: Estado) => {
    const s = data.find((x) => x.id === id);
    if (s) s.estado = estado;
    setLista((prev) => prev.map((x) => (x.id === id ? { ...x, estado } : x)));
  };

  const visibles = filtro === "Todas" ? lista : lista.filter((s) => s.estado === filtro);
  const pendientes = lista.filter((s) => s.estado === "Pendiente").length;

  return (
    <div className="p-5 pb-16 sm:p-8">
      <h1 className="font-display text-3xl font-bold tracking-tight uppercase">Panel del taller</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {lista.length} solicitudes · {pendientes} por responder
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {(["Todas", ...estados] as const).map((e) => (
          <button
            key={e}
            onClick={() => setFiltro(e)}
            className={`border px-3 py-2 text-xs font-bold tracking-widest uppercase ${
              filtro === e
                ? "border-forge bg-forge/15 text-forge"
                : "border-border bg-card text-muted-foreground hover:border-forge/40"
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {visibles.map((s) => (
          <article key={s.id} className="border border-border bg-card p-4">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                  {s.id} · {s.fecha}
                </p>
                <h2 className="truncate font-display text-lg font-bold tracking-wide uppercase">
                  {s.cliente}
                </h2>
                <p className="mt-1 text-sm text-foreground">{s.trabajo}</p>
                <p className="text-sm text-muted-foreground">
                  {s.material} · {s.telefono}
                </p>
              </div>
              <span
                className={`shrink-0 border px-2 py-1 text-xs font-bold tracking-widest uppercase ${colorEstado[s.estado]}`}
              >
                {s.estado}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border pt-3">
              <p className="font-display text-2xl font-bold text-forge">{cop(s.precio)}</p>
              <select
                aria-label={`Cambiar estado de ${s.id}`}
                className="shrink-0 border border-border bg-input px-2 py-2 text-sm text-foreground outline-none focus:border-forge"
                value={s.estado}
                onChange={(e) => cambiar(s.id, e.target.value as Estado)}
              >
                {estados.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
          </article>
        ))}
        {visibles.length === 0 && (
          <p className="border border-border bg-card p-6 text-center text-sm text-muted-foreground">
            No hay solicitudes en este estado.
          </p>
        )}
      </div>
    </div>
  );
}
