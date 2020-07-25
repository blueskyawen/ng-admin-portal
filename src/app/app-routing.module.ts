import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './share/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { FullComponent } from './core/full.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    component: FullComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'cluster',
        loadChildren: 'src/app/cluster-manage/cluster-manage.module#ClusterManageModule'
      },
      {
        path: 'system',
        children: [
          {
            path: '**', component: PageNotFoundComponent
          }
        ]
      },
      { path: '**', component: PageNotFoundComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
