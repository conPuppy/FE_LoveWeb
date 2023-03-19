import { TestBed } from '@angular/core/testing';

import { ProvisionProviderService } from './provisionprovider.service';

describe('ProvisionproviderService', () => {
  let service: ProvisionProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvisionProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
