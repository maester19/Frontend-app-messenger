import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() load!: boolean;
  @Input() verif!: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  redirect(){
    this.router.navigateByUrl("/"+this.verif.next)
  }

}
