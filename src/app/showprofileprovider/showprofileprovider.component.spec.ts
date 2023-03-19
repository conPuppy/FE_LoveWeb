import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowprofileproviderComponent } from './showprofileprovider.component';

describe('ShowprofileproviderComponent', () => {
  let component: ShowprofileproviderComponent;
  let fixture: ComponentFixture<ShowprofileproviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowprofileproviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowprofileproviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
