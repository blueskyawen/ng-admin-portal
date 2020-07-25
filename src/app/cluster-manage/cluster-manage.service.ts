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
}
