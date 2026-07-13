import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonCard , IonItem,IonCardTitle,IonCardHeader, IonInput,IonLabel, IonButton,IonCardContent,IonIcon, ToastController, IonBadge} from '@ionic/angular/standalone';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
  
    IonItem, 
    IonInput, 
   
   
    IonButton, CommonModule, FormsModule
  ]
})
export class LoginPage implements OnInit {
   email:string='';
   password:string='' ;
   
  constructor(private router:Router, private api: ApiService, private toastCtrl: ToastController) {}

  async mostrarError() {
    const toast = await this.toastCtrl.create({
      message: 'Credenciales incorrectas o usuario no registrado',
      duration: 3000,
      color: 'danger',
      position: 'top'
    });
    toast.present();
  }

  login() {
    const cleanEmail = this.email.trim().toLowerCase();
    const cleanPass = this.password.trim();

    // Verificación de Superusuario
    if (cleanEmail === 'jose' && cleanPass === '12345') {
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userId', 'jose');
      this.router.navigate(['/menu']);
      return;
    }

    // Validación contra el backend
    this.api.getClientes().subscribe(
      (clientes: any[]) => {
        const userExists = clientes.find(c => (c.correo || c.email)?.toLowerCase() === cleanEmail && c.password === cleanPass);
        
        if (userExists) {
          localStorage.setItem('userRole', 'client');
          localStorage.setItem('userId', userExists.id || cleanEmail);
          this.router.navigate(['/menu']);
        } else {
          this.mostrarError(); // No existe o clave mal
        }
      },
      (error) => {
        this.mostrarError();
      }
    );
  }

  registers(){
    
    this.router.navigate(['/register']);
  }

  ngOnInit() {
  }
}
