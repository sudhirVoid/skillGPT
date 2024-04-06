import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ChapterUiComponent } from './chapter-ui/chapter-ui.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "landingPage",
    component: LandingPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "results",
    component: ChapterUiComponent,
    canActivate: [AuthGuard]
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{}),
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
