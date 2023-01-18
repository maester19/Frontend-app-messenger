import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { UserService } from 'src/service/data/user/user.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() profil: any
  @Input() actu: any

  contacts: any = []
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.myContact()
    interval(1000).subscribe(value => {
      if(this.actu){
        this.myContact
        this.actu = false
      }
    })
    
  }

  myContact(){
    for(let i = 0; i < this.profil.listDisc.length; i++) {
      this.userService.getOne(this.profil.listDisc[i]).then(response => {
        this.contacts.push(response);
      });
    };
  }

}
