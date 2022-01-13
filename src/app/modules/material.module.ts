import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// angular material module
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
//primeng module
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DropdownModule} from 'primeng/dropdown';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,MatIconModule,MatButtonModule,MatTabsModule,MatFormFieldModule,MatInputModule,MatTableModule,MatPaginatorModule,ConfirmDialogModule,MatSelectModule,MatAutocompleteModule,DropdownModule,MatCardModule,MatListModule
  ],
  exports:[MatToolbarModule,MatIconModule,MatButtonModule,MatTabsModule,MatFormFieldModule,MatInputModule,MatTableModule,MatPaginatorModule,ConfirmDialogModule,MatSelectModule,MatAutocompleteModule,DropdownModule,MatCardModule,MatListModule]
})
export class MaterialModule { }
