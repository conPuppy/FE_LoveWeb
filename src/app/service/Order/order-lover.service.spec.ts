import { TestBed } from '@angular/core/testing';

import { OrderLoverService } from './order-lover.service';

describe('OrderLoverService', () => {
  let service: OrderLoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderLoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
