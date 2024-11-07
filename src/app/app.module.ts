import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScreenComponent } from './components/screen/screen.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { provideHttpClient } from '@angular/common/http';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GasListComponent } from './components/gas-list/gas-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreenComponent,
    FilterBarComponent,
    GasListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
