import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
  imports: [RouterOutlet, Header, Footer],
  selector: 'lg-shell',
  styleUrl: './shell.scss',
  templateUrl: './shell.html',
})
export class Shell {}
