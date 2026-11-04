Pero

# Pendientes del proyecto

Última actualización: 29 de octubre de 2026.

## Depende del backend

- [ ] **Formulario de contacto**: hoy solo marca "solicitud recibida" y no envía nada (`contact.component.ts`).
- [ ] **Valoración virtual**: muestra éxito aunque falle la subida a Cloudinary y descarta las URLs de las fotos (`virtual-consultation.component.ts`).
- [ ] **Validación de formularios**: formato de teléfono y correo, y mensajes de error por campo.
- [ ] **Chat**: el asistente responde "Recibido" a todo (`shared/services/chat.ts`). Conectarlo a algo real o quitarlo.

## Depende del cliente (contenido)

- [ ] **Páginas legales**: política de privacidad y tratamiento de datos (Ley 1581, Habeas Data), y términos. Se recogen fotos dentales, que son datos sensibles. Hacerlo antes de promocionar el sitio.
- [ ] **Aviso de cookies**, si se agregan analíticas o píxeles.
- [ ] **Preguntas frecuentes**: 6 a 12 preguntas con respuesta en texto plano (¿duele?, ¿cuánto dura?, ¿cómo se paga?).
- [ ] **Afirmaciones a confirmar**: "más de 15 años", "maestros ceramistas", "clase mundial", "casos certificados" (`portfolio.service.ts` y plantillas).
- [ ] **Videos con voz en español**: el video de invitación del Dr. y los testimonios están hablados en español; en inglés faltan subtítulos o versiones dobladas.
- [ ] **Backend del chat**: la función de Supabase recibe `language` (`en-US`, `en-GB` o `es`) en cada mensaje; hay que hacer que responda en ese idioma.
- [ ] **Revisión de las traducciones** al inglés por una persona nativa o por el cliente (`src/app/i18n/en-us` y `en-gb`).
- [ ] **Search Console**: tras el deploy, reenviar `sitemap.xml` (ahora lista 42 URLs con hreflang). Regenerarlo con `npm run build && npm run sitemap` cuando cambien las rutas.

## Técnico

- [x] Traducir los subtítulos de los tratamientos (ahora viven en `src/app/i18n/<idioma>/services.json`).
- [ ] Agregar `width` y `height` a las imágenes (hoy llevan `loading="lazy"`, pero no dimensiones).
- [ ] Decidir si se quita el tilt 3D de la home (4 tarjetas con `appTilt3d`). Solo funciona con mouse.
- [ ] Subir el tamaño del texto "ORIENTE" del logo en la barra (mide 7 a 8 px).
- [ ] Escribir un `README.md` propio del proyecto (el actual es el de la plantilla de Angular).
- [x] Correr `ng test` y revisar los specs del chat.
- [ ] Revisar en celular real la home, la sección de ortodoncia y las secciones oscuras.

## Después del primer deploy

- [ ] Search Console: el sitemap se envió el 29 oct 2026 y aparece "No se ha podido obtener", lo normal justo después de enviarlo. Si el 1 de noviembre sigue igual, borrarlo y volver a enviarlo (el archivo responde 200 y lista 14 URLs). Revisar entonces Indexación > Páginas para ver cuántas están indexadas.
- [ ] Probar el enlace en WhatsApp y en el depurador de Facebook para ver la imagen de vista previa.
