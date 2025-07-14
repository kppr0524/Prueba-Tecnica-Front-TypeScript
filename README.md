
# Prueba Técnica Front - Gestor de Tareas

Aplicación Angular para la gestión de tareas, desarrollada en TypeScript.

## Funcionalidades
- Listar tareas con título, descripción y estado (pendiente/completada).
- Crear nuevas tareas.
- Marcar tareas como completadas o pendientes.
- Eliminar tareas.
- Editar título y descripción de una tarea.

## Requisitos técnicos
- Proyecto en TypeScript.
- Componentes standalone, servicios y manejo de estado con RxJS.
- Código limpio, comentado y estructurado.
- Tipado fuerte en todo el código.
- Validaciones en formularios.
- 100% responsivo (móvil y escritorio).
- Pruebas unitarias básicas.

## Instalación
1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   cd Prueba-Tecnica-Front-TypeScript
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución
Para iniciar el servidor de desarrollo:
```bash
npm start
```
Abre tu navegador en [http://localhost:4200](http://localhost:4200)

## Testing
Para ejecutar las pruebas unitarias:
```bash
npm test
```

## Estructura principal
- `src/app/features/tasks/` → Componentes y servicio de tareas.
- `src/app/app.html` → Template principal (solo `<router-outlet>`).
- `src/app/app.scss` → Estilos globales y responsivos.

## Notas
- El proyecto es standalone y no usa módulos tradicionales de Angular.
- Para ver el gestor de tareas, navega a `/tareas` en la app.

---
Desarrollado para prueba técnica.
