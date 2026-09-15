# SoldArte Cotizador Web

Actúa como un diseñador senior experto en desarrollo de aplicaciones web en Colombia, especializado en productos para pequeños negocios y talleres.

Crea una aplicación web llamada "SoldArte" para un taller de soldadura, metalistería y arte en metal que recibe solicitudes de construcciones metálicas (puertas, rejas, ventanas, escaleras, estructuras) y también vende herramientas y materiales.

Función central: los clientes solicitan una cotización automática ingresando el tipo de trabajo, el material y las medidas; el sistema calcula un precio estimado. El dueño del taller gestiona esas solicitudes y puede ver el catálogo de productos.

Pantallas (solo estas 4):

Inicio (cliente): catálogo de servicios (puertas, rejas, ventanas, escaleras, estructuras) con fotos de trabajos realizados como portafolio, y un botón grande "Cotizar mi construcción".

Cotizador: formulario donde el cliente elige tipo de construcción, material (hierro, acero inoxidable, aluminio) y medidas (alto x ancho); al enviar, muestra un precio estimado automático y un botón "Enviar solicitud".

Catálogo de herramientas: lista de productos (herramientas y materiales) con foto, nombre y precio, con un botón "Agregar al carrito".

Panel del dueño: lista de todas las solicitudes de cotización recibidas, con nombre del cliente, tipo de trabajo, precio estimado y estado (Pendiente, En proceso, Entregado).

Estilo: robusto e industrial, colores gris oscuro y rojo oscuro (como el color de la soldadura), tipografía fuerte, mobile-first ya que muchos clientes van a cotizar desde el celular en la calle o en obra.

Todos los textos en español colombiano. Usa datos de ejemplo realistas: clientes como "Constructora El Roble", "Casa de la familia Gómez"; trabajos como "Reja para ventana 1.20m x 0.80m" o "Escalera metálica caracol"; precios en pesos colombianos entre $150.000 y $3.500.000 con formato $850.000.

NO incluyas: login de usuarios, pasarela de pagos en línea, reportes ni gráficas estadísticas, notificaciones push, ni modo oscuro. Eso viene después.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/df8463e3-501b-4892-9aa8-db1ed5b1a4bc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
