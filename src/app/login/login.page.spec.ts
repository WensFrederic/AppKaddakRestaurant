import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import {IonContent, IonCard,IonCardHeader, IonCardTitle, 
  IonCardContent,IonItem,IonInput,IonLabel} from '@ionic/angular/standalone';
  
describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
