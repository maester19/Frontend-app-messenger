import { Injectable } from '@angular/core';
import { BackendService } from './backend/backend.service';
  
@Injectable({
providedIn: 'root',
})
export class AffichageService {
    public static navbar: Boolean = true ; 

    constructor() {}

    public setNav(nav: Boolean):void {
        AffichageService.navbar = nav
    }
    getNav(){
        return AffichageService.navbar;
    }

}
  