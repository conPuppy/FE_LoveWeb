import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllBillComponent } from './show-all-bill.component';

describe('ShowAllBillComponent', () => {
  let component: ShowAllBillComponent;
  let fixture: ComponentFixture<ShowAllBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
