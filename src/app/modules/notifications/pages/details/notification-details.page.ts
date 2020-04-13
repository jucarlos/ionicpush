import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AvisosMockService } from 'src/app/core/services/avisos.mock.service';
import { AvisoDTO } from 'src/app/core/models/aviso.dto';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.page.html',
  styleUrls: ['./notification-details.page.scss'],
})
export class NotificationDetailsPage implements OnInit {

  private userNotifications: Array<AvisoDTO>;
  public notificationDetail: AvisoDTO;
  private idParam: number;
  
  constructor(private navController: NavController, 
    private router: Router,
    private avisosService: AvisosMockService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.idParam = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    this.avisosService.getAvisos().subscribe(
      data => 
        {
          this.userNotifications = data;
          this.notificationDetail = this.userNotifications.find(not => not.idAviso === this.idParam);
          console.log(JSON.stringify(this.notificationDetail));
        }
    );
  }
}
