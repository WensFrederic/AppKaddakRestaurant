import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonItem, IonButton,
         IonInput ,IonCardContent ,IonCardTitle, IonCheckbox } from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, 
    IonCard, 
    IonCardHeader,
    IonCardContent, 
    IonCardSubtitle,
    IonCardTitle, 
    IonItem, 
    IonCheckbox,
    IonButton, 
    IonInput,
    
    CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {

  constructor( private router:Router) {}
menus(){
  this.router.navigate(['/menu'])
}
  ngOnInit() {
  }

}
