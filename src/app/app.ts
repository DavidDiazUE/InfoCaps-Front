import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './core/header/header';
import { FooterComponent } from './core/footer/footer';
import { AccessibilityToolbar } from './accessibility-toolbar/accessibility-toolbar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatBotComponent } from './chat-bot/chat-bot'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    HeaderComponent, 
    FooterComponent, 
    AccessibilityToolbar,
    FormsModule,
    HttpClientModule, // 👈 necesario para usar HttpClient en el servicio
    ChatBotComponent  
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'EduPlatform';
}
