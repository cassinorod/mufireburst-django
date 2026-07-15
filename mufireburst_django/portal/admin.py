from django.contrib import admin
from .models import (
    Categoria,
    Post,
    Guia,
    Evento,
    Descarga,
    JugadorRanking,
    Perfil,
    MensajeContacto,
)


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("nombre",)
    search_fields = ("nombre",)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("titulo", "categoria", "autor", "publicado", "fecha_creacion")
    list_filter = ("publicado", "categoria", "fecha_creacion")
    search_fields = ("titulo", "subtitulo", "contenido", "autor__username")
    list_select_related = ("categoria", "autor")


@admin.register(Guia)
class GuiaAdmin(admin.ModelAdmin):
    list_display = ("titulo", "nivel", "fecha_creacion")
    list_filter = ("nivel",)
    search_fields = ("titulo", "descripcion", "contenido")


@admin.register(Evento)
class EventoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "horario", "activo")
    list_filter = ("activo",)
    search_fields = ("nombre", "descripcion")


@admin.register(Descarga)
class DescargaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "tipo", "activo")
    list_filter = ("tipo", "activo")
    search_fields = ("nombre", "descripcion")


@admin.register(JugadorRanking)
class JugadorRankingAdmin(admin.ModelAdmin):
    list_display = ("posicion", "personaje", "clase", "nivel", "resets", "clan")
    list_filter = ("clase",)
    search_fields = ("personaje", "clan")


@admin.register(Perfil)
class PerfilAdmin(admin.ModelAdmin):
    list_display = ("user", "nombre", "apellido", "personaje_favorito", "clase_favorita", "clan")
    search_fields = ("user__username", "nombre", "apellido", "personaje_favorito", "clan")


@admin.register(MensajeContacto)
class MensajeContactoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "email", "fecha", "leido")
    list_filter = ("leido", "fecha")
    search_fields = ("nombre", "email", "mensaje")
