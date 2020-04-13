import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvisoDTO } from '../models/aviso.dto';
import { LoadService } from './load.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {

  private baseURL: string;

  constructor(public http: HttpClient,
    public loadService: LoadService,
    //TODO: Servicio de propiedades: public propertiesUtilService: PropertiesUtilService
  ) {
    //this.baseURL = this.propertiesUtilService.getValuePropertieByName(Constants.URL_BASE);
    this.baseURL = "https://papassegedu-desa.jccm.es/segedu/api";
  }

  getAvisos(): Promise<any> {

    //TODO: Obtener oid de usuario del token JWT
    let oidUser: string = "761597";

    this.loadService.startRequest();

    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL + "/avisos/" + oidUser)
        .subscribe(data => {
          console.log(JSON.stringify(data));
          this.loadService.endRequest();
          resolve(data);
        }, (error) => {
          this.loadService.endRequest();
          console.error(error);
          reject(error);
        })
    });
  }
}
