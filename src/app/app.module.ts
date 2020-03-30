import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransferHistoryComponent } from './transfer-history/transfer-history.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { WireTransferComponent } from './wire-transfer/wire-transfer.component';
import { CardNumberComponent } from './card-number/card-number.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TransferHistoryComponent,
    NoPageFoundComponent,
    WireTransferComponent,
    CardNumberComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
