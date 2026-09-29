import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorDialog } from '../../../shared/ui/error-dialog/error-dialog';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
  imports: [RouterOutlet, Header, Footer, ErrorDialog],
  selector: 'lg-shell',
  styleUrl: './shell.scss',
  templateUrl: './shell.html',
})
export class Shell {}
