import { Component, Input } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interfaces/categoria.interface';
import { Indicado } from '../../interfaces/indicado.interface';
import { ModalIndicadoComponent } from "../../components/modal-indicado/modal-indicado.component";

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [ModalIndicadoComponent],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})

export class CategoriaComponent {
  nomeCategoria: string = '';
  categoria!: Categoria;
  indicados: Indicado[] = [];
  mensagem: string = "";
  statusRequisicao: string = "";
  podeAddManualmente: boolean = false;
  modalAberto: boolean = false;

  alteracao = false;

  @Input()
  set nome(categoriaNome: string) {
    this.nomeCategoria = categoriaNome;
  }

  constructor(private service: CategoriaService){}

  ngOnInit(): void {
    this.service.getCategory(this.nomeCategoria).subscribe(res => {
      this.categoria = res;
      this.indicados = [...res.indicados];
      this.podeAddManualmente = this.podeAddIndicado(this.categoria);
    });
  }

  onSubir(index: number){
    const indicadosAtualizados = this.atualizarIndicados(index, index - 1)
    this.alteracao = this.compararIndicados(indicadosAtualizados);
  }

  onDescer(index: number){
    const indicadosAtualizados = this.atualizarIndicados(index + 1, index)
    this.alteracao = this.compararIndicados(indicadosAtualizados);
  }

  onEditar(){
    this.service.putCategory(this.categoria, this.indicados).subscribe(res => {
      this.mensagem = res.body.mensagem;

      if(res.status == 201)
      {
        this.statusRequisicao = "sucesso"
        this.categoria.indicados = [...this.indicados];
        setTimeout(() => {
          this.alteracao = false;
          this.mensagem = "";
          this.statusRequisicao = ""
        }, 3000)
      }
      else{
        this.statusRequisicao = "erro"
        setTimeout(() => {
          this.mensagem = ""
          this.statusRequisicao = ""
        }, 3000)
      }
    })
  }

  atualizarIndicados(ascendidoIndex: number, rebaixadoIndex: number):Indicado[]
  {
    let indicadosAtuais: Indicado[] = this.indicados;

    const rebaixado = this.indicados[rebaixadoIndex]
    const ascendido = this.indicados[ascendidoIndex]

    if(rebaixadoIndex < 10){
      rebaixado.pontos--;
      ascendido.pontos++;
    }

    indicadosAtuais[rebaixadoIndex] = ascendido;
    indicadosAtuais[ascendidoIndex] = rebaixado;

    return indicadosAtuais;
  }

  compararIndicados(indicadosAtuais: Indicado[]):boolean
  {
    for(let indice = 0; indice < indicadosAtuais.length; indice++)
    {
      if(indicadosAtuais[indice] != this.categoria.indicados[indice])
      {
        return true 
      }
    }
    
    return false
  }

  abrirModalAddIndicado()
  {
    this.modalAberto = true;
  }

  addIndicado(indicado: Indicado | string)
  {
    this.modalAberto = false;
    
    if(indicado == '')
    {
      alert('Não é possível adicionar novos indicados!');
    }
    else if(indicado != 'cancel' && indicado)
    {
      this.indicados.push(indicado as Indicado);
      this.onEditar();
    }
  }

  podeAddIndicado(categoria: Categoria): boolean
  {
    if(categoria.tipo == "Personagens"){ return true; }
    if(categoria.tipo == "Subjetivas" && (categoria.nome == "Melhor Encerramento" || categoria.nome == "Melhor Abertura")){ return true; }
    return false;
  }
}