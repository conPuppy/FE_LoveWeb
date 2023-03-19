import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtopviewComponent } from './showtopview.component';

describe('ShowtopviewComponent', () => {
  let component: ShowtopviewComponent;
  let fixture: ComponentFixture<ShowtopviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowtopviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowtopviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
