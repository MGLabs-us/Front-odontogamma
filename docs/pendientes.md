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
- [ ] **Dirección de la sede**: agregarla al `Dentist` de `src/index.html` (calle y coordenadas mejoran el SEO local).
- [ ] **Preguntas frecuentes**: 6 a 12 preguntas con respuesta en texto plano (¿duele?, ¿cuánto dura?, ¿cómo se paga?).
- [ ] **Afirmaciones a confirmar**: "más de 15 años", "maestros ceramistas", "clase mundial", "casos certificados" (`portfolio.service.ts` y plantillas).
- [ ] **Precios**: descartado por ahora; decisión del cliente.

## Técnico

- [ ] Traducir los subtítulos en inglés de los tratamientos (`portfolio.service.ts`: "Porcelain Veneers & Feldspathic Artistry", etc.).
- [ ] Agregar `width` y `height` a las imágenes (hoy llevan `loading="lazy"`, pero no dimensiones).
- [ ] Decidir si se quita el tilt 3D de la home (4 tarjetas con `appTilt3d`). Solo funciona con mouse.
- [ ] Subir el tamaño del texto "ORIENTE" del logo en la barra (mide 7 a 8 px).
- [ ] Escribir un `README.md` propio del proyecto (el actual es el de la plantilla de Angular).
- [ ] Correr `ng test` y revisar los specs del chat.
- [ ] Revisar en celular real la home, la sección de ortodoncia y las secciones oscuras.

## Después del primer deploy

- [ ] Search Console (la propiedad ya está creada): enviar `https://odontogammaoriente.com/sitemap.xml` en Indexación > Sitemaps y, con la URL Inspection, pedir indexación de la home y de `/servicios`.
- [ ] Probar el enlace en WhatsApp y en el depurador de Facebook para ver la imagen de vista previa.
