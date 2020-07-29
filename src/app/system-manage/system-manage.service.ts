import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SystemManageService {

  constructor(private http: HttpClient) { }

  getUserData(name: string) {
    return this.http.get(`/api/author/users/${name}`);
  }

  editUserData(data: any) {
    return this.http.put('/api/author/modify', data);
  }
}
