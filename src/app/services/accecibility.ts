import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Accecibility {
  private fontSize = 16;
  private contrast = false;

  constructor() { }

  aumentarFuente() {
    if (this.fontSize < 24) {
      this.fontSize++;
      this.aplicarFontSize();
    }
  }

  disminuirFuente() {
    if (this.fontSize > 12) {
      this.fontSize--;
      this.aplicarFontSize();
    }
  }

  toggleContraste() {
    this.contrast = !this.contrast;
    if (this.contrast) {
      document.body.classList.add('modo-contraste');
    } else {
      document.body.classList.remove('modo-contraste');
    }
  }

  private aplicarFontSize(){
    document.documentElement.style.fontSize = `${this.fontSize}px`
  }
}