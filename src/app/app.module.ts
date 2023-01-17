import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RepertoireComponent } from './repertoire/repertoire.component';
import { ArchiveComponent } from './archive/archive.component';
import { ContactLockComponent } from './contact-lock/contact-lock.component';
import { RoutingModule } from './Router';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RepertoireComponent,
    ArchiveComponent,
    ContactLockComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
