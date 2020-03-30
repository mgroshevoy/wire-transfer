import {AfterViewInit, Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormArray, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

@Component({
  selector: 'app-card-number',
  templateUrl: './card-number.component.html',
  styleUrls: ['./card-number.component.sass'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CardNumberComponent),
    multi: true
  }]
})
export class CardNumberComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  public numbersForm: FormArray = new FormArray([
    new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('[0-9]*'),
    ]),
    new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('[0-9]*'),
    ]),
    new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('[0-9]*'),
    ]),
    new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('[0-9]*'),
    ]),
  ]);
  private _value: string;

  get value() {
    return this._value;
  }

  @Input()
  set value(val) {
    this._value = val;
    this.onChange(this._value);
  }

  constructor() {
  }

  ngOnInit(): void {
    this.numbersForm.valueChanges.subscribe(x => {
      this.value = x.join(' ');
    });
  }

  ngAfterViewInit() {
    if (this.value) {
      setTimeout(() => {
        const parts = this.value.split(' ');
        for (let i = 0; i < parts.length; i++) {
          this.numbersForm.controls[i].setValue(parts[i], {emitEvent: false});
        }
      });
    }
  }

  onChange(_: any) {
  }

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched() {
  }
}
