import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClusterManageService {

  constructor(private http: HttpClient) { }

  getClusterById(id: string) {
    return this.http.get(`/api/cluster/list/${id}`);
  }

  postAddCluster(data: any) {
    return this.http.post('/api/cluster/list/add', data);
  }

  getClusterList() {
    return this.http.get('/api/cluster/list');
  }

  deleteCluster(id: string) {
    return this.http.delete(`/api/cluster/list/${id}`);
  }

  getCurAlarms(grade: string) {
    return this.http.get(`/api/alarm/list?type=${grade}`);
  }
}
