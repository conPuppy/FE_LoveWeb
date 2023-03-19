import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderShowBillComponent } from './provider-show-bill.component';

describe('ProviderShowBillComponent', () => {
  let component: ProviderShowBillComponent;
  let fixture: ComponentFixture<ProviderShowBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderShowBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderShowBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
