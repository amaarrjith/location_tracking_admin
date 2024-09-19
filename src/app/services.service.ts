import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private baseUrl = 'http://127.0.0.1:8000/api/'
  constructor(private http : HttpClient) { }

  getLocation(){
    return this.http.get(`${this.baseUrl}location`)
  }

  getallLocation(){
    return this.http.get(`${this.baseUrl}alllocation`)
  }
  deleteallLocations(){
    return this.http.delete(`${this.baseUrl}location`)
  }
  deleteMessages(id:any){
    return this.http.delete(`${this.baseUrl}location/${id}`)
  }
}
