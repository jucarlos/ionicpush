import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AvisosMockService } from 'src/app/core/services/avisos.mock.service';
import { AvisoDTO } from 'src/app/core/models/aviso.dto';
import { AvisosService } from 'src/app/core/services/avisos.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  public userNotifications: Array<AvisoDTO>;

  constructor(private navController: NavController,
    private router: Router,
    private avisosService: AvisosService) { }

  ngOnInit() {

    this.avisosService.getAvisos()
      .then(data => {
        this.userNotifications = data
        console.log(JSON.stringify(data))
      }, (error) => {
        //Error: show alert message
        //TODO mostrar error en pantalla - this.showAlert(error._body);
      });
  }

  filterNotifications(event: Event) {
    //console.log('filterNotifications');
  }

  goToDetails(event: Event, selected: AvisoDTO) {

    if (selected && selected.idAviso) {
      let url: string = "/notifications/" + selected.idAviso;
      this.navController.navigateForward(url);
    }
  }
}
