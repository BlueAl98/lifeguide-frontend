import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RegisterForm } from '../../ui/register-form/register-form';
import { RegisterFormValue } from '../../domain/auth.models';
import { RegisterPage } from './register-page';

const value: RegisterFormValue = {
  firstName: ' Ana ',
  lastName: 'López',
  username: 'ana_fit',
  email: 'ana@mail.com',
  birthDate: '',
  password: 'secreto123',
  confirmPassword: 'secreto123',
};

describe('RegisterPage', () => {
  let fixture: ComponentFixture<RegisterPage>;
  let http: HttpTestingController;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPage],
      providers: [
        provideRouter([{ path: 'login', children: [] }]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(RegisterPage);
    http = TestBed.inject(HttpTestingController);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  afterEach(() => http.verify());

  function submit(): void {
    fixture.debugElement.query((d) => d.componentInstance instanceof RegisterForm)
      .componentInstance.submitted.emit(value);
  }

  it('sends one request even when submitted twice (double click)', async () => {
    submit();
    submit();

    const req = http.expectOne('/api/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      firstName: 'Ana',
      lastName: 'López',
      username: 'ana_fit',
      email: 'ana@mail.com',
      birthDate: null,
      password: 'secreto123',
    });
    await fixture.whenStable();
    expect(el.querySelector<HTMLButtonElement>('button[type="submit"]')!.disabled).toBe(true);
    req.flush({});
  });

  it('stays on the page and shows a success message after registering', async () => {
    submit();
    http.expectOne('/api/register').flush({ id: 1, firstName: 'Ana' });
    await fixture.whenStable();

    expect(el.querySelector('[role="status"]')?.textContent).toContain(
      '¡Cuenta creada! Te damos la bienvenida, Ana.',
    );
    expect(el.querySelector<HTMLButtonElement>('button[type="submit"]')!.disabled).toBe(false);
  });

  it('shows the conflict in Spanish and allows retrying', async () => {
    submit();
    http
      .expectOne('/api/register')
      .flush(
        { code: 'CONFLICT', message: 'Email is already registered', status: 409 },
        { status: 409, statusText: 'Conflict' },
      );
    await fixture.whenStable();

    expect(el.querySelector('[role="alert"]')?.textContent).toContain(
      'Este correo ya está registrado.',
    );

    submit();
    http.expectOne('/api/register').flush({});
  });
});
