import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatUserService {

  constructor() {}
  format(response: any) {
    const vals = [];
    var i = 0;
    var k = 0;
    var taille = response.length;
    while (i < taille) {
      const tab = [];
      for (var j = 0; j < 10; j++) {
        if (i < taille) {
          tab[j] = response[i]
        }
        i++;
      }
      vals[k] = tab;
      k++;
    }

    return { data: vals, nbResult: taille, current: 0, length: k };
  }

  formatForUpdate(user: any) {
    return {
      //name
      name: user.name,
      //surname
      surname: user.surname,
      // country
      country: user.country, 
      // email
      email: user.email,
      // phone
      phone: user.phone, 
      // description
      description: user.description,
      // password
      password: user.password,
    };
  }
  createEmptyUser(){
    return  {
      //id 
      _id: "",
      //name
      name: "", 
      // phone
      phone: "+2376", 
      // description
      description: "",
      // password
      password: "",
    }
  }
}
