import { Component, Input } from '@angular/core';
import {
  FilterService,
  BaseFilterCellComponent,
} from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

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
    (ngModelChange)="onTextInputChange($event)">
    <kendo-dropdownlist
        [data]="stringOperators"
        (valueChange)="inputTextSubject$.next($event)"
        [defaultItem]="defaultItem"
        [value]="selectedOperatorValue"
        [valuePrimitive]="true"
        textField="text"
        valueField="value">
    </kendo-dropdownlist>
  `,
})
export class DropDownListFilterComponent extends BaseFilterCellComponent {
  inputText: string = '';
  inputTextSubject$: Subject<string> = new Subject<string>();
  destroy$ = new Subject<void>();
  selectedOperatorValue = null;
  stringOperators = [..._stringOperators];

  @Input() public filter: CompositeFilterDescriptor;
  @Input() public valueField: string;
  @Input() public defaultOperator: number = 3;
  @Input() debounceTime: number = 300;

  public get defaultItem(): { [Key: string]: unknown } {
    return {
      ...this.stringOperators.find((op) => op.value === this.defaultOperator),
    };
  }

  constructor(filterService: FilterService) {
    super(filterService);
  }

  ngOnInit() {
    this.inputTextSubject$
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(this.debounceTime),
        distinctUntilChanged()
      )
      .subscribe((text) => {
        this.inputText = text;
        this.handleTextInputChange();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public handleTextInputChange(): void {
    const selectedOperator = this.selectedOperatorValue
      ? this.selectedOperatorValue
      : this.defaultOperator;
    this.applyFilter(
      this.updateFilter({
        // add a filter for the field with the value
        field: this.valueField,
        operator: this.stringOperators.find((op) => op.value === 3).operator,
        value: this.inputText,
        ignoreCase: true,
      })
    );
  }

  public onOperatorChange(value: unknown): void {
    this.selectedOperatorValue = value;
    // update the root filter
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
    );
  }
}
