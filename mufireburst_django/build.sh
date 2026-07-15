#!/usr/bin/env bash
set -o errexit

python -m pip install --upgrade pip
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate --noinput
python manage.py loaddata datos_demo.json || true

# Superusuario simple para pruebas del curso.
# Se puede cambiar despues desde el admin.
python manage.py shell << 'EOF'
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username="admin").exists():
    User.objects.create_superuser("admin", "admin@mufireburst.com", "admin1234")
    print("Superusuario admin creado")
else:
    print("Superusuario admin ya existe")
EOF
