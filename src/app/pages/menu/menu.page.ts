import { IonList, } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonButton, 
  IonIcon, 
  IonButtons 
} from '@ionic/angular/standalone'; 
import { addIcons } from 'ionicons';
import { addOutline, arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    IonList, 
    IonButton, 
    IonIcon, 
    IonButtons
  ]
})
export class MenuPage implements OnInit {
  
  // Categoría seleccionada para el filtro
  selectedCategory: string = 'Todos';

  // Lista de categorías disponibles
  categories: string[] = ['Todos', 'Pizzas', 'Burgers', 'Pastas', 'Bebidas'];

  // Lista de productos con la ruta correcta hacia la carpeta assets
  foodList = [
    { 
      id: 1, 
      name: 'Pizza Pepperoni', 
      description: 'Salsa de tomate, pepperoni y queso mozzarella.', 
      price: 13.90, 
      image: 'assets/pizza-peperoni-png.PNG', 
      category: 'Pizzas' 
    },
    { 
      id: 2, 
      name: 'Hamburguesa BBQ', 
      description: 'Carne, queso cheddar, tocineta, cebolla crispy y salsa BBQ.', 
      price: 12.50, 
      image: 'assets/Burgger-pp-png.PNG', 
      category: 'Burgers' 
    },
    { 
      id: 3, 
      name: 'Pasta Alfredo', 
      description: 'Pasta en salsa cremosa de queso parmesano.', 
      price: 11.90, 
      image: 'assets/passta-al-png.PNG', 
      category: 'Pastas' 
    },
    { 
      id: 4, 
      name: 'Ensalada César', 
      description: 'Lechuga romana, pollo, crotones y aderezo césar.', 
      price: 8.50, 
      image: 'assets/Ensalada-png.PNG', 
      category: 'Todos' 
    },

    { 
  id: 5, 
  name: 'Pizza-chrry-png', 
  description: 'Salsa de tomate, albahaca fresca y queso mozzarella.', 
  price: 10.90, 
  image: 'assets/icon/pizza-chrry-png.PNG', 
  category: 'Pizzas' 
},
    { 
      id: 6, 
      name: 'Hamburguesa Clásica', 
      description: 'Carne, queso, lechuga, tomate y salsa especial.', 
      price: 9.90, 
      image: 'assets/humbergur-clasica-png.PNG', 
      category: 'Burgers' 
    },
    { 
      id: 7, 
      name: 'Pasta Bolognesa', 
      description: 'Pasta con salsa de tomate tradicional y carne molida.', 
      price: 12.90, 
      image: 'assets/passta-al-png.PNG', 
      category: 'Pastas' 
    },
    { 
      id: 8, 
      name: 'Papas Crisscut', 
      description: 'Papas fritas sazonadas en forma de rejilla.', 
      price: 3.50, 
      image: 'assets/papas-crisscut-png.PNG', 
      category: 'Burgers' 
    },
    { 
      id: 9, 
      name: 'Limonada Natural', 
      description: 'Jugo de limón fresco endulzado al gusto.', 
      price: 2.50, 
      image: 'assets/limonada-Natural-png.PNG', 
      category: 'Bebidas' 
    },
    { 
      id: 10, 
      name: 'Tarta de Chocolate', 
      description: 'Bizcocho húmedo con relleno y cobertura de chocolate.', 
      price: 4.50, 
      image: 'assets/Chocolate-png.PNG', 
      category: 'Todos' 
    }
  ];

  constructor(private navCtrl: NavController) {
    // Registrar iconos para poder usarlos en el template
    addIcons({ addOutline, arrowBackOutline });
  }

  ngOnInit() {}

  // Cambiar la categoría seleccionada
  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  // Filtrar la lista de comida según la categoría
  getFilteredFoodList() {
    if (this.selectedCategory === 'Todos') {
      return this.foodList;
    }
    return this.foodList.filter(item => item.category === this.selectedCategory);
  }

  // Volver a la pantalla anterior
  goBack() {
    this.navCtrl.back();
  }

  // Agregar producto al carrito
  addToCart(item: any) {
    console.log('Se agregó al carrito:', item.name);
  }
}