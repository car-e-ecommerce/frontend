import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Params } from '@angular/router';

export interface PeriodicElement {
  descripcion: string;
  codigo: number;
  referencia: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { codigo: 45796, descripcion: "hauysh", referencia: 3201500 },
  { codigo: 3218, descripcion: "hayabusa", referencia: 315794 },
  { codigo: 46721, descripcion: "yamaha", referencia: 64895 }
];

@Component({
  selector: 'app-root',
  templateUrl: './editProduct.component.html',
  styleUrls: ['./editProduct.component.styl']
})

export class EditProductComponent {
  idProduct: any;
  userId: any;
  letsboot =  ' https://www.golmar.es ' ;

  displayedColumns: string[] = ['codigo', 'descripcion', 'referencia'];
  columnasEstado: string[] = ['idRegistro', 'usuario', 'fechaValidacion', 'estado'];

  productComercial: boolean = false;
  homologado: boolean = false;
  noHomolog: boolean = false;
  disabled: boolean = true;

  howPointsUse: boolean = false;
  newIdioma: string = '';
  newTag: string = '';
  showPointsUse: boolean = false;

  tagList2: string[] = [];
  tagList3: string[] = [];


  /* Variables Control de formulario */
  etiquetas1 = new FormControl();
  etiquetas2 = new FormControl();
  etiquetas3 = new FormControl();
  idiomas = new FormControl();

  public form = {
    codigo: '54678',
    descripcion: 'Terminal test 2',
    referencia: '6428',
    codigoGuia: '48136',
    descCodeGuia: 'descripcion del termianl test2',
    notas: 'Totas las pruebas son necesarias',
    codProveedor: '4513',
    proveedor: 'Marvel',
    formato: 'DIN4',
    numeroHojas: '4',
    version: '0219',
    tipoDoc: 'doc.tecnica',
    familia: 'austin',
    idioma: [],
    editarRevision: '',
    editarHomologado: '',
    editarProductComercial: '',
  };

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
                  estado: [{idRegistro: 4578, usuario: 'Eric Morcillo', fechaValidacion: '14/05/2019', estado: 'homologar'},
                  {idRegistro: 4678, usuario: 'Aris', fechaValidacion: '14/05/2019', estado: 'revision'},
                  {idRegistro: 3256, usuario: 'Juan Carlos ', fechaValidacion: '14/05/2019', estado: 'publicar'}],
                  puntosDeUso: [{ codigo: 45796, descripcion: 'hauysh', referencia: 3201500 },
                  { codigo: 3218, descripcion: 'hayabusa', referencia: 315794 },
                  { codigo: 46721, descripcion: 'yamaha', referencia: 64895 }]
                };

  constructor(private rutaActiva: ActivatedRoute) {
    this.userId = this.rutaActiva.params['value'].userId;
    this.idProduct = this.rutaActiva.params['value'].idProduct;
  }

  OnInit() {
  }

  puntosUso() {
    this.showPointsUse = !this.showPointsUse;
  }

  addTag(tag) {
    this.datos.tagsList.push(tag);
    this.newTag = '';
  }

  addIdioma(idioma) {
    this.form.idioma.push(idioma);
    this.datos.idiomasList.push(idioma);
    this.newIdioma = '';
  }

  isSelected(value, nivel) {

    if ( nivel === 'nivel2') {
      this.tagList2 = [];
      console.log(this.tagList2);
      for (let i = 0; i < this.datos.tagList.length; i++) {
        if (value.value[i] !== this.datos.tagList[i]) {
          this.tagList2.push(this.datos.tagList[i]);
        }
      }
    } else if (nivel === 'nivel3') {
      this.tagList3 = [];
      console.log(this.tagList3);
      for (let i = 0; i < this.datos.tagList.length; i++) {
        if (value.value[i] !== this.datos.tagList[i]) {
          this.tagList3.push(this.datos.tagList[i]);
        }
      }
    }
  }
}
