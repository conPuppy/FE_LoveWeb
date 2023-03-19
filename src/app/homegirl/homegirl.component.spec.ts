import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomegirlComponent } from './homegirl.component';

describe('HomegirlComponent', () => {
  let component: HomegirlComponent;
  let fixture: ComponentFixture<HomegirlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomegirlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomegirlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
