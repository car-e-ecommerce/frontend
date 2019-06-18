import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  baseUrl: string = 'http://www.golmar.net:82/modulos/e00088/controllers/';

  constructor(private http: HttpClient) { }

  public getDataProductList(path) {
    return this.http.get(this.baseUrl + path).toPromise();
  }

  public getUserId() {
    return this.http.get(this.baseUrl + '/dataProductManual.php?action=userSession').toPromise();
  }

  public getPointUse(param) {
    return this.http.get(this.baseUrl + 'getPointUse.php?codePointUse=' + param).toPromise();
  }

  public getEtiquetas() {
    return this.http.get(this.baseUrl + 'getEtiquetas.php').toPromise();
  }

  public getProductDetails(param) {
    return this.http.get(this.baseUrl + 'getProductDetails.php?codeProduct=' + param).toPromise();
  }

  public getItemLanguage() {
    return this.http.get(this.baseUrl + 'getIdiomas.php').toPromise();
  }

}
