import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonIcon,IonToolbar,IonFooter, IonButton } from '@ionic/angular/standalone';
import { cartOutline, cart, restaurant, receipt, person, notificationsOutline, flame, add, home, clipboard, restaurantOutline, receiptOutline, personOutline, homeOutline, arrowBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons'; 
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { Carrito } from 'src/app/models/carrito.model';
import { CarritoService } from 'src/app/services/carritos.service';
import { Router } from '@angular/router';
addIcons({ cartOutline, cart, restaurant, receipt, person, homeOutline });


@Component({
  selector: 'app-plato',
  templateUrl: './plato.page.html',
  styleUrls: ['./plato.page.scss'],
  standalone: true,
  imports: [IonContent, 
    
    IonIcon,
    IonFooter,
    IonIcon,
    
    IonToolbar, CommonModule, FormsModule]
})
export class PlatoPage implements OnInit {

productos: Producto[] = [];


constructor(
  private productoService:ProductoService,
  private carritoService:CarritoService,
  private router:Router
) { 

  addIcons({arrowBackOutline,add,homeOutline,restaurantOutline,receiptOutline,personOutline,notificationsOutline,cartOutline,home,flame,restaurant,clipboard,person,receipt}); 
  
  }
  homes(){
  this.router.navigate(['/menu'])
  }
  menus(){
    this.router.navigate(['/menu'])
  }
  perfiles(){
    this.router.navigate(['/perfil'])
  }
   ngOnInit(): void {
      this.productos = this.productoService.obtenerProductos();
     
  }

  agregarAlCarrito(producto: Producto): void {

    this.carritoService.agregarProducto(producto);

}


}
