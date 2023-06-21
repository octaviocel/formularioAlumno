import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Alumno } from './Interfaces/alumno';
import { AlumnoService } from './Services/alumno.service';

import { DialogAddEditAlumnoComponent } from './Dialogs/dialog-add-edit-alumno/dialog-add-edit-alumno.component';
import { DialogDeleteAlumnoComponent } from './Dialogs/dialog-delete-alumno/dialog-delete-alumno.component';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['Matricula', 'NombreCompleto', 'Correo', 'NivelAcademico', 'Programa', 'Semestre', 'Acciones'];
  dataSource = new MatTableDataSource<Alumno>();

  constructor(
    private alumnoService: AlumnoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.mostrarEmpleados();
  }

  mostrarEmpleados() {
    this.alumnoService.getAllAlumnos().subscribe({
      next: (alumnos) => {
        //console.log(alumnos)
        for (let alumno of alumnos) {
          alumno.nombre = alumno.nombre.replace(/&nbsp;/g, ' ');
        }
        this.dataSource.data = alumnos;
      },
      error: (err) => console.log(err)
    }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  crearAlumnoDialogo() {
    this.dialog.open(DialogAddEditAlumnoComponent, {
      disableClose: true,
      width: '500px'
    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado") {
        this.mostrarEmpleados();
      }
    })
  }

  editarAlumnoDialogo(alumno: Alumno) {
    this.dialog.open(DialogAddEditAlumnoComponent, {
      disableClose: true,
      width: '500px',
      data: alumno
    }).afterClosed().subscribe(resultado => {
      if (resultado === "editado") {
        this.mostrarEmpleados();
      }
    })
  }

  eliminarAlumnoDialogo(alumno: Alumno) {
    this.dialog.open(DialogDeleteAlumnoComponent, {
      disableClose: true,
      width: '300px',
      data: alumno
    }).afterClosed().subscribe(resultado => {
      if (resultado === "eliminar") {
        this.alumnoService.deleteAlumno(alumno.id).subscribe({
          next: (data) => {
            this.openSnackBar("Alumno eliminado correctamente", "Listo")
            this.mostrarEmpleados();
          },
          error: (err) => {
            this.openSnackBar("Error al eliminar el alumno", "Listo")
          }
        })
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}

