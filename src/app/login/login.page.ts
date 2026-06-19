import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonCard , IonItem,IonCardTitle,IonCardHeader, 
  IonInput,IonLabel, IonButton,IonCardContent,IonIcon} from '@ionic/angular/standalone';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
  
IonCardContent,
    IonItem,
    IonInput, 
    IonLabel,
    IonButton , CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
   email:string='';
   password :string='' ;
  constructor( private router:Router) {}
registers(){
  this.router.navigate(['/register'])
}

  ngOnInit() {
    console.log(this.email , this.password)
  }

}
