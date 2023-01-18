import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RepertoireComponent } from './repertoire/repertoire.component';
import { ArchiveComponent } from './archive/archive.component';
import { ContactLockComponent } from './contact-lock/contact-lock.component';
import { RoutingModule } from './Router';
import { ChatComponent } from './chat/chat.component';
import { StatutComponent } from './statut/statut.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './subComponent/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RepertoireComponent,
    ArchiveComponent,
    ContactLockComponent,
    ChatComponent,
    StatutComponent,
    TeamPageComponent,
    HomeComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
