import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatosService } from '../../services/datosService/datos.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { concat } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './createForm.component.html',
  styleUrls: ['./createForm.component.styl']
})

export class CreateFormComponent implements OnInit{

  public nuevaEtiqueta = { id_label: '', description: '', linked: ''};
  public form = {
    id_new_manual: '',
    id_user: '',
    comments: { id: '', id_item: '', data: '', comment: '', version: '', list: '', mensaje: ''},
    documentos: [],
    error: '',
    homologacion: { version: '', template: '', referencia: '', no_: '', mensaje: '',
                    id_item: '', id: '', homologado: '', fecha_inicio: '', fecha_fin: '', estado: '', description: '',
                    current_task_name: '', current_user_name: '' },
    idiomas: [],
    labels: { nivel1: [], nivel2: [], nivel3: []},
    datos_manual: { codigo_manual: '', cod_guia_rapida: '', description_guia_rapida: '', cod_prod_proveedor: '', contenido: '',
                    description: '', error: '', estado: '', fecha_homologado: '', formato: '', homologado: '', id: '', id_familia: '',
                    id_homologacion: '', id_tipo: '', mensaje: '', no_: '', no_hojas: '', no_homologar: false, no_proveedor: '',
                    proveedor: '', referencia: '', version: '', doc: '', familia: '' },
    puntos_uso: [],
  };
  userId: string;
  pointUse: any = {};
  displayedColumns: string[] = ['codigo', 'descripcion', 'referencia'];
  letsboot: string = '';
  showPointsUse: boolean = false;
  newIdioma: string = '';
  newTag: string = '';
  hideContent2: boolean = true;
  hideContent3: boolean = false;
  etiquetasLevel1: any[] = [];
  etiquetasLevel2: any[] = [];
  etiquetasLevel3: any[] = [];
  language: any[] = [];

  /* Variables Control de formulario */
  etiquetas1 = new FormControl();
  etiquetas2 = new FormControl();
  etiquetas3 = new FormControl();
  idiomas = new FormControl();
  tagList1: string[] = [];
  tagList2: string[] = [];
  tagList3: string[] = [];



  /* Eliminar el siguiente objeto una vez conectado con la api y su base de datos */
  datos: any = {formatos: [
                    { value: 'DIN A1', viewValue: 'DIN A1' },
                    { value: 'DIN A2', viewValue: 'DIN A2' },
                    { value: 'DIN A3', viewValue: 'DIN A3' },
                    { value: 'DIN A4', viewValue: 'DIN A4' },
                    { value: 'DIN A5', viewValue: 'DIN A5' },
                    { value: 'DIN A6', viewValue: 'DIN A6' },
                    { value: 'DIN A7', viewValue: 'DIN A7' }
                  ],
                  tipoDocumentacion : [ 'DOC.TECNICA', 'DESCARGAS' ],
                  familias: ['Portero/Videoportero', 'CCTV', 'Incendio', 'Intrusión',
                  'Control de acceso', 'Sonido', 'Intercomunicación', 'Yokis', 'Otros', 'Catálogos'],
                  tagList: ['-', '2 H', '2H - 4H ', '4 + N', '3H', '4 + N', '5 H'],
                  idiomasList: [ 'English', 'Español', 'Italiano', 'Firmware', 'Ficha técnica', 'Link' ],
                  estado: ['Pendiente']
                };

constructor(
  private http: HttpClient,
  private dataService: DatosService,
  private rutaActiva: ActivatedRoute,
  public dialog: MatDialog) {
  this.tagList1 = this.datos.tagList;
  this.userId = this.rutaActiva.params['value'].id;
}

ngOnInit() {
  this.dataService.getEtiquetas()
  .then(data => {
    for (let index = 0; index < data['length']; index++) {
      data[index].select = true;
      this.etiquetasLevel1.push(data[index]);
      this.etiquetasLevel2.push(data[index]);
      this.etiquetasLevel3.push(data[index]);
    }
  })
  .catch(err =>
      console.log('Error', err)
  );

}

mostrarDatos(modal) {
  const dialogRef = this.dialog.open(modal, {
    width: '250px',
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
  console.log(this.form);

  this.dataService.getItemLanguage()
  .then(data => {
    console.log(data);
  })
  .catch(err =>
    console.log('Error', err)
  );
}

addIdioma(idioma) {
  this.datos.idiomasList.push(idioma);
  this.newIdioma = '';
}
getProductDetails(codeProduct) {
  this.dataService.getProductDetails(codeProduct)
      .then(data => {
        this.form.datos_manual.description = data[0].descripcion;
        this.form.datos_manual.referencia = data[0].referencia;
      })
      .catch(err =>
          console.log('Error', err)
      );
}

nextPass(value) {
    if ( value === 'content2' && this.form.datos_manual.codigo_manual !== '') {
      this.hideContent2 = false;
      this.letsboot =  'https://www.doc.golmar.es/search/manual/' + this.form.datos_manual.codigo_manual;
    } else if ( value === 'content2' && this.form.datos_manual.mensaje === '') {
      this.hideContent2 = true;
    } else if ( value === 'content3' && this.form.datos_manual.cod_prod_proveedor !== '') {
      this.hideContent3 = false;
    } else if ( value === 'content3' && this.form.datos_manual.cod_prod_proveedor === '' ) {
      this.hideContent3 = true;
    }
  }
puntosUso() {
  if ( !this.showPointsUse && this.form.datos_manual.codigo_manual !== '') {
    this.dataService.getPointUse( this.form.datos_manual.codigo_manual )
    .then(data => {
      this.pointUse = data;
      if (this.pointUse.length > 0) {
        this.form.puntos_uso.push(data);
        this.showPointsUse = true;
      } else {
        this.pointUse = false;
      }
    })
    .catch(err =>
        console.log('Error', err)
    );
  } else {
    alert('Inserta el codigo de producto');
  }
}

select(value, type) {
  if ( type === 'formato') {
    this.form.datos_manual.formato = value;
  } else if ( type === 'tipDoc') {
    this.form.datos_manual.doc = value;
  } else if ( type === 'familia') {
    this.form.datos_manual.familia = value;
  } else if ( type === 'idioma' ) {
    this.form.datos_manual.id_familia = value;
  }
}

selectTag(value, nivel) {
  if (nivel === '1') {
    console.log(value);
    console.log(nivel);
    this.form.labels.nivel1 = [];
    this.form.labels.nivel1.push(value);
  } else if (nivel === '2') {
    console.log(value);
    console.log(nivel);
    this.form.labels.nivel2 = [];
    this.form.labels.nivel2.push(value);
  } else {
    console.log(value);
    console.log(nivel);
    this.form.labels.nivel3 = [];
    this.form.labels.nivel3.push(value);
  }
}
addTag(tag) {
  this.nuevaEtiqueta.description = tag;
  this.etiquetasLevel1.push(this.nuevaEtiqueta);
  this.etiquetasLevel2.push(this.nuevaEtiqueta);
  this.etiquetasLevel3.push(this.nuevaEtiqueta);
  this.newTag = '';
}
sendForm() {
    console.log(this.form);
  }
}
