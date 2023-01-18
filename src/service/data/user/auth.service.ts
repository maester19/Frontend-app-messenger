import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../backend/backend.service';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = '/auth';
  public static user: any = { userId: "", token: "" };
  public static profil: any
  public static isOnline: any = false
  public static reload: Boolean = false
  
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}
  
   /* se connecter */
   public login(user: any) {
    var url = BackendService.url + this.url + '/login';
    return new Promise((resolve, reject) => {
      this.http
        .post(url,user)
        .subscribe((response) => {
          AuthService.user = response;
          resolve(response);
        });
    });
  }

  /* se connecter avec les cookis*/
  public loginWithCooki(user: any) {
    var url = BackendService.url + this.url + '/login';
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(url,user)
        .subscribe({
          next: (response) => {
            AuthService.user = response
            this.cookieService.set('token-MS', JSON.stringify(AuthService.user));
            this.http.get<any>(`${BackendService.url + this.url}/${response.userId}`)
            .subscribe({
              next: response => {
                if(response.user != null){
                  AuthService.profil = response.user
                  this.cookieService.set('cookie-MS', JSON.stringify(AuthService.profil));
                  AuthService.isOnline = true;
                  resolve(response.user);
                }
                resolve({message: "Paire login/mot de passe incorrecte"})
              }
            })
          },
          error: (error) => {
            reject(false);
          },
        });
    });
  }

  /* verifie si un utilisateur est connecte */
  public isConnect() {

    if (this.cookieService.check('cookie-MS')) {
      AuthService.profil = JSON.parse(this.cookieService.get('cookie-MS'));
      AuthService.user = JSON.parse(this.cookieService.get('token-MS'));
      AuthService.isOnline = true;
    }
    return AuthService.isOnline;
  }

  // se deconnecter
  public logout(){
    this.cookieService.delete('cookie-MS');
    this.cookieService.delete("token-MS")
    AuthService.isOnline = false;
    AuthService.profil = null;
    AuthService.user = { userId: "", token: "" }
  }

  getCurrentUser(){
    AuthService.reload = false;
    return JSON.parse(this.cookieService.get('cookie-MS'));
  }

  setProfil(user:any){
    AuthService.profil = user
    this.cookieService.set("cookie-MS", JSON.stringify(AuthService.profil))
    AuthService.reload = true;
  }
  
  getAuth(){
    if (this.cookieService.check('token-MS')) {
      return JSON.parse(this.cookieService.get('token-MS'));
    }
    else
      return AuthService.user;
  }

  getReload(){
    return AuthService.reload
  }

}
