import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TransferHistoryComponent} from './transfer-history/transfer-history.component';
import {NoPageFoundComponent} from './no-page-found/no-page-found.component';
import {WireTransferComponent} from './wire-transfer/wire-transfer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'transfer',
    pathMatch: 'full'
  },
  {
    path: 'transfer',
    children: [
      {path: '', redirectTo: 'create', pathMatch: 'full'},
      {path: 'create', component: WireTransferComponent},
      {path: 'history', component: TransferHistoryComponent}
    ],
  },
  {path: '**', component: NoPageFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
