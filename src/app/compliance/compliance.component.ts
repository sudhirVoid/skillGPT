import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ComplianceService } from '../services/compliance.service';


@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.css']
})
export class ComplianceComponent {
  safeContent: SafeHtml = '';

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private routeContentService: ComplianceService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      const content = this.routeContentService.getContent(data['route']);
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(content);
    });
  }

}
