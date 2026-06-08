import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInfo } from './purchase-info';

describe('PurchaseInfo', () => {
  let component: PurchaseInfo;
  let fixture: ComponentFixture<PurchaseInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
