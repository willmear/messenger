import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') {
        return next.handle(req.clone());
    }
    
    const token = this.authService.getToken();

    req = this.addToken(req, token);

    return next.handle(req).pipe(
        catchError(
            (err: HttpErrorResponse) => {
                console.log(err.status);
                if(err.status === 401) {
                    this.router.navigate(['/forbidden']);
                } else if (err.status === 403) {
                    this.router.navigate(['/forbidden']);
                }
                return throwError(() => new Error(`Error: ${err.status}`));
            }
        )
    );
  }

  private addToken(request:HttpRequest<any>, token:string) {
    return request.clone(
        {
            setHeaders: {
                Authorization: `Bearer ${token}`,
            }
        }
    );
  }
}
  
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
