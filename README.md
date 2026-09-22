# App Dr. Francisco del Canto — PWA

Versión **0.9.0**

## Novedades
- Permite registrar una cirugía pasada o futura.
- Nueva pestaña **Preguntas** en el menú inferior.
- 42 preguntas frecuentes específicas para cadera o rodilla, agrupadas en **Antes / Durante / Después**.
- Guardado local de artículos y ejercicios.
- Pantalla de seguridad separando **emergencia (112)** de **consulta ordinaria con el equipo**.
- Instalación de la PWA desde la propia app.
- Versión visible y botón **Buscar actualizaciones**.
- Mejor funcionamiento offline.
- Opción **Borrar mis datos de este dispositivo**.

## Publicación en GitHub Pages
Reemplaza/sube en la raíz del repositorio:
- `index.html`
- `manifest.webmanifest`
- `service-worker.js`
- `version.json`
- carpeta `icons/`
- carpeta `assets/`

GitHub Pages continuará utilizando la misma URL y la PWA instalada seguirá siendo la misma aplicación.


## Versión 0.9.1

Checklists interactivos y persistentes en las tres primeras etapas de Mi proceso.

## Versión 0.9.2

La versión 0.9.1 sí contenía los nuevos checklists, pero dos textos de la interfaz
seguían mostrando `0.9.0` de forma fija. En 0.9.2 el número visible se toma siempre
de `APP_VERSION`, evitando futuras discrepancias.
