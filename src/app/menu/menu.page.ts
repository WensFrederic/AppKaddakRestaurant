import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonTabButton, IonLabel, IonIcon, IonSearchbar, IonTabBar,IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonContent,IonTabButton, IonLabel, IonIcon, IonSearchbar,IonTabBar, IonButton, CommonModule, FormsModule]
})
export class MenuPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
