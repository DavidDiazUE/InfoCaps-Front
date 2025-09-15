import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './core/header/header';
import { FooterComponent } from './core/footer/footer';
import { AccessibilityToolbar } from './accessibility-toolbar/accessibility-toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, AccessibilityToolbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'EduPlatform';
}