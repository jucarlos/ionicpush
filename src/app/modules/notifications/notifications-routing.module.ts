import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsPage } from './pages/list-view/notifications.page';
import { NotificationDetailsPage } from './pages/details/notification-details.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationsPage
  },
  {
    path: ':id',
    component: NotificationDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsPageRoutingModule {}
