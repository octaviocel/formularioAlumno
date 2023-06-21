package back


import grails.rest.*
import grails.converters.*

class AlumnoController extends RestfulController {
    def alumnoService

    static responseFormats = ['json', 'xml']

    AlumnoController() {
        super(Alumno)
    }

    @Override
    def index(){
        respond alumnoService.getAll(params, request)
    }

    @Override
    def show(){
        respond alumnoService.getAlumnoById(params, request)
    }

    @Override
    def save(){
        respond alumnoService.saveAlumno(params, request)
    }

    @Override
    def update(){
        respond alumnoService.updateAlumno(params, request)
    }

    @Override
    def delete(){
        respond alumnoService.deleteAlumno(params, request)
    }   
}
