# Auditoría rápida de errores y ajustes (frontend)

## Hallazgos detectados
1. **Navbar con estilos inline por JS**: generaba desalineación visual entre desktop/móvil por cambios de padding hardcodeados.
2. **Bloque hero sin contenedor con ancho controlado**: el heading podía verse "corrido" o poco equilibrado en pantallas anchas.
3. **Visibilidad de imágenes mejorable**: filtros de gris/contraste oscurecían demasiado las fotos en secciones de contenido.
4. **Vínculos externos sin `rel` en algunos CTAs**: mejora de seguridad pendiente en links con `target="_blank"`.

## Correcciones implementadas
- Navbar ahora usa clase `.is-scrolled` en vez de estilos inline para mantener alineación consistente.
- Se agregó `.hero-content` con ancho máximo y se equilibró `h1` con `max-width`.
- Se mejoró la renderización de fotos (`object-position`, `box-shadow`, brillo/contraste) para que no “se pierdan”.
- Se añadieron `rel="noopener noreferrer"` en enlaces externos faltantes.

## Próximos checks recomendados
- Validar manualmente en móvil real (iOS/Android) spacing del navbar + sticky CTA.
- Sustituir placeholders restantes por métricas/casos reales para reforzar confianza.
- Conectar `dataLayer` con GA4 o GTM para ver eventos de CTA/form en producción.
