import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: '../styles.scss'
})
export class App {
  protected readonly title = signal('prueba-tecnica-front');
}
