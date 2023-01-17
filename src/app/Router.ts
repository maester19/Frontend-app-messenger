import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveComponent } from './archive/archive.component';
import { ContactLockComponent } from './contact-lock/contact-lock.component';
import { MainComponent } from './main/main.component';
import { RepertoireComponent } from './repertoire/repertoire.component';

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: 'contact', component: RepertoireComponent },
  { path: "archived", component: ArchiveComponent },
  { path: "bloque", component: ContactLockComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
  