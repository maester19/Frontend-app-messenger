import { Injectable } from '@angular/core';
import { DictionnaireService } from './dictionnaire.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StringService {

  maxLengthOfString=20;
  public static lang='fr';
  constructor(
    private cookieService: CookieService,
  ) {}

  troncate(value:string,length:number){
    if(value){
      if(length<=0){
      length=this.maxLengthOfString;
    }
    if(value.length<=length){
      return value;
    }else{
      return value.slice(0,length-3)+'...';
    }}
    else{
      return ''
    }
  }

  /*
   met en majiscule la premiere lettre d'une phrase  
  */
  capitaliseFirst(value:string){
    let length=value.length;
    let val1=value.slice(0,1);
    let val2=value.slice(1,length);
    val1=val1.toUpperCase();
    return val1+val2;
  }

  // format les nombres en somme d'argent
  formatMoney(value:number){
    return String(value).replace(/(.)(?=(\d{3})+$)/g,'$1 ');
  }

  // format les chaine de caractere issu des <input type=date > en chaine plus lisible
  formatDate(value:any){
    if(value==null){
      return '';
    }else{
      var tab=value.split('T');
      return tab[0];
    }
  }

  public static setLangToEnglish(){
    this.lang='en';
  }

  public static setLangToFrench(){
    this.lang='fr';
  }

  public static langIsFrench(){
    return this.lang=='fr';
  }

  public static langIsEnglish(){
    return this.lang=='en';
  }

  public static changeLang(){
    if(this.lang=='fr'){
      this.lang='en';
    }else{
      this.lang='fr';
    }
  }

  public static traduction(value:string){
    if(this.lang=='en'){
      return DictionnaireService.searchFrToEN(value);
    }else{
      return value;
    }
  }
  
  public static setLang(lang:string){
    this.lang=lang;
  }

  public static getLang(){
    return this.lang;
  }

  updateLang(){
    this.cookieService.set('lang-SPBIP', StringService.lang);
  }
  
  /* si la chaine est null retourne une chaine vide*/
  stringBecomeNotNull(val:any){
    if(val==null){
      return '';
    }else{
      return val;
    }
  }
}
