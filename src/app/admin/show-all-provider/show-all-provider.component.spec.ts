import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllProviderComponent } from './show-all-provider.component';

describe('ShowAllProviderComponent', () => {
  let component: ShowAllProviderComponent;
  let fixture: ComponentFixture<ShowAllProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllProviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
