import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Register } from './Features/auth/components/register/register';
import { Navbar } from "./Layouts/components/navbar/navbar";
import { Footer } from "./Layouts/components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Register, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecom-user');
}
