import { Component, Input, OnInit, Output } from '@angular/core';
import { profile } from 'console';
import { UserService } from 'src/service/data/user/user.service';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.scss']
})
export class RepertoireComponent implements OnInit {

  @Input() repertoire: any 
  @Input() profil: any
  contacts: any = []
  users: any = []
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.userService.getAll().then(response => {
      this.users = response
      this.myContact()
      for(let i = 0; i < this.contacts.length; i++){
        this.users.pop(this.contacts[i])
      }
      console.log(response)
    })
  }

  myContact(){
    for(let i = 0; i < this.repertoire.contacts.length; i++) {
      this.userService.getOne(this.repertoire[i]).then(response => {
        this.contacts.push(response);
      });
    };
  }

  add(contact: any){
    this.contacts.push(contact)
    this.repertoire.contacts.push(contact._id)
    this.profil.listDisc.push(contact._id)
    this.userService.update(this.profil)
    this.users.pop(contact)
  }



}
