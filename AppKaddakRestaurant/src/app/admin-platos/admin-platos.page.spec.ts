import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPlatosPage } from './admin-platos.page';

describe('AdminPlatosPage', () => {
  let component: AdminPlatosPage;
  let fixture: ComponentFixture<AdminPlatosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
