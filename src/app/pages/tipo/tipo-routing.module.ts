import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeTipoComponent} from "./home-tipo/home-tipo.component";
import {ListTipoComponent} from "./list-tipo/list-tipo.component";
import {FormTipoComponent} from "./form-tipo/form-tipo.component";
import {DepositoComponent} from "./deposito/deposito.component";
import {DepositarComponent} from "./depositar/depositar.component";

export const tipoRoutes: Routes = [
  {
    path: "tipo",
    component: HomeTipoComponent,
    children: [
      {
        path: "",
        component: ListTipoComponent
      },
      {
        path: "dep",
        component: DepositarComponent
      },
      {
        path: "deposito",
        component: DepositoComponent
      },
      {
        path: ":id",
        component: FormTipoComponent
      },
      {
        path: "novo",
        component: FormTipoComponent
      }
    ]
  }
];



