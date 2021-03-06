# Generated by Django 3.2.4 on 2021-06-29 16:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_alter_product_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='shippingPrice',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='taxPrice',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='totalPrice',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='price',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='shippingaddress',
            name='shippingPrice',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
