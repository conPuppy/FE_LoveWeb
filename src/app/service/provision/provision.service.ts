import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provision } from 'src/app/model/Provision';

@Injectable({
  providedIn: 'root'
})
export class ProvisionService {
  private url = "http://localhost:8080/provisions";
  constructor(private http:HttpClient) {}
  getBasic():Observable<Provision[]>{
    return this.http.get<Provision[]>(this.url+'/basic')
  }
  getFree():Observable<Provision[]>{
    return this.http.get<Provision[]>(this.url+'/free')
  }
  getExtend():Observable<Provision[]>{
    return this.http.get<Provision[]>(this.url+'/extend')
  }
}
