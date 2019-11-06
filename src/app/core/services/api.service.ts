import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const BASE_URL = 'http://127.0.0.1:8080';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private options: Options;

  constructor(
    private httpClient: HttpClient
  ) {
    this.setOptions({
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public setOptions(options: Options) {
    this.options = options;
  }

  /**
   * @param path: string
   * @param body: any
   */
  public post(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .post(BASE_URL + path, JSON.stringify(body), this.options)
      .pipe(catchError(this.formatErrors));
  }

  public formatErrors(error: any): Observable<any> {
    return throwError(error.error);
  }
}

export interface Options {
  headers: HttpHeaders;
}
