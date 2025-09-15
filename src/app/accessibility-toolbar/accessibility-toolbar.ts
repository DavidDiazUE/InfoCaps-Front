import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Accecibility } from '../services/accecibility';

@Component({
  selector: 'app-accessibility-toolbar',
  imports: [CommonModule],
  templateUrl: './accessibility-toolbar.html',
  styleUrl: './accessibility-toolbar.css'
})
export class AccessibilityToolbar {
  constructor(private accesibilityService: Accecibility) {}

  aumentar() {
    this.accesibilityService.aumentarFuente();
  }

  disminuir() {
    this.accesibilityService.disminuirFuente();
  }

  alternarContraste() {
    this.accesibilityService.toggleContraste();
  }
}