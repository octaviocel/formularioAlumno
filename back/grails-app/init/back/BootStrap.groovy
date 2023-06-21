package back


class BootStrap {

    def init = { servletContext ->

    }
    def destroy = {
    }
}

// import io.github.cdimascio.dotenv.Dotenv
// import org.springframework.context.ApplicationContextInitializer
// import org.springframework.context.support.GenericApplicationContext

// class BootStrap implements ApplicationContextInitializer<GenericApplicationContext> {

//     void initialize(GenericApplicationContext applicationContext) {
//         // Cargar variables de entorno desde el archivo .env en una ruta relativa
//         Dotenv dotenv = Dotenv.configure().load()

//         String email = dotenv.get('STMP_EMAIL')
//         String sender = dotenv.get('SMTP_EMAIL_SENDER')
//         String pass = dotenv.get('SMTP_EMAIL_PASSWORD')
//         String port = dotenv.get('SMTP_EMAIL_PORT')

//         println(email)
//         println(sender)
//         println(pass)
//         println(port)
//     }
// }