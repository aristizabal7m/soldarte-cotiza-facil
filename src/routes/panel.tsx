import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  solicitudes as data,
  tiposTrabajo,
  type Estado,
  type Solicitud,
} from "@/lib/soldarte";

export const Route = createFileRoute("/panel")({
  head: () => ({
    meta: [
      { title: "Panel del taller | SoldArte" },
      {
        name: "description",
        content:
          "Solicitudes de cotización recibidas con tipo de construcción, descripción, datos del cliente y estado del pedido.",
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

const estados: Estado[] = ["Pendiente", "Atendida"];

const colorEstado: Record<Estado, string> = {
  Pendiente: "border-estado-pendiente/60 bg-estado-pendiente/15 text-estado-pendiente",
  Atendida: "border-estado-entregado/60 bg-estado-entregado/15 text-estado-entregado",
};

const bordeEstado: Record<Estado, string> = {
  Pendiente: "border-l-estado-pendiente",
  Atendida: "border-l-estado-entregado",
};

const nombreTipo = (id: Solicitud["tipo"]) =>
  tiposTrabajo.find((t) => t.id === id)?.nombre ?? id;

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
        {lista.length} solicitudes · {pendientes} por atender
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

      <div className="mt-5 overflow-x-auto border border-border">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="bg-muted/60 text-left">
              <th className="px-3 py-2.5 text-xs font-bold tracking-widest uppercase text-muted-foreground">
                Solicitud
              </th>
              <th className="px-3 py-2.5 text-xs font-bold tracking-widest uppercase text-muted-foreground">
                Tipo
              </th>
              <th className="px-3 py-2.5 text-xs font-bold tracking-widest uppercase text-muted-foreground">
                Descripción
              </th>
              <th className="px-3 py-2.5 text-xs font-bold tracking-widest uppercase text-muted-foreground">
                Cliente
              </th>
              <th className="px-3 py-2.5 text-xs font-bold tracking-widest uppercase text-muted-foreground">
                Estado
              </th>
              <th className="px-3 py-2.5 text-xs font-bold tracking-widest uppercase text-muted-foreground">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {visibles.map((s) => (
              <tr
                key={s.id}
                className={`border-t border-border border-l-4 ${bordeEstado[s.estado]} bg-card align-top`}
              >
                <td className="px-3 py-3 whitespace-nowrap text-xs text-muted-foreground">
                  <span className="font-bold tracking-widest uppercase text-foreground">{s.id}</span>
                  <br />
                  {s.fecha}
                </td>
                <td className="px-3 py-3 font-display font-bold tracking-wide uppercase">
                  {nombreTipo(s.tipo)}
                </td>
                <td className="px-3 py-3">{s.descripcion}</td>
                <td className="px-3 py-3">
                  <span className="font-display font-bold tracking-wide uppercase">
                    {s.cliente}
                  </span>
                  <br />
                  <span className="text-xs text-muted-foreground">{s.telefono}</span>
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`inline-block border px-2 py-1 text-xs font-bold tracking-widest whitespace-nowrap uppercase ${colorEstado[s.estado]}`}
                  >
                    {s.estado}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <select
                    aria-label={`Cambiar estado de ${s.id}`}
                    className="w-full max-w-36 border border-border bg-input px-2 py-1.5 text-sm text-foreground outline-none focus:border-forge"
                    value={s.estado}
                    onChange={(e) => cambiar(s.id, e.target.value as Estado)}
                  >
                    {estados.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {visibles.length === 0 && (
              <tr>
                <td colSpan={6} className="bg-card px-3 py-6 text-center text-sm text-muted-foreground">
                  No hay solicitudes en este estado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
