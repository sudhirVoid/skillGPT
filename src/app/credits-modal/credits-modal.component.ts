import { Component } from '@angular/core';
import {  Output, EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-credits-modal',
  templateUrl: './credits-modal.component.html',
  styleUrls: ['./credits-modal.component.css']
})
export class CreditsModalComponent {

  @Output() closeModalEvent = new EventEmitter<void>();
  @Input() remCredits:string="";
  closeModal() {
    this.closeModalEvent.emit();
  }


}
