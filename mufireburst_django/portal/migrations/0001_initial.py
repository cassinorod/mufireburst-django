from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Categoria",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("nombre", models.CharField(max_length=60)),
            ],
            options={
                "verbose_name": "categoria",
                "verbose_name_plural": "categorias",
                "ordering": ["nombre"],
            },
        ),
        migrations.CreateModel(
            name="Descarga",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("nombre", models.CharField(max_length=100)),
                ("descripcion", models.TextField()),
                ("tipo", models.CharField(default="Cliente", max_length=50)),
                ("link", models.URLField(blank=True)),
                ("activo", models.BooleanField(default=True)),
            ],
            options={"ordering": ["nombre"]},
        ),
        migrations.CreateModel(
            name="Evento",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("nombre", models.CharField(max_length=100)),
                ("descripcion", models.TextField()),
                ("horario", models.CharField(blank=True, max_length=80)),
                ("activo", models.BooleanField(default=True)),
                ("imagen", models.CharField(blank=True, help_text="Ejemplo: event-blood-castle.jpg", max_length=120)),
            ],
            options={"ordering": ["nombre"]},
        ),
        migrations.CreateModel(
            name="Guia",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("titulo", models.CharField(max_length=120)),
                ("descripcion", models.CharField(max_length=180)),
                ("contenido", models.TextField()),
                ("nivel", models.CharField(choices=[("basica", "Basica"), ("media", "Media"), ("avanzada", "Avanzada")], default="basica", max_length=20)),
                ("fecha_creacion", models.DateTimeField(auto_now_add=True)),
            ],
            options={"ordering": ["titulo"]},
        ),
        migrations.CreateModel(
            name="JugadorRanking",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("posicion", models.PositiveIntegerField()),
                ("personaje", models.CharField(max_length=50)),
                ("clase", models.CharField(max_length=50)),
                ("nivel", models.PositiveIntegerField(default=400)),
                ("resets", models.PositiveIntegerField(default=0)),
                ("clan", models.CharField(blank=True, max_length=50)),
            ],
            options={
                "verbose_name": "jugador del ranking",
                "verbose_name_plural": "jugadores del ranking",
                "ordering": ["posicion"],
            },
        ),
        migrations.CreateModel(
            name="MensajeContacto",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("nombre", models.CharField(max_length=80)),
                ("email", models.EmailField(max_length=254)),
                ("mensaje", models.TextField()),
                ("fecha", models.DateTimeField(auto_now_add=True)),
                ("leido", models.BooleanField(default=False)),
            ],
            options={
                "verbose_name": "mensaje de contacto",
                "verbose_name_plural": "mensajes de contacto",
                "ordering": ["-fecha"],
            },
        ),
        migrations.CreateModel(
            name="Perfil",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("nombre", models.CharField(blank=True, max_length=60)),
                ("apellido", models.CharField(blank=True, max_length=60)),
                ("personaje_favorito", models.CharField(blank=True, max_length=60)),
                ("clase_favorita", models.CharField(blank=True, max_length=60)),
                ("bio", models.TextField(blank=True)),
                ("user", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                "verbose_name": "perfil",
                "verbose_name_plural": "perfiles",
            },
        ),
        migrations.CreateModel(
            name="Post",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("titulo", models.CharField(max_length=120)),
                ("subtitulo", models.CharField(blank=True, max_length=180)),
                ("contenido", models.TextField()),
                ("publicado", models.BooleanField(default=True)),
                ("fecha_creacion", models.DateTimeField(auto_now_add=True)),
                ("autor", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ("categoria", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to="portal.categoria")),
            ],
            options={
                "verbose_name": "noticia",
                "verbose_name_plural": "noticias",
                "ordering": ["-fecha_creacion"],
            },
        ),
    ]
