import { Component } from '@angular/core';

@Component({
  selector: 'lg-footer',
  styleUrl: './footer.scss',
  template: `<p>© {{ year }} Lifeguide</p>`,
})
export class Footer {
  protected readonly year = new Date().getFullYear();
}
