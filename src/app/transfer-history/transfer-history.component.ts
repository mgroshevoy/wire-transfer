import {Component, OnInit} from '@angular/core';
import {TransferType} from '../typings';
import {StorageService} from '../storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transfer-history',
  templateUrl: './transfer-history.component.html',
  styleUrls: ['./transfer-history.component.sass']
})
export class TransferHistoryComponent implements OnInit {
  public history: TransferType[];

  constructor(
    private storageService: StorageService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.history = this.storageService.get();
  }

  public onClickDelete(index: number) {
    this.history.splice(index, 1);
    this.storageService.set(this.history);
  }

  public onClickRepay(index: number) {
    this.router.navigate(['transfer/create'], {
      state: {transferIndex: index}
    }).catch(err => console.error(err));
  }
}
