import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisztPageComponent } from './pages/regiszt.page/regiszt.page.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginPageComponent } from './pages/login.page/login.page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/index.page/index.page.module').then(
        (m) => m.IndexPageModule
      ),
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  { path: 'regiszt', pathMatch: 'full', component: RegisztPageComponent },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
