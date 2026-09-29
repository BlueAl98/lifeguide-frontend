import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ErrorStore } from '../../shared/data-access/error-store';
import { handleErrorsLocally } from '../../shared/data-access/handled-errors';
import { errorInterceptor } from './error-interceptor';

describe('errorInterceptor', () => {
  let http: HttpClient;
  let controller: HttpTestingController;
  let store: ErrorStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
    store = TestBed.inject(ErrorStore);
  });

  afterEach(() => controller.verify());

  it('shows the dialog and still passes the error to the caller', () => {
    let callerSawError = false;
    http.get('/api/x').subscribe({ error: () => (callerSawError = true) });
    controller
      .expectOne('/api/x')
      .flush({ code: 'INTERNAL_ERROR' }, { status: 500, statusText: 'Server Error' });

    expect(store.error()).toMatchObject({ status: 500, code: 'INTERNAL_ERROR' });
    expect(callerSawError).toBe(true);
  });

  it('skips statuses the caller handles locally', () => {
    http.get('/api/x', { context: handleErrorsLocally(409) }).subscribe({ error: () => {} });
    controller.expectOne('/api/x').flush({}, { status: 409, statusText: 'Conflict' });

    expect(store.error()).toBeNull();
  });

  it('runs the 401 action (go to login)', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    http.get('/api/x').subscribe({ error: () => {} });
    controller.expectOne('/api/x').flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(navigate).toHaveBeenCalledWith(['/login']);
  });
});
