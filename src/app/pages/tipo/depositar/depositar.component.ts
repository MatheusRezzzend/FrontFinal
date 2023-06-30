import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {ContaControlerService} from "../../../api/services/conta-controler.service";

@Component({
  selector: 'app-depositar',
  templateUrl: './depositar.component.html',
  styleUrls: ['./depositar.component.scss']
})
export class DepositarComponent {
  formGroup!: FormGroup;
  public readonly ACAO_DEP = "Depositar";
  acao: string = this.ACAO_DEP;
  id!: number;



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    public tipoService: ContaControlerService
  )
  {
    this.createForm();
    this.prepararDep();
    this._adapter.setLocale('pt-br');

  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      id: [null,Validators.required],
      saldoConta: [null, Validators.required],

    });
  }
  onSubmit() {
    if (this.formGroup.valid) {
      if (!this.id) {
        this.prepararDep();
      } else {
        this.realizardep();
      }
    }
  }
  public handleError = (controlName: string, errorName: string) => {
      return this.formGroup.controls[controlName].hasError(errorName);
    };
  private prepararDep() {
      const paramID = this.route.snapshot.paramMap.get('id');
      if(paramID){
        const id = parseInt(paramID);
        console.log("id", paramID);
        this.tipoService.obterPorId({id}).subscribe(
          retorno => {
            this.acao = this.ACAO_DEP;
            console.log("retorno", retorno);
            this.id = retorno.id;
            this.formGroup.patchValue(retorno);
          }
        )
      }
    }
  private realizardep() {
    console.log("Dados:", this.formGroup.value);
    this.tipoService.alterar({id: this.id as number, body: this.formGroup.value})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.router.navigate(["/tipo"]);
      }, erro => {
        console.log("Erro:", +erro.error);
        alert("Erro ao Depositar");
      })
  }


}
