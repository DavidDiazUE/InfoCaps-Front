import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../chat-service/chatbot';

@Component({
  selector: 'app-chat-bot',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './chat-bot.html',
  styleUrls: ['./chat-bot.css']
})
export class ChatBotComponent {
  messages: { text: string, sender: 'user' | 'bot' }[] = [];
  userInput: string = '';
  isOpen: boolean = false; 

  constructor(private chatbotService: ChatbotService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ text: this.userInput, sender: 'user' });

    this.chatbotService.sendMessage(this.userInput).subscribe({
      next: (res: string) => {
        this.messages.push({ text: res, sender: 'bot' });
      },
      error: (err) => {
        console.error('Error en chatbot:', err);
        this.messages.push({ text: 'Error al conectar con el bot ', sender: 'bot' });
      }
    });

    this.userInput = '';
  }
}
