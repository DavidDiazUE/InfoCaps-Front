import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccessibilityToolbar } from './accessibility-toolbar/accessibility-toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AccessibilityToolbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('info-caps');
}
