import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/internal/operators/map';
import { Router } from '@angular/router';

const routes = {
  login: () => `/api/users/login`
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  /**
   * 
   * @param username: string
   * @param password: string
   */
  login(username: string, password: string) {
    return this.apiService.post(
      routes.login(),
      { username, password }
    ).pipe(
      map(res => {
        if (res && res.data && res.data.token) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userName', res.data.userName);
        }
        return res;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.router.navigate(['/']);
  }

  /**
   * Check if user is logged in
   */
  public isLoggedIn() {
    const lsToken = localStorage.getItem('token');
    if (lsToken && lsToken !== 'null') {
      return true;
    }
    return false;
  }
}

