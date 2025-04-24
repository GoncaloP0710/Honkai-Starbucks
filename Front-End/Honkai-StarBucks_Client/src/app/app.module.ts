import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { TrailblazerComponent } from './trailblazer/trailblazer.component';
import { HomeComponent } from './home/home.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { TierListComponent } from './tier-list/tier-list.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { BattleComponent } from './battle/battle.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'trailblazer', component: TrailblazerComponent },
    { path: 'login', component: LoginComponent },
    { path: 'tier-lists', component: TierListComponent },
    { path: 'about', component: AboutComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'battle', component: BattleComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TrailblazerComponent,
    HomeComponent,
    LoginComponent,
    TierListComponent,
    AboutComponent,
    ServicesComponent,
    ContactComponent,
    BattleComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    CommonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterModule.forRoot(routes),
    DragDropModule,
    HttpClientModule,
  ],
  exports: [
    CommonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
