Bienvenidos a tu MD-Links!

Antes de inicializar el programa te recomiendo siempre tener en cuenta estas opciones:

1. la herramienta funciona con archivos markdown entonces si o si debe existir uno
2. Al poner el codigo  ~md-links "adjunte-ruta.md" --help , este te mostrara todos los comandos que puedes utilizar 
para inicializar el proyecto segun tus necesidades.
3. Este proyecto tiene 3 funcionalidades:
  3.1. Puede validar tus archivos para extraer los links totales de la carpeta .md
  3.2. Puede revisar los status de tus archivos .md , adjunta totales y unicos.
  3.3. Valida y revisa tanto los enlaces rotos, totales y unicos en tus archivos .md

Tener en cuenta que por defecto el archivo tiene una configuracion a la hora de llamar a los archivos que necesitas valida.

Acontinuación podras encontrar los enlaces para poder correr las opciones:

1. md-links ./files/demo.md --v    = compila 5 parametros de tus enlaces:
   { href
    text
    file
    status
    message}

2. md-links ./files/demo.md --s    = compila los enlaces unicos y totales
    Total
    Unique

3. md-links ./files/demo.md --v --s = compila los enlaces rotos, unicos y totales:
    Total
    Unique
    Broken

4. md-links ./files/demo.md --help o --h  = te mostrara siempre la informacion de todos los comandos disponibles 
en la consola.