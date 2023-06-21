# INICIO DE PROYECTO

## BACK END - GROOVY AND GRAILS
Por defecto se ejecuta en el puerto 8080

### Variables de entorno
Se debe crear en el root del archivo back un file llamado **.env**
Dentro del env van las siguientes variables para el envio de correo por SMTP
> STMP_EMAIL ***tipo de email*** <br>
> SMTP_EMAIL_SENDER ***correo de donde se envia o de configuracion smtp*** <br>
> SMTP_EMAIL_PASSWORD ***contraseña de smtp*** <br>
> SMTP_EMAIL_PORT ***puerto de envio*** <br>

### Base de datos
Ir a la dirección **back/grails-app/conf/application.yml**
Se usa base de datos PostgreSQL en caso de ocupar otra, se requiere el cambio de driver y dialect
En caso contrario solo se necesita cambiar en el **DataSource**
> username
> password
> url

### Inicio de proyecto

cd back

grails

run-app

## FRONT END - ANGULAR
Configurar en el **front/src/environments/environmet.ts**
> endPoint ***url a donde se haran la peticiones***

### Inicio de web

cd front

npm install

ng serve --open

### Pantallas de inicio

La primer pantalla se vera en este estilo
![Muestra Tabla](https://github.com/octaviocel/formularioAlumno/assets/61020722/179fdf84-fabf-447e-8cf5-1629597649e8)

El formulario
![Formulario](https://github.com/octaviocel/formularioAlumno/assets/61020722/8612d16f-55c6-4b56-a6cb-7dda3b2a7f92)

Validaciones del formulario
![Validaciones Formulario](https://github.com/octaviocel/formularioAlumno/assets/61020722/81ee7d48-b153-4e2e-af9d-f10d495a6879)

![Validación de Uusario](https://github.com/octaviocel/formularioAlumno/assets/61020722/c68650f5-21b0-4d5d-9b39-b0d8e0e59430)

Creación de Usuario
![Creado Exitoso](https://github.com/octaviocel/formularioAlumno/assets/61020722/86eefe38-81d5-424a-8538-87bc60d1d5a8)

Envio de correo
![Correo muestra](https://github.com/octaviocel/formularioAlumno/assets/61020722/8e94cd31-58c7-4baf-9d02-03d05a08c2db)






