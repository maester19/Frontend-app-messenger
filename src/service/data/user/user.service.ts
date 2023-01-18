import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../backend/backend.service';
import { FormatUserService } from './format-user.service';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = '/auth';
  public static user: any = { userId: "", token: "" };
  public static profil: any
  public static isOnline: any = false

  public static taches:any;
  public static haveTaches=false;
  
  constructor(
    private http: HttpClient,
    private formatUserService: FormatUserService,
    private cookieService: CookieService,
    private authservice: AuthService
  ) {}
  
  public getAll() {
    return new Promise((resolve, reject) => {
      this.http.get(BackendService.url + this.url).subscribe((response) => {
        this.setCacheTaches(this.format(response));
        resolve(this.getCacheTaches());
      });
    });
  }

  public getFirstPage() {
    return new Promise((resolve, reject) => {
      this.http
        .get(BackendService.url + this.url + '?page=1')
        .subscribe((response) => {
          this.setCacheTaches(this.format(response));
          resolve(this.getCacheTaches());
        });
    });
  }
  public search(val: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(BackendService.url + this.url + '/search/' + val)
        .subscribe((response) => {
          this.setCacheTaches(this.format(response));
          resolve(this.getCacheTaches());
        });
    });
  }
  /* mise a jour d'un user */
  public update(user: any) {
    var url = BackendService.url + this.url + '/' + user._id;
    return new Promise((resolve, reject) => {
      this.http
        .put<any>(url, this.formatUserService.formatForUpdate(user))
        .subscribe((response) => {
          this.authservice.setProfil(response.user)
          resolve(response);
        });
    });
  }

  
  /* mise a jour d'un user */
  public changePassword(id:any, info: any) {
    var url = BackendService.url + this.url + '/changePW/' + id;
    return new Promise((resolve, reject) => {
      this.http
        .put<any>(url, info)
        .subscribe((response) => {
          resolve(response.message);
        });
    });
  }

   /* creer d'un user */
   public create(user: any) {
    var url = BackendService.url + this.url + '/signup';
    var data=this.formatUserService.formatForUpdate(user);
    return new Promise((resolve, reject) => {
      this.http
        .post(url,data)
        .subscribe((response) => {
          resolve(response);
        });
    });
  }

   /* supprimer un user */
   public delete(code: any) {
    var url = BackendService.url + this.url + '/' + code;
    return new Promise((resolve, reject) => {
      this.http
        .delete<any>(url, {})
        .subscribe((response) => {
          resolve(response.message);
        });
    });
  }
  // afficher un user 
  public getOne(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${BackendService.url + this.url}/${id}`)
      .subscribe({
        next: response => {
            resolve(response.user);
        },
        error: error => {
           reject(error);
        }
    });
    })
  }

  format(response: any) {
    return this.formatUserService.format(response);
  }
   /* met a jour la cache*/
   setCacheTaches(taches:any){
    UserService.taches=taches;
    UserService.haveTaches=true;
   }
   /* retourne si la cache est remplie*/
   cacheIsFilled(){
      return  UserService.haveTaches;
   }
   /* renvoie la cache*/
   getCacheTaches(){
    return   UserService.taches;
   }
   
   createEmptyUser(){
    return this.formatUserService.createEmptyUser();
   }

}
