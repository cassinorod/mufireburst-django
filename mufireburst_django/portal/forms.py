from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Post, Perfil, MensajeContacto


class RegistroUsuarioForm(UserCreationForm):
    email = forms.EmailField(label="Correo electronico", required=True)

    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]

    def clean_email(self):
        email = self.cleaned_data.get("email")
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("Ya existe un usuario con ese correo.")
        return email


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ["titulo", "subtitulo", "contenido", "categoria", "publicado"]

    def clean_titulo(self):
        titulo = self.cleaned_data.get("titulo", "").strip()
        if len(titulo) < 5:
            raise forms.ValidationError("El titulo debe tener al menos 5 caracteres.")
        return titulo

    def clean_contenido(self):
        contenido = self.cleaned_data.get("contenido", "").strip()
        if len(contenido) < 20:
            raise forms.ValidationError("El contenido debe tener al menos 20 caracteres.")
        return contenido


class PerfilForm(forms.ModelForm):
    class Meta:
        model = Perfil
        fields = ["nombre", "apellido", "personaje_favorito", "clase_favorita", "clan"]


class MensajeContactoForm(forms.ModelForm):
    class Meta:
        model = MensajeContacto
        fields = ["nombre", "email", "mensaje"]

    def clean_mensaje(self):
        mensaje = self.cleaned_data.get("mensaje", "").strip()
        if len(mensaje) < 10:
            raise forms.ValidationError("El mensaje debe tener al menos 10 caracteres.")
        return mensaje
