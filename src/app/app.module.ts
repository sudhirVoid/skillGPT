import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChapterUiComponent } from './chapter-ui/chapter-ui.component';
import { LoginComponent } from './login/login.component';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { CreditsModalComponent } from './credits-modal/credits-modal.component';
import { CreatePaymentOrderComponent } from './create-payment-order/create-payment-order.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { LoaderComponent } from './loader/loader.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { ElipsisPipe } from './pipes/elipsis.pipe';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToasterComponent } from './toaster/toaster.component';
import { LibraryModalComponent } from './library-modal/library-modal.component';




@NgModule({
  declarations: [
    AppComponent,
    ChapterUiComponent,
    LandingPageComponent,
    LoginComponent,
    UserPanelComponent,
    CreditsModalComponent,
    CreatePaymentOrderComponent,
    CheckoutComponent,
    ProfileModalComponent,
    NavHeaderComponent,
    LoaderComponent,
    ComplianceComponent,
    ElipsisPipe,
    ContactUsComponent,
    ToasterComponent,
    LibraryModalComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule
  ],
  providers: [
    // { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
