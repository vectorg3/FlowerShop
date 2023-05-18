import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent {
  readonly testForm = new FormGroup({
    testValue: new FormControl(''),
  });
  readonly fruits = ['Рейтинг', 'Цена', 'Название'];
  @Output() onSort = new EventEmitter();
  onSortClick() {
    this.onSort.emit(this.testForm.value.testValue);
  }
}
