# App Dr. Francisco del Canto — PWA

Archivos principales:

- `index.html`: aplicación.
- `manifest.webmanifest`: configuración de instalación PWA.
- `service-worker.js`: caché, actualizaciones y funcionamiento offline básico.
- `icons/`: iconos Android, incluidos iconos `maskable`.

## GitHub Pages

La PWA está preparada para publicarse desde una subcarpeta de GitHub Pages, por ejemplo:

`https://usuario.github.io/app-paco-del-canto/`

Todos los paths son relativos para que funcione correctamente en ese entorno.

## Actualizaciones durante las pruebas

El service worker utiliza una estrategia `network-first` para las navegaciones, de modo que las nuevas versiones publicadas en GitHub Pages tengan prioridad sobre la copia cacheada.
