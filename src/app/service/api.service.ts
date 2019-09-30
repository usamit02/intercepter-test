import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIURL } from '../../environments/environment';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, ) { }
  public get<T>(url: string, params: any): Observable<Object> {
    return this.http.get<T>(APIURL + url + '.php', { params: params });
  }
  public post<T>(url: string, params: any): Observable<Object> {
    let body = new HttpParams;
    for (const key of Object.keys(params)) {
      body = body.append(key, params[key]);
    }
    return this.http.post<T>(APIURL + url + '.php', { params: params });
  }
  public handleResponse(status: number, message: string): void {
    console.log(`status:${status}, message:${message}`);
  }
  public handleError(error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
      const clientErrorMessage = 'An error occurred:' + error.error.message; // A client-side or network error occured. Handle it accordingly.
      console.log(clientErrorMessage);
    } else {// The backend returned an unsuccessful response code.
      const serverErrorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
      console.log(serverErrorMessage);
    }
  }
}
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private data: DataService, ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + this.data.token
        'Authorization': this.data.token
      }
    });
    return next.handle(request);
  }

}