import { Injectable } from '@angular/core';
import { Network, ConnectionStatus } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  // BehaviorSubject actúa como un "emisor" que notifica el estado a toda la aplicación
  private status = new BehaviorSubject<boolean>(true);
  public status$ = this.status.asObservable();

  constructor() {
    this.initNetworkListener();
  }

  // Inicializa el escuchador de cambios en la red
  async initNetworkListener() {
    // 1. Obtiene el estado de conexión actual al iniciar
    const status = await Network.getStatus();
    this.status.next(status.connected);

    // 2. Escucha cambios en tiempo real (si el usuario pierde o recupera internet)
    Network.addListener('networkStatusChange', status => {
      console.log('Cambio de red detectado:', status.connected);
      this.status.next(status.connected);
    });
  }

// Agregamos esto en nuestro NetworkService
public saveDataOffline(key: string, data: any) {
  // Guardamos los datos en el almacenamiento local del dispositivo (localStorage)
  localStorage.setItem(key, JSON.stringify(data));
  console.log('Datos guardados localmente porque estás offline');
}
}