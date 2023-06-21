package back

import javax.persistence.Transient

class Alumno {

    Long id
    String correo
    String matricula
    Integer semestre
    String nivel_academico
    String programa_academico
    String nombre
    
    @Transient
    String password
    


    static mapping={
        id generator: 'identity'
        autoTimerstamp true
    }

    static constraints = {
        correo nullable: false, blank: false
        matricula nullable: false, blank: false, maxSize: 9, unique: true
        semestre nullable: false, blank: false, min: 1, max: 10
        nivel_academico nullable: false, blank: false
        programa_academico nullable: false, blank: false
        nombre nullable: false, blank: false, minSize: 30, maxSize: 100
        password nullable: true
       
    }
}
