import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepertoireService } from 'src/service/data/repertorie/repertoire.service';
import { AuthService } from 'src/service/data/user/auth.service';
import { UserService } from 'src/service/data/user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  profil: any
  user: any
  repertoire: any =  {
    _id: '',
    contacts: [],
    userId: '',
  }
  actu: any = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private RepService: RepertoireService
  ) { }

  ngOnInit(): void {
    this.profil = this.authService.getCurrentUser()
    this.user = this.userService.getOne(this.profil._id)
    console.log(this.user)
    this.right()
    this.getRep()
  }

  right(){
    if(!this.authService.isConnect())
      this.router.navigateByUrl("/home")
  }

  logout(){
    this.authService.logout()
    this.router.navigateByUrl("/home")
  }

  getRep(){
    this.RepService.getByUser(this.profil._id).then(response => {
      console.log(response)
      if(response)
        this.repertoire = response
    })
  }

  actudisc(){
    this.actu = true
    console.log(this.profil.listDisc.length)
  }

}
