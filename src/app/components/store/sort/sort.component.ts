import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent {
  readonly testForm = new FormGroup({
    testValue: new FormControl('orange'),
  });

  readonly fruits = ['apple', 'orange', 'pineapple'];
}
