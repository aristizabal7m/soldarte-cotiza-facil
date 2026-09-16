import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  calcularPrecio,
  cop,
  materiales,
  tiposTrabajo,
  agregarSolicitud,
  type Material,
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
      { title: "Cotizador de construcciones metálicas | SoldArte" },
      {
        name: "description",
        content:
          "Calcule en segundos el precio estimado de su puerta, reja, ventana, escalera o estructura metálica según material y medidas.",
      },
      { property: "og:title", content: "Cotizador de construcciones metálicas | SoldArte" },
      {
        property: "og:description",
        content: "Elija tipo de trabajo, material y medidas y reciba un precio estimado al instante.",
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
  const [material, setMaterial] = useState<Material>("hierro");
  const [alto, setAlto] = useState("1.20");
  const [ancho, setAncho] = useState("0.80");
  const [cliente, setCliente] = useState("");
  const [telefono, setTelefono] = useState("");
  const [precio, setPrecio] = useState<number | null>(null);
  const [enviada, setEnviada] = useState(false);

  const nombreTipo = tiposTrabajo.find((t) => t.id === tipo)!.nombre;
  const nombreMaterial = materiales.find((m) => m.id === material)!.nombre;

  const cotizar = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseFloat(alto.replace(",", ".")) || 0;
    const b = parseFloat(ancho.replace(",", ".")) || 0;
    setPrecio(calcularPrecio(tipo, material, a, b));
    setEnviada(false);
  };

  const enviar = () => {
    if (precio === null) return;
    agregarSolicitud({
      cliente: cliente.trim() || "Cliente sin nombre",
      telefono: telefono.trim() || "Sin teléfono",
      trabajo: `${nombreTipo} ${alto}m x ${ancho}m`,
      material: nombreMaterial,
      precio,
    });
    setEnviada(true);
  };

  return (
    <div className="mx-auto max-w-2xl p-5 pb-16 sm:p-8">
      <h1 className="font-display text-3xl font-bold tracking-tight uppercase">
        Cotice su construcción
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Precio estimado inmediato. El valor final se confirma con visita técnica.
      </p>

      <form onSubmit={cotizar} className="mt-6 space-y-5 border border-border bg-card p-5">
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
          <span className={labelCls}>Material</span>
          <div className="grid grid-cols-3 gap-2">
            {materiales.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMaterial(m.id)}
                className={`border px-2 py-3 text-sm font-bold tracking-wide uppercase transition-colors ${
                  material === m.id
                    ? "border-forge bg-forge/15 text-forge"
                    : "border-border bg-input text-muted-foreground hover:border-forge/40"
                }`}
              >
                {m.nombre}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls} htmlFor="alto">
              Alto (metros)
            </label>
            <input
              id="alto"
              inputMode="decimal"
              className={inputCls}
              value={alto}
              onChange={(e) => setAlto(e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="ancho">
              Ancho (metros)
            </label>
            <input
              id="ancho"
              inputMode="decimal"
              className={inputCls}
              value={ancho}
              onChange={(e) => setAncho(e.target.value)}
            />
          </div>
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
          Calcular precio estimado
        </button>
      </form>

      {precio !== null && (
        <div className="mt-6 border border-forge/60 bg-card p-5">
          <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
            Precio estimado
          </p>
          <p className="font-display text-4xl font-bold text-forge">{cop(precio)}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {nombreTipo} en {nombreMaterial.toLowerCase()} · {alto}m x {ancho}m. Incluye materiales,
            fabricación e instalación en el Valle de Aburrá.
          </p>

          {enviada ? (
            <div className="mt-4 border border-border bg-secondary p-4">
              <p className="font-display text-lg font-bold uppercase">¡Solicitud enviada!</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Don Julián lo contacta hoy mismo por WhatsApp para confirmar medidas.
              </p>
              <Link
                to="/panel"
                className="mt-3 inline-block text-sm font-bold tracking-wide uppercase text-forge underline"
              >
                Ver en el panel del taller
              </Link>
            </div>
          ) : (
            <button
              onClick={enviar}
              className="mt-4 w-full border border-forge bg-forge/10 px-6 py-4 font-display text-lg font-bold tracking-wide uppercase text-forge hover:bg-forge/20"
            >
              Enviar solicitud
            </button>
          )}
        </div>
      )}
    </div>
  );
}
