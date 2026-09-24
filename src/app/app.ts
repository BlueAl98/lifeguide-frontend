import { Component } from '@angular/core';
import { Shell } from './core/layout/shell/shell';

@Component({
  imports: [Shell],
  selector: 'lg-root',
  template: `<lg-shell />`,
})
export class App {}
