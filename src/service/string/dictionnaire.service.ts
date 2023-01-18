import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DictionnaireService {

  public static dictio=[
    {fr:'rechercher projet',en:'search project'},
    {fr:'liste des projets',en:'list projects'},
    {fr:'projets verrouillés',en:'locked projects'},
    {fr:'liste des projets',en:'list projects'},
    {fr:'charge ...',en:'load ...'},
    {fr:'tous',en:'all'},
    {fr:'toutes',en:'all'},
]
constructor() { }
public static  searchFrToEN(value:string){
    for(var i=0;i<this.dictio.length;i++){
        if(this.dictio[i].fr==value){
            return this.dictio[i].en ;
        }
    }
    return value;
}
}
