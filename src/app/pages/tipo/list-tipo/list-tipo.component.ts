import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ContaDto} from "../../../api/models/conta-dto";
import {ContaControlerService} from "../../../api/services/conta-controler.service";

@Component({
  selector: 'app-list-tipo',
  templateUrl: './list-tipo.component.html',
  styleUrls: ['./list-tipo.component.scss']
})
export class ListTipoComponent implements OnInit {
  colunasMostrar = ['id', 'nome', 'sobrenome', 'agencia', 'numeroConta', 'contato', 'saldoConta', 'statusConta', 'acao'];
  tipoListaDataSource: MatTableDataSource<ContaDto> = new MatTableDataSource<ContaDto>([]);

constructor(public tipoService: ContaControlerService) {

  }

  ngOnInit(): void {
    this.buscarDados();
  }

  private buscarDados() {
    this.tipoService.listAll().subscribe(data => {
      this.tipoListaDataSource.data = data;
      console.log(JSON.stringify(data));
    })
  }

  remover(id: number) {
    console.log("Remover", id);
    this.tipoService.remover({id})
      .subscribe( retorno =>{
        alert("Excluido com sucesso!");
        console.log("Exclusao:", retorno);
      }, error => {
        this.buscarDados();
        if(error.status === "404"){
          alert("Conta não existe mais")
        }else{
        alert("Erro ao excluir");
        console.log("Erro:", error);
        }
      }
      )

  }

    protected readonly Element = Element;
}
