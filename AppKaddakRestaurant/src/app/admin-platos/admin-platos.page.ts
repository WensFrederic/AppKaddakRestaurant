import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, IonList, IonCard, IonCardContent, IonIcon, ToastController, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admin-platos',
  templateUrl: './admin-platos.page.html',
  styleUrls: ['./admin-platos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, IonList, IonCard, IonCardContent, IonIcon, IonButtons, IonBackButton, CommonModule, FormsModule, RouterModule]
})
export class AdminPlatosPage implements OnInit {
  categorias: any[] = [];
  comidas: any[] = [];
  
  platoActual = {
    id: null,
    nombre_comida: '',
    descripcion: '',
    precio: 0,
    id_categoria: '',
    imagen: ''
  };
  
  modoEdicion = false;
  
  constructor(private api: ApiService, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.api.getCategorias().subscribe(res => this.categorias = res);
    this.api.getComidas().subscribe(res => this.comidas = res);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.platoActual.imagen = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async guardarPlato() {
    if (!this.platoActual.nombre_comida || !this.platoActual.precio || !this.platoActual.id_categoria) {
      this.mostrarMensaje('Faltan campos obligatorios');
      return;
    }

    if (this.modoEdicion && this.platoActual.id) {
      this.api.actualizarComida(this.platoActual.id, this.platoActual).subscribe(async () => {
        await this.mostrarMensaje('Plato actualizado exitosamente');
        this.resetForm();
        this.cargarDatos();
      });
    } else {
      this.api.crearComida(this.platoActual).subscribe(async () => {
        await this.mostrarMensaje('Plato creado exitosamente');
        this.resetForm();
        this.cargarDatos();
      });
    }
  }

  editarPlato(comida: any) {
    this.modoEdicion = true;
    this.platoActual = { ...comida };
  }

  eliminarPlato(id: string) {
    this.api.eliminarComida(id).subscribe(async () => {
      await this.mostrarMensaje('Plato eliminado');
      this.cargarDatos();
    });
  }

  resetForm() {
    this.modoEdicion = false;
    this.platoActual = {
      id: null,
      nombre_comida: '',
      descripcion: '',
      precio: 0,
      id_categoria: '',
      imagen: ''
    };
  }

  async mostrarMensaje(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: 'dark'
    });
    toast.present();
  }
}
