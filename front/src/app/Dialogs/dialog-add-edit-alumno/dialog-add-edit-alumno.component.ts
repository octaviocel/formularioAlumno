import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Alumno } from 'src/app/Interfaces/alumno';
import { AlumnoService } from 'src/app/Services/alumno.service';



@Component({
  selector: 'app-dialog-add-edit-alumno',
  templateUrl: './dialog-add-edit-alumno.component.html',
  styleUrls: ['./dialog-add-edit-alumno.component.css'],

})
export class DialogAddEditAlumnoComponent implements OnInit {

  alumnoForm: FormGroup;
  tituloAccion: string = "Nuevo";
  botonAccion: string = "Guardar";
  listaNivelesAcademicos: string[] = ['Bachillerato', 'Licenciatura', 'Postgrado'];
  listaProgramasAcademicos: string[] = [];
  isLoading: boolean = false;

  constructor(
    private dialogoReferencia: MatDialogRef<DialogAddEditAlumnoComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private alumnoService: AlumnoService,

    @Inject(MAT_DIALOG_DATA) public alumno: Alumno
  ) {
    this.alumnoForm = this.fb.group({
      matricula: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{20,}')]],
      semestre: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      correo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
      nivel_academico: ['', Validators.required],
      programa_academico: ['Bachillerato', Validators.required]
    })
  }

  addEditAlumno() {
    //console.log(this.alumnoForm);
    // console.log(this.alumnoForm.value);
    this.isLoading = true;
    const modelo: Alumno = {
      id: 0,
      matricula: this.alumnoForm.value.matricula,
      nombre: this.alumnoForm.value.nombre.trim().replace(/\s{2,}/g, ' ').replace(/\s/g, '&nbsp;'),
      semestre: this.alumnoForm.value.semestre,
      correo: this.alumnoForm.value.correo,
      nivel_academico: this.alumnoForm.value.nivel_academico,
      programa_academico: this.alumnoForm.value.programa_academico
    }

    //console.log(modelo)

    if (this.alumno === null) {
      this.alumnoService.createAlumno(modelo).subscribe({
        next: data => {
          this.openSnackBar("Alumno fue creado", 'Listo');
          this.dialogoReferencia.close("creado");
          this.isLoading = false;
        },
        error: error => {
          console.log(error)
          this.openSnackBar(error.error.message, 'Cerrar');
          this.isLoading = false;
        }
      })
    } else {
      //console.log(modelo)
      this.alumnoService.updateAlumno(this.alumno.id, modelo).subscribe({
        next: data => {
          this.openSnackBar("Alumno fue editado con exito", 'Listo');
          this.dialogoReferencia.close("editado");
          this.isLoading = false;
        },
        error: error => {
          console.log(error)
          this.openSnackBar(error.error.message, 'Cerrar');
          this.isLoading = false;
        }
      })
    }
  }

  ngOnInit(): void {
    if (this.alumno) {

      this.alumnoForm.patchValue({
        matricula: this.alumno.matricula,
        nombre: this.alumno.nombre,
        correo: this.alumno.correo,
        nivel_academico: this.alumno.nivel_academico,
        programa_academico: this.alumno.programa_academico,
        semestre: this.alumno.semestre
      })
      this.cambiarProgramas();
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
  }

  cambiarProgramas() {
    if (this.alumnoForm.value.nivel_academico == 'Bachillerato') {
      this.listaProgramasAcademicos = ['Bachillerato'];
    } else if (this.alumnoForm.value.nivel_academico == 'Licenciatura') {
      this.listaProgramasAcademicos = ['Ing. Software y Sist.', 'Ing. Electronica', 'Ing. Civil', 'Arquitectura', 'Ing. Industrial', 'Ing. Mecatronica',
        'Lic. Derecho', 'Lic. Educación', 'Lic. Psicología', 'Lic. Contaduría', 'Enfermería'];
    } else {
      this.listaProgramasAcademicos = ['Fiscal', 'Educación', 'Tecnologías de la Información']
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
