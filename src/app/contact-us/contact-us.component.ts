import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment, mailer } from 'src/environments/environment';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactForm = {
    userName: '',
    email: '',
    subject:'',
    phone:'',
    message: '',
  };


  isSending:boolean=false;
  constructor(private http: HttpClient) {}

  onSubmit() {
    this.isSending=true;

    if (this.contactForm.userName && this.contactForm.email && this.contactForm.message) {
      // Call API endpoint to send the form data
      this.http.post(`${mailer.mailerApiURL}/support-mail`, this.contactForm)
        .pipe(
          catchError(error => {
            console.error('Error sending mail:', error);
            alert('There was an error sending your message. Please try again later.');
            this.isSending=false;
            return throwError(error);
          })
        )
        .subscribe(response => {
          console.log('Mail sent successfully:', response,this.contactForm);
          alert('Your message has been sent successfully. We will get back to you soon.');
          this.contactForm = {
            userName: '',
            email: '',
            subject:'',
            phone:'',
            message: '',
          }
          this.isSending=false;
        });
    } else {
      this.isSending=false;
      alert('Please fill in all required fields.');
    }
  }


}
