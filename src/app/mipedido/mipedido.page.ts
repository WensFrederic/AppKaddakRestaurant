import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonInput, IonItem, IonCardHeader  } from '@ionic/angular/standalone';

@Component({
  selector: 'app-mipedido',
  templateUrl: './mipedido.page.html',
  styleUrls: ['./mipedido.page.scss'],
  standalone: true,
  imports: [IonContent,IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonInput, IonItem, IonCardHeader, CommonModule, FormsModule]
})
export class MipedidoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
