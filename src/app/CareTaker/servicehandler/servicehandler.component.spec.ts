import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicehandlerComponent } from './servicehandler.component';

describe('ServicehandlerComponent', () => {
  let component: ServicehandlerComponent;
  let fixture: ComponentFixture<ServicehandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicehandlerComponent]
    });
    fixture = TestBed.createComponent(ServicehandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
