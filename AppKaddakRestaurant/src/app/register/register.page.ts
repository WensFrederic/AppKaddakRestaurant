import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonItem, IonButton,
         IonInput ,IonCardContent ,IonCardTitle, IonCheckbox } from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular/standalone';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, 
    IonItem, 
    IonCheckbox,
    IonButton, 
    IonInput,
    
    CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {

  constructor( private router:Router ,
             private toatsController:ToastController
  ) {}

 async logins() {

  const toast = await this.toatsController.create({
    message: 'Cuenta creada correctamente',
    duration: 2000,
    color: 'success',
    position: 'top'
  });

  await toast.present();

  setTimeout(() => {
    this.router.navigate(['/login']);
  }, 2000);


}

  ngOnInit() {
  }

}
