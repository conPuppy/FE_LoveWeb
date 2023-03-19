import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShowBillComponent } from './user-show-bill.component';

describe('UserShowBillComponent', () => {
  let component: UserShowBillComponent;
  let fixture: ComponentFixture<UserShowBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserShowBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserShowBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
