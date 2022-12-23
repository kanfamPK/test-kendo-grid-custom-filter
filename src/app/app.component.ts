import { Component } from '@angular/core';
import { sampleProducts } from './products';
import { Product, Category } from './model';

const distinct = (data) =>
  data
    .map((x) => x.Category)
    .filter(
      (x, idx, xs) =>
        xs.findIndex((y) => y.CategoryName === x.CategoryName) === idx
    );

@Component({
  selector: 'my-app',
  template: `
    <kendo-grid
        [kendoGridBinding]="gridData"
        [pageSize]="5"
        [sortable]="true"
        [pageable]="true"
        [filterable]="true">
        <kendo-grid-column field="ProductID" title="ID" [width]="60" [filterable]="false">
        </kendo-grid-column>
        <kendo-grid-column field="ProductName" title="Product Name">
        </kendo-grid-column>
        <kendo-grid-column field="Category.CategoryName" title="Category">
            <ng-template kendoGridFilterCellTemplate let-filter>
                <my-dropdown-filter
                    [filter]="filter"
                    [data]="distinctCategories"
                    textField="CategoryName"
                    valueField="CategoryID"></my-dropdown-filter>
            </ng-template>
        </kendo-grid-column>
    </kendo-grid>
`,
})
export class AppComponent {
  public distinctCategories: Category[] = distinct(sampleProducts);
  public gridData: Product[] = sampleProducts;
}
