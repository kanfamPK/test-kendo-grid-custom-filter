import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';

import { AppComponent } from './app.component';
import { DropDownListFilterComponent } from './dropdownlist-filter.component';
import { FormsModule } from '@angular/forms';

// enableProdMode();

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, DropDownListFilterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GridModule,
    DropDownListModule,
    FormsModule,
  ],
})
export class AppModule {}
