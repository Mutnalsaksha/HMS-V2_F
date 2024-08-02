import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastsevendaysTableComponent } from './lastsevendays-table.component';

describe('LastsevendaysTableComponent', () => {
  let component: LastsevendaysTableComponent;
  let fixture: ComponentFixture<LastsevendaysTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LastsevendaysTableComponent]
    });
    fixture = TestBed.createComponent(LastsevendaysTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
