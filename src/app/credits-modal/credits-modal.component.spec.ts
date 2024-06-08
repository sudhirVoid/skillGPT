import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsModalComponent } from './credits-modal.component';

describe('CreditsModalComponent', () => {
  let component: CreditsModalComponent;
  let fixture: ComponentFixture<CreditsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
