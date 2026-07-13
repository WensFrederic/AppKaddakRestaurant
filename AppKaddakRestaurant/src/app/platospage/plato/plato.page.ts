import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle,IonIcon,IonToolbar,IonFooter, IonButton } from '@ionic/angular/standalone';
import { cartOutline, cart, restaurant, receipt, person, notificationsOutline, flame, add, home, clipboard, restaurantOutline, receiptOutline, personOutline, homeOutline, arrowBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons'; 
addIcons({ cartOutline, cart, restaurant, receipt, person, homeOutline });


@Component({
  selector: 'app-plato',
  templateUrl: './plato.page.html',
  styleUrls: ['./plato.page.scss'],
  standalone: true,
  imports: [IonContent, 
    
  
    IonFooter,
    IonIcon,
   
    IonToolbar, CommonModule, FormsModule]
})
export class PlatoPage implements OnInit {

  constructor() { 

  addIcons({arrowBackOutline,add,homeOutline,restaurantOutline,receiptOutline,personOutline,notificationsOutline,cartOutline,home,flame,restaurant,clipboard,person,receipt}); 
  
  }
  
   ngOnInit() {
  }

}
