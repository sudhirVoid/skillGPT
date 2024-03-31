import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ChapterUiComponent } from './chapter-ui/chapter-ui.component';

const routes: Routes = [
  { path: "", redirectTo: "/landingPage", pathMatch: "full" },
  {
    path: "landingPage",
    component: LandingPageComponent,
  },
  {
    path: "results",
    component: ChapterUiComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true,
  }),
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
