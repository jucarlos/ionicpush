import { Injectable } from '@angular/core';
import { AvisoDTO } from '../models/aviso.dto';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisosMockService {

  data: Array<AvisoDTO> = require('../mocks/lista_avisos_mock.json');

  constructor() { 
    
  }

  getAvisos(): Observable<Array<AvisoDTO>> {

    return of(this.data);
  }
}
