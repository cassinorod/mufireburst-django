from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.urls import reverse


class Categoria(models.Model):
    nombre = models.CharField(max_length=60)

    class Meta:
        verbose_name = "categoria"
        verbose_name_plural = "categorias"
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre


class Post(models.Model):
    titulo = models.CharField(max_length=120)
    subtitulo = models.CharField(max_length=180, blank=True)
    contenido = models.TextField()
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, blank=True)
    autor = models.ForeignKey(User, on_delete=models.CASCADE)
    publicado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-fecha_creacion"]
        verbose_name = "noticia"
        verbose_name_plural = "noticias"

    def __str__(self):
        return self.titulo

    def clean(self):
        if len(self.titulo.strip()) < 5:
            raise ValidationError("El titulo debe tener al menos 5 caracteres.")

    def get_absolute_url(self):
        return reverse("post_detalle", args=[self.pk])


class Guia(models.Model):
    NIVEL_CHOICES = [
        ("basica", "Basica"),
        ("media", "Media"),
        ("avanzada", "Avanzada"),
    ]

    titulo = models.CharField(max_length=120)
    descripcion = models.CharField(max_length=180)
    contenido = models.TextField()
    nivel = models.CharField(max_length=20, choices=NIVEL_CHOICES, default="basica")
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["titulo"]

    def __str__(self):
        return self.titulo


class Evento(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    horario = models.CharField(max_length=80, blank=True)
    activo = models.BooleanField(default=True)
    imagen = models.CharField(max_length=120, blank=True, help_text="Ejemplo: event-blood-castle.jpg")

    class Meta:
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre


class Descarga(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    tipo = models.CharField(max_length=50, default="Cliente")
    link = models.URLField(blank=True)
    activo = models.BooleanField(default=True)

    class Meta:
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre


class JugadorRanking(models.Model):
    posicion = models.PositiveIntegerField()
    personaje = models.CharField(max_length=50)
    clase = models.CharField(max_length=50)
    nivel = models.PositiveIntegerField(default=400)
    resets = models.PositiveIntegerField(default=0)
    clan = models.CharField(max_length=50, blank=True)

    class Meta:
        ordering = ["posicion"]
        verbose_name = "jugador del ranking"
        verbose_name_plural = "jugadores del ranking"

    def __str__(self):
        return f"#{self.posicion} - {self.personaje}"


class Perfil(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=60, blank=True)
    apellido = models.CharField(max_length=60, blank=True)
    personaje_favorito = models.CharField(max_length=60, blank=True)
    clase_favorita = models.CharField(max_length=60, blank=True)
    clan = models.CharField(max_length=80, blank=True)

    class Meta:
        verbose_name = "perfil"
        verbose_name_plural = "perfiles"

    def __str__(self):
        return self.user.username


class MensajeContacto(models.Model):
    nombre = models.CharField(max_length=80)
    email = models.EmailField()
    mensaje = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)
    leido = models.BooleanField(default=False)

    class Meta:
        ordering = ["-fecha"]
        verbose_name = "mensaje de contacto"
        verbose_name_plural = "mensajes de contacto"

    def __str__(self):
        return f"Mensaje de {self.nombre}"
