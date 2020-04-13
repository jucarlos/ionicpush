import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PushService } from 'src/app/core/services/push.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  notificacionesPush = false;


  constructor(private navController: NavController,
              public push: PushService,
              private router: Router) {
                this.notificacionesPush = this.push.getEstadoNotificaciones();
              }

  ngOnInit() {
    this.notificacionesPush = this.push.getEstadoNotificaciones();
  }

  activandoPush() {

    console.log('hola');
  }
}
