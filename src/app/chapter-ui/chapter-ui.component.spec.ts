import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterUiComponent } from './chapter-ui.component';

describe('ChapterUiComponent', () => {
  let component: ChapterUiComponent;
  let fixture: ComponentFixture<ChapterUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapterUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
