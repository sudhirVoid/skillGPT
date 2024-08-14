import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaymentOrderComponent } from './create-payment-order.component';

describe('CreatePaymentOrderComponent', () => {
  let component: CreatePaymentOrderComponent;
  let fixture: ComponentFixture<CreatePaymentOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePaymentOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePaymentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
