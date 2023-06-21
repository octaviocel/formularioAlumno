import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Alumno } from 'src/app/Interfaces/alumno';
import { AlumnoService } from 'src/app/Services/alumno.service';

@Component({
  selector: 'app-dialog-delete-alumno',
  templateUrl: './dialog-delete-alumno.component.html',
  styleUrls: ['./dialog-delete-alumno.component.css']
})
export class DialogDeleteAlumnoComponent implements OnInit{

  constructor(
    private dialogoReferencia: MatDialogRef<DialogDeleteAlumnoComponent>,
    
    @Inject(MAT_DIALOG_DATA) public alumno: Alumno
  ){}

  ngOnInit(): void {
    if(this.alumno){
      this.alumno.nombre = this.alumno.nombre.replace(/&nbsp;/g, ' ');
    }
  }

  confirmarEliminar(){
    if(this.alumno){
      this.dialogoReferencia.close("eliminar");
    }
  }
}
