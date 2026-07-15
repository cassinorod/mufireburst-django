from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from .forms import MensajeContactoForm, PostForm
from .models import Categoria


class FormularioContactoTest(TestCase):
    def test_contacto_valido(self):
        form = MensajeContactoForm(data={
            "nombre": "Rodrigo",
            "email": "rodrigo@mail.com",
            "mensaje": "Este es un mensaje de prueba",
        })
        self.assertTrue(form.is_valid())

    def test_contacto_invalido_mensaje_corto(self):
        form = MensajeContactoForm(data={
            "nombre": "Rodrigo",
            "email": "rodrigo@mail.com",
            "mensaje": "Hola",
        })
        self.assertFalse(form.is_valid())


class PostFormTest(TestCase):
    def setUp(self):
        self.categoria = Categoria.objects.create(nombre="Eventos")

    def test_post_valido(self):
        form = PostForm(data={
            "titulo": "Nueva noticia",
            "subtitulo": "Subtitulo de prueba",
            "contenido": "Contenido suficiente para que el formulario sea valido.",
            "categoria": self.categoria.id,
            "publicado": True,
        })
        self.assertTrue(form.is_valid())


class VistasBasicasTest(TestCase):
    def test_inicio_responde(self):
        response = self.client.get(reverse("inicio"))
        self.assertEqual(response.status_code, 200)

    def test_perfil_requiere_login(self):
        response = self.client.get(reverse("perfil"))
        self.assertEqual(response.status_code, 302)
