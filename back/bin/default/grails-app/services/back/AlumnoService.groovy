package back

import grails.gorm.transactions.Transactional
import java.util.Random
import org.mindrot.jbcrypt.BCrypt
import javax.mail.*
import javax.mail.internet.*
import io.github.cdimascio.dotenv.Dotenv
import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

@Transactional
class AlumnoService {

   def getAll(def params, def request){
    return Alumno.findAll()
   }

   def getAlumnoById(def params, def request){
    return Alumno.findById(params?.id)
   }

   def saveAlumno(def params, def request){

    def matricula = request.JSON.matricula
    def correo = request.JSON.correo
    def nombre = request.JSON.nombre

    //println("matricula: " + correo)
    def existeAlumno = Alumno.findByMatricula(matricula)
    //println("existeAlumno: " + existeAlumno)
    if (existeAlumno) {
        throw new ResponseStatusException(HttpStatus.CONFLICT, "La Matricula ya ha sido registrada")
    }

    def existeCorreo = Alumno.findByCorreo(correo)
    if (existeCorreo) {
        throw new ResponseStatusException(HttpStatus.CONFLICT, "El Correo ya ha sido registrado")
    }

    def existeNombre = Alumno.findByNombre(nombre)
    if (existeNombre) {
        throw new ResponseStatusException(HttpStatus.CONFLICT, "El Alumno ya ha sido registrado")
    }

    def password = generateRandomPassword()
    def hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt())

   
    
    def alumno = new Alumno(request.JSON)
    alumno.password = hashedPassword

    alumno.save()

    //Descomentar para enviar correo
    enviarCorreo(alumno.correo, alumno.nombre, alumno.matricula, password)

    return alumno
   }

   def updateAlumno(def params, def request){
    def alumno = Alumno.findById(params?.id)
    alumno.properties = request.JSON
    alumno.merge()
    return alumno
   }

   def deleteAlumno(def params, def request){
    def alumno = Alumno.findById(params?.id)
    alumno.delete()
    return alumno
   }

   def generateRandomPassword(){
    String allowedChars = 'ABC0123456789DEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    StringBuilder password = new StringBuilder()

    (1..12).each {
        password.append(allowedChars[new Random().nextInt(allowedChars.length())])
    }

    return password.toString()
   }

   def enviarCorreo(def correo, def nombre, def matricula, def password){
        Dotenv dotenv = Dotenv.configure().load()

        String email = dotenv.get('STMP_EMAIL')
        String sender = dotenv.get('SMTP_EMAIL_SENDER')
        String pass = dotenv.get('SMTP_EMAIL_PASSWORD')
        String port = dotenv.get('SMTP_EMAIL_PORT')


        Properties props = new Properties()
        props.put('mail.smtp.host', email) 
        props.put('mail.smtp.port', port) 
        props.put('mail.smtp.auth', 'true') 
        props.put('mail.smtp.starttls.enable', 'true') 

    
        def session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(sender, pass) 
            }
        })

        def message = new MimeMessage(session)
        message.setFrom(new InternetAddress(sender)) 
        message.addRecipient(Message.RecipientType.TO, new InternetAddress(correo))
        message.setSubject('Registro exitoso')
        
        String[] alumnoPartes = nombre.split("&");
        String alumnoNombre = alumnoPartes[0].trim();
        message.setText("¡Hola ${alumnoNombre}!\n\nTu registro ha sido exitoso. Las Claves de tu ingreso a tu portal serán\n\nTu matrícula: ${matricula}\nTu contraseña: ${password}.\n\n\nSaludos")

        Transport.send(message)
   }
}
