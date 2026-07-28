# Prototipo — Importadora de coches

Prototipo de VENTA. Se enseña a un cliente para cerrar el proyecto.
Solo frontend. Datos mockeados. Sin backend, sin auth, sin base de datos.

## Prioridad
La capa visual es el producto. La lógica de negocio es escenografía.
Nada tiene que funcionar de verdad, pero TODO tiene que verse existiendo:
cada pantalla, cada estado, cada formulario debe estar diseñado y navegable
aunque no envíe nada a ningún sitio.

## Stack
Next.js 15 App Router · TypeScript · Tailwind v4 · GSAP + ScrollTrigger · Lenis
No añadas librerías sin preguntar.

## Regla de fotografía (no negociable)
Las fotos reales las hará el cliente con el móvil: mala luz, fondos sucios.
- Toda imagen dentro de contenedor con aspect-ratio fijo y object-cover
- Gradiente oscuro en el borde inferior de cada imagen
- Ninguna imagen a sangre, ninguna imagen como elemento dominante
- Lo premium se construye con tipografía, espacio y movimiento — nunca con la foto
Test de aceptación: sustituir cualquier imagen por un rectángulo gris no debe
degradar la percepción de calidad.

## Sistema visual
Fondo #0B0C0E · superficies #14161A · bordes #23262B
Texto #F2F0ED / #8A8F96 · acento único #4A7A96 (solo acciones primarias)
Solo grotesk, CERO serifs. Escala de 8px. Radios máx 4px.
Prohibido: glassmorphism, glows, gradientes sobre texto, cards tipo pill.

## Movimiento
Lenis global. Mínimo 4 tipos de entrada distintos, nunca el mismo consecutivo.
Todas las entradas nacen desde abajo (fade-up, scale-up, clip-reveal,
stagger-up). Nunca laterales. Revelados escalonados: label → título → cuerpo
→ CTA. Los números cuentan desde 0. Duraciones 0.6-0.9s, easing custom.
Respetar prefers-reduced-motion siempre.

## Cómo trabajar conmigo
- No construyas más de una ruta por turno.
- Enséñame los tokens y un componente antes de escalarlo.
- No refactorices nada que no te haya pedido.
- Si dudas entre más animación o menos, elige menos y mejor ejecutada.