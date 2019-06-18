import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ExcelService } from '../../services/excel.service';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { DatosService } from '../../services/datosService/datos.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl']
})

export class ListComponent implements OnInit {

  constructor(private excelService: ExcelService, private dataService: DatosService, public rutaActiva: ActivatedRoute) {
  }

  userId: any;
  getDataProduct: string;
  listProducts: any = {};
  dataSource: any;
  displayedColumns:
            string[] = [
                        'codigo',
                        'descripcion',
                        'referencia',
                        'contenido',
                        'estado',
                        'homol',
                        'fechaHomologado',
                        'formato',
                        'numeroHojas',
                        'editar'];

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  length = 10;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 50, 100, 150];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.userId = this.rutaActiva.params['value'].id;
    this.getDataProduct = `dataProductManual.php?action=dataProductList&sessionId=${this.userId}`;
    this.dataService.getDataProductList(this.getDataProduct)
      .then(result => {
        this.listProducts = result;
        this.dataSource = new MatTableDataSource(this.listProducts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch(err =>
          console.log('Error', err)
      );
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listProducts, 'List products Management Manuals');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
