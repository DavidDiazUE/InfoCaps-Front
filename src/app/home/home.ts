import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  categories = [
    {
      name: 'Contabilidad',
      icon: '📊',
      route: '/contabilidad'
    },
    {
      name: 'Finanzas',
      icon: '💰',
      route: '/finanzas'
    },
    {
      name: 'Marketing',
      icon: '📈',
      route: '/marketing'
    },
    {
      name: 'Emprendimiento',
      icon: '🚀',
      route: '/emprendimiento'
    }
  ];
}