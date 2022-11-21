import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { AppRouterModule } from './app-router.module';
import { VentasModule } from './ventas/ventas.module';

//cambiar el locale de la app
import localEs  from '@angular/common/locales/es';
import localFr  from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common'

registerLocaleData (localFr);
registerLocaleData (localEs); //esto es para poner de idioma español

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    BrowserAnimationsModule,
    SharedModule,
    VentasModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue:'es'} //esto es para poner de idioma español
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
