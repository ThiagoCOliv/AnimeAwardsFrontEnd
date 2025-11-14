import { Component, Input, OnDestroy } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { IndicadoService } from '../../services/indicado.service';
import { Categoria } from '../../interfaces/categoria.interface';
import { Indicado } from '../../interfaces/indicado.interface';
import { ModalIndicadoComponent } from "../../components/modal-indicado/modal-indicado.component";
import { BtnAddComponent } from "../../components/btn-add/btn-add.component";

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [ModalIndicadoComponent, BtnAddComponent],
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
  dragSrcIndex: number | null = null;
  dragOverIndex: number | null = null;

  @Input()
  set nome(categoriaNome: string) {
    this.nomeCategoria = categoriaNome;
  }

  constructor(private catService: CategoriaService, private indService: IndicadoService){}

  ngOnInit(): void {
    this.catService.getCategory(this.nomeCategoria).subscribe(res => {
      this.categoria = res;
      this.indicados = [...res.indicados];
      this.podeAddManualmente = this.podeAddIndicado(this.categoria);
    });
  }

  onDragStart(event: DragEvent, index: number){
    this.dragSrcIndex = index;
    try{ event.dataTransfer?.setData('text/plain', String(index)); } catch(e){}
    if(event.dataTransfer){ event.dataTransfer.effectAllowed = 'move'; }
  }

  onDragOver(event: DragEvent, index: number){
    event.preventDefault();
    this.dragOverIndex = index;
    if(event.dataTransfer){ event.dataTransfer.dropEffect = 'move'; }
  }

  onDrop(event: DragEvent, dropIndex: number){
    event.preventDefault();
    const src = this.dragSrcIndex ?? parseInt(event.dataTransfer?.getData('text/plain') || '-1');
    if(src < 0) { this.resetDrag(); return; }
    if(src === dropIndex){ this.resetDrag(); return; }

    this.moveItem(src, dropIndex);
    this.alteracao = this.compararIndicados(this.indicados);
    this.resetDrag();
  }

  onDragEnd(){
    this.resetDrag();
  }

  moveItem(fromIndex: number, toIndex: number){
    const arr = [...this.indicados];
    const [moved] = arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, moved);
    this.indicados = arr;
  }

  resetDrag(){
    this.dragSrcIndex = null;
    this.dragOverIndex = null;
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
    this.catService.putCategory(this.categoria, this.indicados).subscribe(res => this.exibirRespostaReq(res))
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
    try{ document.body.style.overflow = 'hidden'; } catch(e){}
  }

  addIndicado(indicado: Indicado | string)
  {
    if(indicado == '')
    {
      alert('Não é possível adicionar novos indicados!');
    }
    else if(indicado != 'cancel' && indicado)
    {
      this.indService.postIndicado(indicado as Indicado, this.categoria).subscribe(res => {
        res.status == 201 ? this.indicados = res.body.categoria.indicados : ""
        this.exibirRespostaReq(res)
      })
    }

    this.modalAberto = false;
    try{ document.body.style.overflow = ''; } catch(e){}
  }

  ngOnDestroy(): void {
    try{ document.body.style.overflow = ''; } catch(e){}
  }

  podeAddIndicado(categoria: Categoria): boolean
  {
    if(categoria.tipo == "Personagens"){ return true; }
    if(categoria.tipo == "Subjetivas" && (categoria.nome == "Melhor Encerramento" || categoria.nome == "Melhor Abertura")){ return true; }
    return false;
  }

  exibirRespostaReq(res: any)
  {
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
  }
}