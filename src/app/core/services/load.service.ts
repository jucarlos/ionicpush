import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  private isLoading: boolean = false;

  constructor(private loadingController: LoadingController) {

  }

  async startRequest() {

    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Por favor, espere...'
    }).then(loader => {
      loader.present().then(() => {
        console.log('Loading presented');
        if (!this.isLoading) {
          loader.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async endRequest() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('Loading dismissed'));
  }
}
