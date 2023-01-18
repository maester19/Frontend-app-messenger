import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  // public static url='http://localhost:3005';
  public static url= environment.API_URL; 
  // public static url='http://localhost:3005';
  constructor() { }
 
}