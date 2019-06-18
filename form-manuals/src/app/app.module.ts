import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { CreateFormComponent } from './components/create-formulario/createForm.component';
import { ListComponent } from './components/list/list.component';
import { EditProductComponent } from './components/edit-product/editProduct.component';
import { ExcelService } from './services/excel.service';
import { NgxQRCodeModule } from 'ngx-qrcode2';



// Animations
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Material Design
import { MaterialModule } from './material-components';
import {MatInputModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FilterTagPipe } from './pipes/filter-tag.pipe';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateFormComponent,
    EditProductComponent,
    FilterTagPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    NgxQRCodeModule,
    HttpClientModule,
  ],
  providers: [ExcelService],
  bootstrap: [AppComponent],
})
export class AppModule { }
