# PatitasGo — Portal de Adopción y Rescate de Animales

Portal web y aplicación móvil que centraliza la adopción responsable de animales rescatados: los refugios publican fichas y gestionan solicitudes, y las personas interesadas exploran animales, postulan y siguen el estado de su postulación.

Proyecto semestral de **Ingeniería Web y Móvil**, Ingeniería en Informática, PUCV.

## Integrantes

| Integrante | Rol principal |
|---|---|
| Francisca Ponce | Frontend (Ionic + React) |
| Kevin Rubilar | Documentación y requerimientos |
| Elías Bravo | Integración del frontend |
| Tomás Guerra | *Por confirmar por el equipo* |

La distribución detallada de responsabilidades está en el [README de la rama frontend](../../tree/frontend#distribución-de-responsabilidades).

## Organización del repositorio

| Rama | Contenido |
|---|---|
| [`main`](../../tree/main) | Este README general del proyecto. |
| [`frontend`](../../tree/frontend) | Aplicación Ionic + React + TypeScript, requerimientos funcionales y no funcionales, arquitectura de navegación e instrucciones de instalación y ejecución. |
| `backend` | API RESTful con Node.js + Express, conexión a PostgreSQL, autenticación con JWT y archivo `.sql` de la base de datos (Entrega Parcial 2). |

## Tecnologías

- **Frontend:** Ionic Framework, React, TypeScript, React Router, Capacitor y Vite.
- **Backend:** Node.js, Express.js, PostgreSQL, JWT y bcrypt.
- **Diseño:** Figma, con prototipo manual en versión móvil y web.

## Enlaces

- [Documentación completa y requerimientos (rama frontend)](../../tree/frontend#patitasgo--portal-de-adopción-y-rescate-de-animales)
- [Instrucciones de instalación y ejecución](../../tree/frontend#instalación-y-ejecución)
- [Prototipo en Figma](https://www.figma.com/design/5zoQ54KdMQRZyJKPDWX6cI/EP1.3-PatigasGo?node-id=0-1&t=L9dP58QNvqlk4Q2d-1)

## Ejecución rápida

```bash
git clone https://github.com/Panchiky/Portal-de-adopcion-y-rescate-de-animales.git
cd Portal-de-adopcion-y-rescate-de-animales
git checkout frontend
npm install
npm run dev
```
