import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StorageService} from '../storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wire-transfer',
  templateUrl: './wire-transfer.component.html',
  styleUrls: ['./wire-transfer.component.sass']
})
export class WireTransferComponent implements OnInit {
  public months: string[];
  public years: string[];
  public transferForm: FormGroup;
  private transferIndex: number;
  private submitted: boolean;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
  ) {
    this.months = this.rangeInteger(12, 1).map(item => ('' + 0 + item).slice(-2));
    this.years = this.rangeInteger(10, (new Date()).getFullYear()).map(item => ('' + 0 + item).slice(-2));
  }

  ngOnInit(): void {
    if (history.state.transferIndex !== undefined) {
      const transfer = this.storageService.get()[history.state.transferIndex];
      this.transferForm = this.fb.group({
        cardNumber: [transfer.cardNumber, Validators.required],
        fio: [transfer.fio, Validators.pattern('[a-zA-Z ]*')],
        tilMonth: [transfer.tilMonth, Validators.required],
        tilYear: [transfer.tilYear, Validators.required],
        receiverCardNumber: [transfer.receiverCardNumber, Validators.required],
        sum: [transfer.sum, Validators.pattern('[0-9.]*')],
        date: ''
      });
    } else {
      this.transferForm = this.fb.group({
        cardNumber: ['', Validators.required],
        fio: ['', Validators.pattern('[a-zA-Z ]*')],
        tilMonth: ['', Validators.required],
        tilYear: ['', Validators.required],
        receiverCardNumber: ['', Validators.required],
        sum: ['', Validators.pattern('[0-9.]*')],
        date: ''
      });
    }
  }

  public rangeInteger(range: number, startFrom: number): number[] {
    return Array(range).fill(0).map((x, i) => startFrom + i);
  }

  public onClickTransfer() {
    this.submitted = true;
    console.log(this.transferForm.valid);
    if (this.transferForm.valid) {
      console.log(this.transferForm.value);
      const storedTransfers = this.storageService.get() || [];
      storedTransfers.push({...this.transferForm.value, date: Date()});
      this.storageService.set(storedTransfers);
      this.router.navigate(['transfer/history'])
        .catch(err => console.error(err));
    }
  }
}
