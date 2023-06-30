import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
//import {DateAdapter} from "@angular/material/core";
import {ContaControlerService} from "../../../api/services/conta-controler.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DateAdapter} from "@angular/material/core";
import {ContaDto} from "../../../api/models/conta-dto";

@Component({
  selector: 'app-form-tipo',
  templateUrl: './form-tipo.component.html',
  styleUrls: ['./form-tipo.component.scss']
})
export class FormTipoComponent {
  formGroup!: FormGroup;
  public readonly ACAO_INCLUIR = "Incluir";
  public readonly ACAO_EDITAR = "Editar";
  acao: string = this.ACAO_INCLUIR;
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
    this.prepararEdicao();
    this._adapter.setLocale('pt-br');

  }
  createForm() {
    this.formGroup = this.formBuilder.group({
     // id: [null,Validators.required],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      sobrenome: [null, Validators.required],
      agencia: [null, Validators.required],
      numeroConta: [null, Validators.required],
      contato: [null, Validators.required],
      saldoConta: [null, Validators.required],
      statusConta: [null, Validators.required],
    });
  }

  //protected readonly onsubmit = onsubmit;
  onSubmit() {
    if (this.formGroup.valid) {
      if (!this.id) {
        this.realizarincluzao();
      } else {
        this.alteracao();
      }
    }

  }
  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  private prepararEdicao() {
    const paramID = this.route.snapshot.paramMap.get('id');
    if(paramID){
      const id = parseInt(paramID);
      console.log("id", paramID);
      this.tipoService.obterPorId({id}).subscribe(
        retorno => {
          this.acao = this.ACAO_EDITAR;
          console.log("retorno", retorno);
          this.id = retorno.id || 0;
          this.formGroup.patchValue(retorno);
        }
      )
    }
  }

  private alteracao() {
    console.log("Dados:", this.formGroup.value);
    this.tipoService.alterar({id: this.id as number, body: this.formGroup.value})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.router.navigate(["/tipo"]);
      }, erro => {
        console.log("Erro:", +erro.error);
        alert("Erro ao incluir");
      })
  }

  private realizarincluzao() {
    console.log("Dados:", this.formGroup.value);
    this.tipoService.incluir({body: this.formGroup.value})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.router.navigate(["/tipo"]);
      }, erro => {
        console.log("Erro:", +erro);
        alert("Erro ao incluir");
      })
  }
}
