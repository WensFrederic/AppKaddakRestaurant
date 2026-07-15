import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <-- Importado para hacer funcionar la navegación al menú
import { NetworkService } from '../services/network';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    RouterModule // <-- Agregado a los imports necesarios del componente
  ]
})
export class HomePage implements OnInit {
  // Variable pública para almacenar el estado actual de la conexión a internet
  public isOnline: boolean = true;

  // Inyectamos el servicio de red en el constructor
  constructor(public networkService: NetworkService) {
    this.networkService.status$.subscribe((status: boolean) => {
      this.isOnline = status;
    });
  }

  // ngOnInit se ejecuta al inicializar el componente, ideal para empezar a escuchar cambios de red
  ngOnInit() {
    this.networkService.status$.subscribe(isOnline => {
      this.isOnline = isOnline;
      // Si la conexión se restaura, intentamos sincronizar los datos pendientes
      if (this.isOnline) {
        console.log('¡Internet restaurado! Verificando si hay pedidos pendientes...');
        this.syncPendingOrders();
      }
    });
  }

  // Función para sincronizar los datos guardados localmente con el servidor
  syncPendingOrders() {
    const pending = localStorage.getItem('pedido_pendiente');
    if (pending) {
      const order = JSON.parse(pending);
      // Aquí es donde enviarías los datos a la API en un caso real
      console.log('Enviando pedido pendiente al servidor:', order);
      
      // Si el envío es exitoso, eliminamos el dato del localStorage
      localStorage.removeItem('pedido_pendiente');
      alert('¡Conexión restaurada! Tu pedido ha sido enviado con éxito.');
    }
  }

  // Función para simular un pedido
  simulateOrder() {
    const sampleOrder = { id: 1, dish: 'Pizza', status: 'pending' };
    
    if (this.isOnline) {
      console.log('Online: Enviando a servidor...');
    } else {
      // Si estamos offline, guardamos en el localStorage usando el servicio
      this.networkService.saveDataOffline('pedido_pendiente', sampleOrder);
      alert('Modo Offline: Pedido guardado en localStorage.');
    }
  }
}