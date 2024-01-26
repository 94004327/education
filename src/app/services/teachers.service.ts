import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  
  constructor(private httpClient:HttpClient) { }

  
}
