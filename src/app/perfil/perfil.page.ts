import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBadge, IonTabBar, IonTabButton, IonIcon, IonButton, IonButtons } from '@ionic/angular/standalone';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBadge, IonTabBar, IonTabButton, IonIcon, IonButton, IonButtons, CommonModule, FormsModule, RouterModule]
})
export class PerfilPage implements OnInit {
  historialOrdenes: any[] = [];
  platosFrecuentes: any[] = [];
  comidasMap: any = {};
  userId: string | null = '';

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargarDatos();
  }

  ionViewWillEnter() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.apiService.getComidas().subscribe(comidas => {
      comidas.forEach((c: any) => {
        this.comidasMap[c.id] = c.nombre_comida;
      });

      this.apiService.getOrdenes().subscribe(ordenes => {
        this.historialOrdenes = ordenes
          .filter((o: any) => o.id_cliente === this.userId)
          .sort((a: any, b: any) => new Date(b.fecha_orden).getTime() - new Date(a.fecha_orden).getTime());

        this.calcularFrecuentes();
      });
    });
  }

  calcularFrecuentes() {
    const conteo: any = {};
    
    this.historialOrdenes.forEach(orden => {
      if (orden.detalles) {
        orden.detalles.forEach((detalle: any) => {
          if (conteo[detalle.id_comida]) {
            conteo[detalle.id_comida] += detalle.cantidad;
          } else {
            conteo[detalle.id_comida] = detalle.cantidad;
          }
        });
      }
    });

    this.platosFrecuentes = Object.keys(conteo).map(id => ({
      id_comida: id,
      nombre: this.comidasMap[id] || 'Plato desconocido',
      veces_pedido: conteo[id]
    })).sort((a, b) => b.veces_pedido - a.veces_pedido).slice(0, 5);
  }

  cerrarSesion() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}
