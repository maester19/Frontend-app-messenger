import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../backend/backend.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class RepertoireService {
  url = '/repertoire';
  public static user: any = { userId: "", token: "" };
  public static profil: any
  public static isOnline: any = false

  public static taches:any;
  public static haveTaches=false;
  
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}
  
  public getAll() {
    return new Promise((resolve, reject) => {
      this.http.get<any>(BackendService.url + this.url).subscribe((response) => {
        resolve(response.repertoires);
      });
    });
  }

  public create(repertoire: any) {
    var url = BackendService.url + this.url ;
    var data= repertoire;
    return new Promise((resolve, reject) => {
      this.http
        .post(url,data)
        .subscribe((response) => {
          resolve(response);
        });
    });
  }

  public search(val: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(BackendService.url + this.url + '/search/' + val)
        .subscribe((response) => {
          resolve(response);
        });
    });
  }
  /* mise a jour d'un user */
  public update(user: any) {
    var url = BackendService.url + this.url + '/' + user._id;
    return new Promise((resolve, reject) => {
      this.http
        .put<any>(url, user)
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
            resolve(response.repertoire);
        },
        error: error => {
           reject(error);
        }
    });
    })
  }
 
  public getByUser(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${BackendService.url + this.url}/getByUser/${id}`)
      .subscribe({
        next: response => {
            resolve(response.repertoire);
        },
        error: error => {
           reject(error);
        }
    });
    })
  }



}
