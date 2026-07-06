import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritosPage } from './carritos.page';

describe('CarritosPage', () => {
  let component: CarritosPage;
  let fixture: ComponentFixture<CarritosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CarritosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
