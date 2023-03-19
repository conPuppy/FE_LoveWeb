import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdproviderComponent } from './adprovider.component';

describe('AdproviderComponent', () => {
  let component: AdproviderComponent;
  let fixture: ComponentFixture<AdproviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdproviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdproviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
