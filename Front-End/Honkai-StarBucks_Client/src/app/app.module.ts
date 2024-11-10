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
import { ApiService } from './api.service';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'trailblazer', component: TrailblazerComponent },
    { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TrailblazerComponent,
    HomeComponent,
    LoginComponent,
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
