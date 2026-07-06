import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<<< HEAD:src/app/homespages/homes/homes.page.spec.ts
import { HomesPage } from './homes.page';

describe('HomesPage', () => {
  let component: HomesPage;
  let fixture: ComponentFixture<HomesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesPage);
========
import { PerfilPage } from './perfil.page';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilPage);
>>>>>>>> 686c17552ecf3729d79bf9010e2ab040000ac55b:AppKaddakRestaurant/src/app/perfil/perfil.page.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
