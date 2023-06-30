 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { ListTipoComponent } from './list-tipo/list-tipo.component';
import { HomeTipoComponent } from './home-tipo/home-tipo.component';
 import {RouterModule} from "@angular/router";
 import {tipoRoutes} from "./tipo-routing.module";
 import {MatCardModule} from "@angular/material/card";
 import {MatButtonModule} from "@angular/material/button";
 import {MatIconModule} from "@angular/material/icon";
 import {MatTableModule} from '@angular/material/table';
 import {MatInputModule} from "@angular/material/input";
import { FormTipoComponent } from './form-tipo/form-tipo.component';
 import {MatFormFieldModule} from '@angular/material/form-field';
 import {MatSelectModule} from "@angular/material/select";
 import {ReactiveFormsModule} from "@angular/forms";
import { DepositoComponent } from './deposito/deposito.component';
import { DepositarComponent } from './depositar/depositar.component';





 @NgModule({
  declarations: [
    ListTipoComponent,
    HomeTipoComponent,
    FormTipoComponent,
    DepositoComponent,
    DepositarComponent,
    DepositarComponent
  ],
   imports: [
     CommonModule,
     RouterModule.forChild(tipoRoutes),
     MatCardModule,
     MatButtonModule,
     MatIconModule,
     MatButtonModule,
     MatTableModule,
     MatInputModule,
     MatFormFieldModule,
     MatSelectModule,
     ReactiveFormsModule,

   ]
 })
export class TipoModule { }
