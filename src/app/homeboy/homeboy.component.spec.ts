import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeboyComponent } from './homeboy.component';

describe('HomeboyComponent', () => {
  let component: HomeboyComponent;
  let fixture: ComponentFixture<HomeboyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeboyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeboyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
