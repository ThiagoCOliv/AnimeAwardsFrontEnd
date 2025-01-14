import { Component, OnInit, inject } from '@angular/core';
import { Categoria } from '../../interfaces/categoria.interface';
import { CardCategoriaComponent } from "../../components/card-categoria/card-categoria.component";
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';
import { BarraAbasComponent } from "../../components/barra-abas/barra-abas.component";

@Component({
    selector: 'app-categorias',
    standalone: true,
    templateUrl: './categorias.component.html',
    styleUrl: './categorias.component.scss',
    imports: [CardCategoriaComponent, BarraAbasComponent]
})
export class CategoriasComponent implements OnInit{
  categorias: Categoria[] = [];
  tipos: any[] = [];

  constructor(private service: CategoriaService){}

  router = inject(Router)

  ngOnInit(): void {
    this.service.getCategorias<Categoria>().subscribe(res => {
      this.categorias = res;
      this.tipos = this.verificarTipos().map<string>(tipo => tipo);
      this.categorias = this.tipos[0].categorias;
    });
  }

  verificarTipos(){
    let novaLista: any[] = [];

    this.categorias.forEach(categoria => {
      let objTipo = {
        id: novaLista.length,
        nome: categoria.tipo,
        status: novaLista.length == 0 ? "marcado" : "desmarcado",
        categorias: []
      }

      if(novaLista.length == 0 || !novaLista.some(item => item.nome == categoria.tipo))
      {
        novaLista.push(objTipo)
      }

      novaLista[novaLista.length - 1].categorias.push(categoria);
    })
    
    return novaLista
  }

  buscarPorTipo(tipo: any) 
  {
    if(tipo.status == "desmarcado")
    {
      this.tipos.forEach(tip => tip.status = tip.id == tipo.id ? "marcado" : "desmarcado");
      this.categorias = tipo.categorias;
    }
  }

  showCategoria(categoriaNome: string){
    this.router.navigateByUrl(`categoria/${categoriaNome}`)
  }
}
