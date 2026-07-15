from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView, LogoutView
from django.db.models import Q
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView, TemplateView

from .forms import RegistroUsuarioForm, PostForm, PerfilForm, MensajeContactoForm
from .models import Post, Categoria, Guia, Evento, Descarga, JugadorRanking, Perfil


class InicioView(TemplateView):
    template_name = "portal/inicio.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["posts"] = Post.objects.filter(publicado=True).select_related("categoria", "autor")[:3]
        context["eventos"] = Evento.objects.filter(activo=True)[:4]
        context["ranking"] = JugadorRanking.objects.all()[:5]
        return context


class AcercaView(TemplateView):
    template_name = "portal/acerca.html"


class TiendaView(TemplateView):
    template_name = "portal/tienda.html"


class PostListView(ListView):
    model = Post
    template_name = "portal/post_list.html"
    context_object_name = "posts"

    def get_queryset(self):
        queryset = Post.objects.filter(publicado=True).select_related("categoria", "autor")
        q = self.request.GET.get("q", "").strip()
        categoria = self.request.GET.get("categoria", "").strip()

        if q:
            queryset = queryset.filter(
                Q(titulo__icontains=q) |
                Q(subtitulo__icontains=q) |
                Q(contenido__icontains=q)
            )

        if categoria:
            queryset = queryset.filter(categoria__id=categoria)

        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["categorias"] = Categoria.objects.all()
        context["q"] = self.request.GET.get("q", "")
        context["categoria_actual"] = self.request.GET.get("categoria", "")
        return context


class PostDetailView(DetailView):
    model = Post
    template_name = "portal/post_detail.html"
    context_object_name = "post"


class PostCreateView(LoginRequiredMixin, CreateView):
    model = Post
    form_class = PostForm
    template_name = "portal/post_form.html"
    success_url = reverse_lazy("post_list")

    def form_valid(self, form):
        form.instance.autor = self.request.user
        messages.success(self.request, "La noticia fue creada correctamente.")
        return super().form_valid(form)


class PostUpdateView(LoginRequiredMixin, UpdateView):
    model = Post
    form_class = PostForm
    template_name = "portal/post_form.html"
    success_url = reverse_lazy("post_list")

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Post.objects.all()
        return Post.objects.filter(autor=self.request.user)

    def form_valid(self, form):
        messages.success(self.request, "La noticia fue actualizada correctamente.")
        return super().form_valid(form)


class PostDeleteView(LoginRequiredMixin, DeleteView):
    model = Post
    template_name = "portal/post_confirm_delete.html"
    success_url = reverse_lazy("post_list")

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Post.objects.all()
        return Post.objects.filter(autor=self.request.user)


class GuiaListView(ListView):
    model = Guia
    template_name = "portal/guia_list.html"
    context_object_name = "guias"


class GuiaDetailView(DetailView):
    model = Guia
    template_name = "portal/guia_detail.html"
    context_object_name = "guia"


class EventoListView(ListView):
    model = Evento
    template_name = "portal/evento_list.html"
    context_object_name = "eventos"

    def get_queryset(self):
        return Evento.objects.filter(activo=True)


class DescargaListView(ListView):
    model = Descarga
    template_name = "portal/descarga_list.html"
    context_object_name = "descargas"

    def get_queryset(self):
        return Descarga.objects.filter(activo=True)


class RankingListView(ListView):
    model = JugadorRanking
    template_name = "portal/ranking.html"
    context_object_name = "jugadores"


class LoginUsuarioView(LoginView):
    template_name = "portal/login.html"


class LogoutUsuarioView(LogoutView):
    next_page = reverse_lazy("inicio")


def registro(request):
    if request.method == "POST":
        form = RegistroUsuarioForm(request.POST)
        if form.is_valid():
            user = form.save()
            Perfil.objects.get_or_create(user=user)
            login(request, user)
            messages.success(request, "Cuenta creada correctamente.")
            return redirect("inicio")
    else:
        form = RegistroUsuarioForm()

    return render(request, "portal/registro.html", {"form": form})


@login_required
def perfil(request):
    perfil_usuario, _ = Perfil.objects.get_or_create(user=request.user)
    return render(request, "portal/perfil.html", {"perfil": perfil_usuario})


@login_required
def editar_perfil(request):
    perfil_usuario, _ = Perfil.objects.get_or_create(user=request.user)
    if request.method == "POST":
        form = PerfilForm(request.POST, instance=perfil_usuario)
        if form.is_valid():
            form.save()
            messages.success(request, "Perfil actualizado correctamente.")
            return redirect("perfil")
    else:
        form = PerfilForm(instance=perfil_usuario)

    return render(request, "portal/editar_perfil.html", {"form": form})


def contacto(request):
    if request.method == "POST":
        form = MensajeContactoForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Mensaje enviado correctamente.")
            return redirect("contacto")
    else:
        form = MensajeContactoForm()

    return render(request, "portal/contacto.html", {"form": form})
