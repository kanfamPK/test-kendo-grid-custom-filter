import { Component, Input } from '@angular/core';
import {
  FilterService,
  BaseFilterCellComponent,
} from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';

@Component({
  selector: 'my-dropdown-filter',
  template: `
    <input>
    <kendo-dropdownlist
        [data]="stringOperator"
        (valueChange)="onChange($event)"
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
  stringOperator = [
    {
      text: 'Startswith',
      value: 1
    },
    {
      text: 'Ends with',
      value: 2
    },
    {
      text: 'Contains',
      value: 3
    },
    {
      text: 'Does not contain',
      value: 4
    },
    {
      text: 'Is empty',
      value: 5
    },
    {
      text: 'Is not empty',
      value: 6
    },
  ]

  @Input() public filter: CompositeFilterDescriptor;
  @Input() public data: unknown[];
  @Input() public textField: string;
  @Input() public valueField: string;
  @Input() public defaultOperator: number = 2;


  public get defaultItem(): { [Key: string]: unknown } {
    return {
      ...this.stringOperator[this.defaultOperator]
    };
  }

  constructor(filterService: FilterService) {
    super(filterService);
    setTimeout(() => {
      console.log('data: ', this.data);
      console.log('data sample: ', this.data[0]);
      console.log('operator list ', this.operators)
    }, 1500);
  }

  public onChange(value: unknown): void {
    console.log('onChange() :', value);
    // this.applyFilter(
    //   value === null // value of the default item
    //     ? this.removeFilter(this.valueField) // remove the filter
    //     : this.updateFilter({
    //         // add a filter for the field with the value
    //         field: this.valueField,
    //         operator: 'eq',
    //         value: value,
    //       })
    // ); // update the root filter
  }
}
