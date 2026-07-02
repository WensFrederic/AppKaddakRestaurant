import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MipedidoPage } from './mipedido.page';

describe('MipedidoPage', () => {
  let component: MipedidoPage;
  let fixture: ComponentFixture<MipedidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MipedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
