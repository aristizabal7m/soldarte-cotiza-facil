import puertas from "@/assets/puertas.jpg";
import rejas from "@/assets/rejas.jpg";
import ventanas from "@/assets/ventanas.jpg";
import escaleras from "@/assets/escaleras.jpg";
import soldadora from "@/assets/soldadora.jpg";
import mascara from "@/assets/mascara.jpg";
import pulidora from "@/assets/pulidora.jpg";
import tubos from "@/assets/tubos.jpg";

export const cop = (valor: number) =>
  "$" + Math.round(valor).toLocaleString("es-CO").replace(/,/g, ".");

export type TipoTrabajo = "puertas" | "rejas" | "ventanas" | "escaleras" | "estructuras";
export type Material = "hierro" | "acero" | "aluminio";

export const servicios: {
  id: TipoTrabajo;
  nombre: string;
  descripcion: string;
  foto: string;
  desde: number;
}[] = [
  {
    id: "puertas",
    nombre: "Puertas metálicas",
    descripcion: "Puertas de seguridad y portones forjados a mano en el taller.",
    foto: puertas,
    desde: 680000,
  },
  {
    id: "rejas",
    nombre: "Rejas",
    descripcion: "Rejas para ventanas y balcones, con diseño clásico o moderno.",
    foto: rejas,
    desde: 220000,
  },
  {
    id: "ventanas",
    nombre: "Ventanería",
    descripcion: "Marcos en aluminio y acero inoxidable con vidrio a la medida.",
    foto: ventanas,
    desde: 380000,
  },
  {
    id: "escaleras",
    nombre: "Escaleras",
    descripcion: "Escaleras rectas, en caracol y barandas soldadas en obra.",
    foto: escaleras,
    desde: 1450000,
  },
  {
    id: "estructuras",
    nombre: "Estructuras",
    descripcion: "Cubiertas, entrepisos y estructuras para construcción liviana.",
    foto: puertas,
    desde: 1900000,
  },
];

export const tiposTrabajo: { id: TipoTrabajo; nombre: string; base: number; m2: number }[] = [
  { id: "puertas", nombre: "Puerta metálica", base: 320000, m2: 260000 },
  { id: "rejas", nombre: "Reja para ventana o balcón", base: 120000, m2: 180000 },
  { id: "ventanas", nombre: "Ventana", base: 180000, m2: 210000 },
  { id: "escaleras", nombre: "Escalera metálica", base: 900000, m2: 420000 },
  { id: "estructuras", nombre: "Estructura metálica", base: 1200000, m2: 380000 },
];

export const materiales: { id: Material; nombre: string; factor: number }[] = [
  { id: "hierro", nombre: "Hierro", factor: 1 },
  { id: "acero", nombre: "Acero inoxidable", factor: 1.75 },
  { id: "aluminio", nombre: "Aluminio", factor: 1.35 },
];

export function calcularPrecio(
  tipo: TipoTrabajo,
  material: Material,
  alto: number,
  ancho: number,
) {
  const t = tiposTrabajo.find((x) => x.id === tipo)!;
  const m = materiales.find((x) => x.id === material)!;
  const area = Math.max(alto * ancho, 0.4);
  const bruto = (t.base + area * t.m2) * m.factor;
  const precio = Math.round(bruto / 10000) * 10000;
  return Math.min(Math.max(precio, 150000), 3500000);
}

export type Estado = "Pendiente" | "Atendida";

export type Solicitud = {
  id: string;
  cliente: string;
  telefono: string;
  tipo: TipoTrabajo;
  descripcion: string;
  estado: Estado;
  fecha: string;
};

export const solicitudes: Solicitud[] = [
  {
    id: "SA-1042",
    cliente: "Constructora El Roble",
    telefono: "310 482 1176",
    tipo: "estructuras",
    descripcion: "Cubierta para patio 6.00m x 4.00m",
    estado: "Atendida",
    fecha: "12 sep",
  },
  {
    id: "SA-1041",
    cliente: "Casa de la familia Gómez",
    telefono: "315 774 2093",
    tipo: "rejas",
    descripcion: "Reja para ventana 1.20m x 0.80m",
    estado: "Pendiente",
    fecha: "12 sep",
  },
  {
    id: "SA-1039",
    cliente: "Panadería La Espiga",
    telefono: "312 209 8845",
    tipo: "puertas",
    descripcion: "Puerta metálica enrollable 2.10m x 1.00m",
    estado: "Pendiente",
    fecha: "11 sep",
  },
  {
    id: "SA-1036",
    cliente: "Edificio Portal del Norte",
    telefono: "301 556 3320",
    tipo: "escaleras",
    descripcion: "Escalera metálica caracol",
    estado: "Pendiente",
    fecha: "9 sep",
  },
  {
    id: "SA-1031",
    cliente: "Casa de la familia Gómez",
    telefono: "315 774 2093",
    tipo: "rejas",
    descripcion: "Baranda de balcón 3.00m x 1.10m",
    estado: "Atendida",
    fecha: "4 sep",
  },
  {
    id: "SA-1028",
    cliente: "Taller Mecánico Don Julio",
    telefono: "320 118 4467",
    tipo: "ventanas",
    descripcion: "Ventana corrediza 1.50m x 1.20m",
    estado: "Atendida",
    fecha: "1 sep",
  },
];

let consecutivo = 1043;

export function agregarSolicitud(
  s: Pick<Solicitud, "cliente" | "telefono" | "tipo" | "descripcion">,
) {
  const nueva: Solicitud = {
    ...s,
    id: `SA-${consecutivo++}`,
    estado: "Pendiente",
    fecha: "hoy",
  };
  solicitudes.unshift(nueva);
  return nueva;
}

export const productos = [
  {
    id: 1,
    nombre: "Soldadora inverter 200A",
    detalle: "Incluye porta electrodo y pinza de tierra",
    precio: 890000,
    foto: soldadora,
  },
  {
    id: 2,
    nombre: "Máscara de soldar automática",
    detalle: "Oscurecimiento automático, filtro 9-13",
    precio: 210000,
    foto: mascara,
  },
  {
    id: 3,
    nombre: "Pulidora 4 1/2 pulgadas",
    detalle: "850W, con disco de corte incluido",
    precio: 265000,
    foto: pulidora,
  },
  {
    id: 4,
    nombre: "Tubo cuadrado 1\" x 6m (calibre 18)",
    detalle: "Precio por unidad, entrega en obra",
    precio: 150000,
    foto: tubos,
  },
  {
    id: 5,
    nombre: "Ángulo de hierro 1 1/2\" x 6m",
    detalle: "Ideal para marcos y estructuras livianas",
    precio: 172000,
    foto: tubos,
  },
  {
    id: 6,
    nombre: "Electrodos 6013 (caja 5 kg)",
    detalle: "Diámetro 1/8\", uso general",
    precio: 185000,
    foto: soldadora,
  },
];
