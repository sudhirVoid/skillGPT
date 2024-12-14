import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ChapterUiComponent } from './chapter-ui/chapter-ui.component';
import { LoginComponent } from './login/login.component';
import { CreatePaymentOrderComponent } from './create-payment-order/create-payment-order.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from './auth/auth.guard';
import { ComplianceComponent } from './compliance/compliance.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LibraryModalComponent } from './library-modal/library-modal.component';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { QuizModalComponent } from './quiz-modal/quiz-modal.component';


const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  { path: 't&c', component: ComplianceComponent, data: { route: 't&c' } },
  { path: 'privacy-policy', component: ComplianceComponent, data: { route: 'privacy-policy' } },
  { path: 'refund-policy', component: ComplianceComponent, data: { route: 'refund-policy' } },
  { path: 'terms-of-service', component: ComplianceComponent, data: { route: 'terms-of-service' } },
  { path: 'shipping-policy', component: ComplianceComponent, data: { route: 'shipping-policy' } },
  {path:'contact',component:ContactUsComponent},
  {path:'library',component: LibraryModalComponent,canActivate: [AuthGuard]},
  { path: 'flashcard', component: FlashcardComponent },
  {path: 'quiz', component: QuizModalComponent,canActivate: [AuthGuard]},
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
  {
    path: "paymentsOrder",
    component: CreatePaymentOrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "checkout/:paymentOrderId",
    component: CheckoutComponent,
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
