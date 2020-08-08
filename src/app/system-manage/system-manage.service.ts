import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import {catchError, toArray, map, mergeMap} from 'rxjs/operators';

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

  getUserList() {
    return this.http.get('/api/author/users');
  }

  getClusterList() {
    return this.http.get('/api/cluster/list');
  }

  getUsers() {
    return forkJoin(this.getUserList(), this.getClusterList()).pipe(
        map((data: any) => {
          if (data[1] && data[1].clusters && Array.isArray(data[1].clusters) && data[1].clusters.length !== 0) {
            return data[0].users.map(x => {
              x.clusterNames =data[1].clusters.filter(item => x.clusters.includes(item.id)).map(y => y.name);
              return x;
            });
          } else {
            return data[0].users.map(x => {
              x.clusterNames = [];
              return x;
            });
          }
        }));
  }
}
