# LUKS

Lukas es un proyecto que te ayuda a tener el control de tus ingresos y gastos.

## Inicializar proyecto

Para poder trabajar con este proyecto, debes seguir los siguientes pasos:

1. Habilitar el driver de PostgreSQL en tu archivo php.ini, descomenta `extension=pdo_pgsql`
2. Instalar las librerías y dependencias del proyecto con el comando `$ composer install`
3. Crear una base de datos llamada "lukas" en PostgreSQL
4. Configurar la conexión a la base de datos en el archivo `.env`, reemplazando los valores por los correspondientes a tu entorno (ver más abajo)
5. Ejecutar las migraciones del proyecto
6. Ejecutar seeders del proyecto

### Migraciones

`$ php artisan migrate`

    El proyecto a utilizar módulos se deben ejecutar las migraciones de estos, recomendamos seguir el siguiente orden para evitar conflictos

    ```
    $ php artisan module:migrate
    ```

### Seeders

```
$ php artisan module:seed EstadosUsuario
```
