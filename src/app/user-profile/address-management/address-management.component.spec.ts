import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressManagementComponent } from './address-management.component';

describe('AddressManagementComponent', () => {
  let component: AddressManagementComponent;
  let fixture: ComponentFixture<AddressManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressManagementComponent]
    });
    fixture = TestBed.createComponent(AddressManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
