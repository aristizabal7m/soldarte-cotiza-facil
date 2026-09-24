import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  agregarSolicitud,
  tiposTrabajo,
  type TipoTrabajo,
} from "@/lib/soldarte";

export const Route = createFileRoute("/cotizar")({
  validateSearch: (search: Record<string, unknown>): { tipo?: TipoTrabajo } => {
    const tipo = search["tipo"];
    if (typeof tipo === "string" && tiposTrabajo.some((t) => t.id === tipo)) {
      return { tipo: tipo as TipoTrabajo };
    }
    return {};
  },
  head: () => ({
    meta: [
      { title: "Solicita tu cotización | SoldArte" },
      {
        name: "description",
        content:
          "Cuéntenos qué construcción metálica necesita: puertas, rejas, ventanas, escaleras o estructuras. El taller de Pereira lo contacta pronto.",
      },
      { property: "og:title", content: "Solicita tu cotización | SoldArte" },
      {
        property: "og:description",
        content:
          "Elija el tipo de construcción, describa lo que necesita y deje sus datos. El taller lo contacta pronto.",
      },
    ],
  }),
  component: Cotizador,
});

const inputCls =
  "w-full border border-border bg-input px-3 py-3 text-base text-foreground outline-none focus:border-forge";
const labelCls = "mb-2 block text-xs font-bold tracking-widest uppercase text-muted-foreground";

function Cotizador() {
  const search = Route.useSearch();
  const [tipo, setTipo] = useState<TipoTrabajo>(search.tipo ?? "rejas");
  const [descripcion, setDescripcion] = useState("");
  const [cliente, setCliente] = useState("");
  const [telefono, setTelefono] = useState("");
  const [enviada, setEnviada] = useState(false);

  useEffect(() => {
    if (search.tipo) setTipo(search.tipo);
  }, [search.tipo]);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    agregarSolicitud({
      cliente: cliente.trim() || "Cliente sin nombre",
      telefono: telefono.trim() || "Sin teléfono",
      tipo,
      descripcion: descripcion.trim() || "Sin descripción",
    });
    setEnviada(true);
  };

  return (
    <div className="mx-auto max-w-2xl p-5 pb-16 sm:p-8">
      <h1 className="font-display text-3xl font-bold tracking-tight uppercase">
        Solicite su cotización
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Cuéntenos qué necesita y el taller lo contacta para confirmar detalles y precio.
      </p>

      {enviada ? (
        <div className="mt-6 border border-forge/60 bg-card p-6">
          <p className="font-display text-2xl font-bold uppercase text-forge">
            ¡Solicitud enviada!
          </p>
          <p className="mt-2 text-base text-foreground">
            Tu solicitud fue enviada, el taller te contactará pronto.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block text-sm font-bold tracking-wide uppercase text-forge underline"
          >
            Volver al inicio
          </Link>
        </div>
      ) : (
        <form onSubmit={enviar} className="mt-6 space-y-5 border border-border bg-card p-5">
          <div>
            <label className={labelCls} htmlFor="tipo">
              Tipo de construcción
            </label>
            <select
              id="tipo"
              className={inputCls}
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoTrabajo)}
            >
              {tiposTrabajo.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls} htmlFor="descripcion">
              ¿Qué necesita?
            </label>
            <textarea
              id="descripcion"
              rows={4}
              className={inputCls}
              placeholder="Ej: Reja para ventana de la sala, diseño clásico, color negro"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="cliente">
                Nombre o negocio
              </label>
              <input
                id="cliente"
                className={inputCls}
                placeholder="Ej: Casa de la familia Gómez"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="tel">
                Celular
              </label>
              <input
                id="tel"
                inputMode="tel"
                className={inputCls}
                placeholder="310 482 1176"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full border-b-4 border-black/40 bg-primary px-6 py-4 font-display text-lg font-bold tracking-wide uppercase text-primary-foreground hover:bg-primary/90 active:translate-y-px"
          >
            Enviar solicitud
          </button>
        </form>
      )}
    </div>
  );
}
