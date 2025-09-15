import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Accecibility {
  private tamaño = 16;
  private contrasteActivado = false;

  constructor() { }

  aumentarFuente() {
    if (this.tamaño < 24) {
      this.tamaño += 2;
      document.documentElement.style.fontSize = this.tamaño + 'px';
    }
  }

  disminuirFuente() {
    if (this.tamaño > 12) {
      this.tamaño -= 2;
      document.documentElement.style.fontSize = this.tamaño + 'px';
    }
  }

  toggleContraste() {
    this.contrasteActivado = !this.contrasteActivado;
    if (this.contrasteActivado) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }
}