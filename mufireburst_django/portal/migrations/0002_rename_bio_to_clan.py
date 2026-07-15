# Generated manually for the course project

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("portal", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="perfil",
            old_name="bio",
            new_name="clan",
        ),
        migrations.AlterField(
            model_name="perfil",
            name="clan",
            field=models.CharField(blank=True, max_length=80),
        ),
    ]
