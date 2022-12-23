import { Component, Input } from '@angular/core';
import {
  FilterService,
  BaseFilterCellComponent,
} from '@progress/kendo-angular-grid';

/**
 * NOTE: Interface declaration here is for demo compilation purposes only!
 * In the usual case include it as an import from the data query package:
 *
 * import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
 */
interface CompositeFilterDescriptor {
  logic: 'or' | 'and';
  filters: Array<any>;
}

@Component({
  selector: 'my-dropdown-filter',
  template: `
    <input>
    <kendo-dropdownlist
        [data]="data"
        (valueChange)="onChange($event)"
        [defaultItem]="defaultItem"
        [value]="selectedValue"
        [valuePrimitive]="true"
        [textField]="textField"
        [valueField]="valueField">
    </kendo-dropdownlist>
  `,
})
export class DropDownListFilterComponent extends BaseFilterCellComponent {
  public get selectedValue(): unknown {
    console.log('selectedValue() - this.valueField: ', this.valueField);
    const filter = this.filterByField(this.valueField);
    console.log('selectedValue() - filter:  ', filter);
    return filter ? filter.value : null;
    return 'AAA';
  }

  inputText: string = '';
  @Input() public filter: CompositeFilterDescriptor;
  @Input() public data: unknown[];
  @Input() public textField: string;
  @Input() public valueField: string;

  public get defaultItem(): { [Key: string]: unknown } {
    return {
      [this.textField]: 'Select item...',
      [this.valueField]: null,
    };
  }

  constructor(filterService: FilterService) {
    super(filterService);
    setTimeout(() => {
      console.log('data: ', this.data);
      console.log('data sample: ', this.data[0]);
    }, 1500);
  }

  public onChange(value: unknown): void {
    console.log('onChange() :', value);
    this.applyFilter(
      value === null // value of the default item
        ? this.removeFilter(this.valueField) // remove the filter
        : this.updateFilter({
            // add a filter for the field with the value
            field: this.valueField,
            operator: 'eq',
            value: value,
          })
    ); // update the root filter
  }
}
