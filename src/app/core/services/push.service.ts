import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  notificacionesActivadas = true;

  url = window.location.href;

  swLocation = '/ngsw-worker.js';

  urlServices = 'https://backend-marco.herokuapp.com/';

  constructor() {
   this.verificarNavegador();
  }

  getEstadoNotificaciones() {

    return this.notificacionesActivadas;
  }

  verificarNavegador() {

    if ( navigator.serviceWorker ) {

      console.log('Dice que si lo hay, ', this.url);

      if ( this.url.includes('localhost') ) {
          this.swLocation  = '/ngsw-worker.js';
          this.urlServices = 'http://10.128.222.79:3000/';
      }

      window.addEventListener('load', () => {

        navigator.serviceWorker.ready
          .then( serviceWorkerRegistration => {
              serviceWorkerRegistration.pushManager.getSubscription()
              .then( subs => {
                this.verificaSuscripcion( subs );
              });
        });
      });

    }
}

  verificaSuscripcion( activadas ) {

    console.log('En verificar: ', activadas );
    console.log('Notification.permission: ', Notification.permission );

    if ( Notification.permission === 'granted' && activadas === null ) {
      this.subscribir();
    }

    if ( Notification.permission !== 'granted') {

      Notification.requestPermission( permi => {

          if ( permi === 'granted' ) {
            this.subscribir();
          }
      });
    }

    if ( Notification.permission === 'granted' && activadas ) {
      this.notificacionesActivadas = true;
      console.log('Hemos susbscrito');
    }

  }

  getPubliKey() {
      return fetch( this.urlServices + 'push/key' )
      .then( res => res.arrayBuffer())
      .then ( key => new Uint8Array(key));
  }

  subscribir() {

    console.log(' SUBSCRIBIENDO');

    if ( !navigator.serviceWorker ) {
      console.log('No hay sw');
      return;
    }

    this.getPubliKey().then( (key)  => {

      console.log( key );

      console.log( navigator.serviceWorker );

      navigator.serviceWorker.ready
        .then( serviceWorkerRegistration => {

          console.log('serviceWorkerRegistration: ', serviceWorkerRegistration);

          serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: key
          })
        .then ( res => res.toJSON() )
        .then ( (suscripcion: any)  => {

            suscripcion.usuario = 'jjcc114';
            suscripcion.appname = 'ionic2020';

            fetch( this.urlServices + 'push/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( suscripcion )
            })
            .then( s => {
              console.log( 'Como ha ido la subscripcion:' , s );
              this.verificaSuscripcion( s );
            })
            .catch ( error => {
              this.cancelarSubscripcion();
            });

        } );

      });

    });


  }

  cancelarSubscripcion() {

    navigator.serviceWorker.ready
    .then( serviceWorkerRegistration => {
      serviceWorkerRegistration.pushManager.getSubscription()
      .then( subs => {
        subs.unsubscribe().
        then ( () => this.verificaSuscripcion( false ));
      });
    });

  }




}
