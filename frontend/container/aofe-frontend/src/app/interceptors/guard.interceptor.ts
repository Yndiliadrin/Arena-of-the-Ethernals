import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class GuardInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(this.handleAuthError));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status > 250) {
      localStorage.removeItem('user');
      localStorage.removeItem('userObject');
      return of(err.message);
    }
    return throwError(err);
  }
}
