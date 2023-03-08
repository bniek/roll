# Generated by Django 4.0.3 on 2023-03-08 00:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_remove_automobilevo_import_href'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appointments',
            old_name='bought_here',
            new_name='completed',
        ),
        migrations.RemoveField(
            model_name='appointments',
            name='automobile',
        ),
        migrations.RemoveField(
            model_name='appointments',
            name='date_time',
        ),
        migrations.AddField(
            model_name='appointments',
            name='date',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='appointments',
            name='time',
            field=models.TimeField(null=True),
        ),
        migrations.AddField(
            model_name='appointments',
            name='vin',
            field=models.CharField(max_length=17, null=True),
        ),
        migrations.AddField(
            model_name='appointments',
            name='vip',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='automobilevo',
            name='color',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='automobilevo',
            name='import_href',
            field=models.CharField(max_length=200, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='automobilevo',
            name='year',
            field=models.PositiveSmallIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='appointments',
            name='reason',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='appointments',
            name='technician',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='technician', to='service_rest.technician'),
        ),
    ]