import { Component, Input } from '@angular/core';
import {
  FilterService,
  BaseFilterCellComponent,
} from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';

const _stringOperators = [
  {
    text: 'Starts with',
    value: 1,
    operator: 'startswith',
  },
  {
    text: 'Ends with',
    value: 2,
    operator: 'endswith',
  },
  {
    text: 'Contains',
    value: 3,
    operator: 'contains',
  },
  {
    text: 'Does not contain',
    value: 4,
    operator: 'doesnotcontain',
  },
  {
    text: 'Is empty',
    value: 5,
    operator: 'isempty',
  },
  {
    text: 'Is not empty',
    value: 6,
    operator: 'isnotempty',
  },
];

@Component({
  selector: 'my-dropdown-filter',
  template: `
    <input [ngModel]="inputText" [ngModelOptions]="{ standalone: true }"
    (ngModelChange)="onTextInputChange()">
    <kendo-dropdownlist
        [data]="stringOperators"
        (valueChange)="onOperatorChange($event)"
        [defaultItem]="defaultItem"
        [value]="selectedOperatorValue"
        [valuePrimitive]="true"
        textField="text"
        valueField="value">
    </kendo-dropdownlist>
  `,
})
export class DropDownListFilterComponent extends BaseFilterCellComponent {
  // public get selectedValue(): unknown {
  //   console.log('selectedValue() - this.valueField: ', this.valueField);
  //   const filter = this.filterByField(this.valueField);
  //   console.log('selectedValue() - filter:  ', filter);
  //   return filter ? filter.value : null;
  //   return 'AAA';
  // }

  inputText: string = '';
  selectedOperatorValue = null;
  stringOperators = [..._stringOperators];

  @Input() public filter: CompositeFilterDescriptor;
  // @Input() public data: unknown[];
  // @Input() public textField: string;
  @Input() public valueField: string;
  @Input() public defaultOperator: number = 3;

  public get defaultItem(): { [Key: string]: unknown } {
    return {
      ...this.stringOperators.find((op) => op.value === this.defaultOperator),
    };
  }

  constructor(filterService: FilterService) {
    super(filterService);
    // setTimeout(() => {
    // console.log('data: ', this.data);
    // console.log('data sample: ', this.data[0]);
    // console.log('operator list ', this.operators);
    // }, 1500);
  }

  public onTextInputChange(): void {
    const selectedOperator = this.selectedOperatorValue
      ? this.selectedOperatorValue
      : this.defaultOperator;
    this.applyFilter(
      this.updateFilter({
        // add a filter for the field with the value
        field: this.valueField,
        operator: this.stringOperators.find(
          (op) => op.value === selectedOperator
        ).operator,
        value: this.inputText,
        ignoreCase: true,
      })
    );
  }

  public onOperatorChange(value: unknown): void {
    // console.log('onChange() :', value);
    this.selectedOperatorValue = value;
    // console.log(
    //   'APPLY: ',
    //   this.valueField,
    //   this.stringOperator.find((op) => op.value === this.selectedOperatorValue)
    //     .operator,
    //   this.inputText
    // );
    this.applyFilter(
      value === null // value of the default item
        ? this.removeFilter(this.valueField) // remove the filter
        : this.updateFilter({
            // add a filter for the field with the value
            field: this.valueField,
            operator: this.stringOperators.find(
              (op) => op.value === this.selectedOperatorValue
            ).operator,
            value: this.inputText,
            ignoreCase: true,
          })
    ); // update the root filter
  }
}
