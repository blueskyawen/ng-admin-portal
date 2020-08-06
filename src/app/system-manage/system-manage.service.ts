import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SystemManageService {

  constructor(private http: HttpClient) { }

  getUserData(id: string) {
    return this.http.get(`/api/author/users/${id}`);
  }

  editUserData(data: any) {
    return this.http.put('/api/author/modify', data);
  }
}
