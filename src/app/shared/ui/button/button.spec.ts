import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Button } from './button';

@Component({
  imports: [Button],
  template: `
    <button lgButton type="button">Guardar</button>
    <a lgButton variant="outline" size="lg" [fullWidth]="true" href="/login">Entrar</a>
  `,
})
class Host {}

describe('Button', () => {
  it('applies the default and custom variant, size and width classes', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const button = el.querySelector('button')!;
    const link = el.querySelector('a')!;

    expect(button.textContent).toBe('Guardar');
    expect([...button.classList]).toEqual(
      expect.arrayContaining(['lg-button', 'lg-button--primary', 'lg-button--md']),
    );
    expect([...link.classList]).toEqual(
      expect.arrayContaining(['lg-button', 'lg-button--outline', 'lg-button--lg', 'lg-button--full']),
    );
  });
});
