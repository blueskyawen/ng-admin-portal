import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  lang: any = 'zh';
  constructor(private http: HttpClient) {
  }

  userLoginin(data: any): any {
    return this.http.post('/api/author/login', data);
  }

  userLoginout(data: any): any {
    return this.http.post('/api/author/logout', data);
  }

  userRegister(data: any): any {
    return this.http.post('/api/author/register', data);
  }
}
