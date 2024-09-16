import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SkillGPT';
  loading = false;
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationError) {
        this.loading = false;
      }
    });
  }

  // constructor(private router: Router) {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationStart) {
  //       this.loading = true;
  //     } else if (event instanceof NavigationEnd || event instanceof NavigationError) {
  //       // Delay hiding the loader for at least 500ms
  //       setTimeout(() => {
  //         this.loading = false;
  //       }, 500); // Adjust this value (in milliseconds) to control the delay
  //     }
  //   });
  // }
}
