package back

import grails.boot.GrailsApp
import grails.boot.config.GrailsAutoConfiguration

import groovy.transform.CompileStatic
import io.github.cdimascio.dotenv.Dotenv


@CompileStatic
class Application extends GrailsAutoConfiguration {
    static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure().load()
        GrailsApp.run(Application, args)
    }
}