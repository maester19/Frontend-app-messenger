import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepertoireService } from 'src/service/data/repertorie/repertoire.service';
import { AuthService } from 'src/service/data/user/auth.service';
import { UserService } from 'src/service/data/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  alert: any = false;
  user: any = {
    phone: "+2376",
    password: ""
  }
  info: any

  profil: any;
  verify: any = "";
  verif: any = {
    msg: String,
    val: Boolean,
    next: String
  }
  load: any = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private repService: RepertoireService
  ) { }

  ngOnInit(): void {
    this.profil = this.userService.createEmptyUser();
  }

  connect(){
    this.authService.loginWithCooki(this.user)
    .then((response) => { 
      this.info = response
      if(this.info.message){
        this.alert = true
      }
      if(response == false){
        this.info.message = "Paire login/mot de passe incorrecte"
        this.alert = true
      }
      if(this.info._id){
        this.router.navigateByUrl("/main")
      }
    })
  }

  closeAlert(){
    this.alert = false;
  }

  // code de la creation de compte 
  submit(){
    this.verif = this.verification();
    if(this.verif.val){
      this.load = true;
      this.userService.create(this.profil)
      .then((response) => { 
        let user: any = response
        console.log(response)
        this.load = false
        this.profil = this.userService.createEmptyUser()
        this.verify = ''
        this.verif.msg = "Utilisateur créé " 
        this.repService.create({contacts: [], userId: user.user._id }).then(response => {
          console.log(response)
        })
      })
      .catch((error) => { console.log(error), this.verif.msg = "Adresse email deja utiliser veillez la changer" })

      
    }
    
  }

  verification(){
    let valid: any = {
      msg:  "",
      val: false,
      next: ""
    }

    if( this.profil.name == "" || this.profil.phone == "" || this.profil.password == "" || this.profil.password != this.verify ){
      valid.msg = "Veillez verifier tous les champs avant de soumettre le formulaire"
      valid.val = false
    }else{
      valid.msg = "Veillez patienter ... "
      valid.val = true
      valid.next = "/home"
    }
    return valid;
  }

}
