# MuFireburst Portal Django

## Descripcion

MuFireburst Portal Django es una aplicacion web desarrollada como proyecto final del curso de Python y Django.
El proyecto adapta una web estatica de MuFireburst a una aplicacion con base de datos, administracion, usuarios y formularios.

La aplicacion permite mostrar y administrar noticias, guias, eventos, ranking, descargas, contacto y perfiles de usuario.

## Funcionalidades

- Pagina de inicio con ultimas noticias, eventos y ranking.
- Registro de usuarios.
- Login y logout.
- Perfil de usuario simple.
- Noticias/publicaciones con listado, detalle, creacion, edicion y eliminacion.
- Busqueda de noticias por texto y categoria.
- Seccion de guias.
- Seccion de eventos.
- Ranking de jugadores.
- Descargas.
- Formulario de contacto con validacion.
- Panel admin personalizado para gestionar los modelos.
- Archivos estaticos reutilizados del proyecto MuFireburst original.

## Tecnologias utilizadas

- Python
- Django
- SQLite
- HTML
- CSS
- Bootstrap
- Git y GitHub

## Instalacion local

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
cd mufireburst_django
```

Crear entorno virtual:

```bash
python -m venv env
```

Activar entorno virtual en Windows:

```bash
env\Scripts\activate
```

Activar entorno virtual en macOS/Linux:

```bash
source env/bin/activate
```

Instalar dependencias:

```bash
pip install -r requirements.txt
```

Aplicar migraciones:

```bash
python manage.py migrate
```

Crear superusuario:

```bash
python manage.py createsuperuser
```

Opcional: cargar datos de ejemplo:

```bash
python manage.py loaddata datos_demo.json
```

Ejecutar servidor:

```bash
python manage.py runserver
```

Abrir el proyecto en:

```text
http://127.0.0.1:8000/
```

Panel admin:

```text
http://127.0.0.1:8000/admin/
```

## Carga de datos de prueba

Desde el panel admin se pueden cargar:

- Categorias
- Noticias
- Guias
- Eventos
- Descargas
- Jugadores del ranking
- Mensajes de contacto
- Perfiles

Para que la pagina de inicio muestre contenido, primero se recomienda crear algunas noticias, eventos y jugadores desde el admin.

## URLs principales

- Inicio: `/`
- Noticias: `/noticias/`
- Crear noticia: `/noticias/crear/`
- Guias: `/guias/`
- Eventos: `/eventos/`
- Ranking: `/ranking/`
- Descargas: `/descargas/`
- Tienda: `/tienda/`
- Contacto: `/contacto/`
- Registro: `/registro/`
- Login: `/login/`
- Perfil: `/perfil/`
- Admin: `/admin/`

## Despliegue

El proyecto incluye archivos basicos para desplegar en Render:

- `build.sh`
- `render.yaml`
- configuracion de `ALLOWED_HOSTS`
- configuracion de archivos estaticos con WhiteNoise

Comando de inicio recomendado en Render:

```bash
gunicorn mufireburst_django.wsgi:application
```

Comando de build recomendado:

```bash
./build.sh
```

## Usuario de prueba para Render

El archivo `build.sh` crea automaticamente un superusuario de prueba si no existe:

```text
Usuario: admin
Password: admin1234
```

Estas credenciales son solo para la entrega y pruebas.

## Checklist de entrega

- [x] Panel admin
- [x] Registro y login
- [x] Perfil de usuario
- [x] Paginas funcionales
- [x] Formularios con validacion
- [x] README
- [x] requirements.txt
- [x] Preparacion para Render
- [ ] URL publica final
- [ ] Capturas para Google Slides

## Autor

Proyecto realizado por Rodrigo Cassino como entrega final del curso de Python/Django.
