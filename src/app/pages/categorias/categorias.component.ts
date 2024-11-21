import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { SelectComponent } from "../../components/select/select.component";
import { Categoria } from '../../interfaces/categoria.interface';
import { CardCategoriaComponent } from "../../components/card-categoria/card-categoria.component";
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-categorias',
    standalone: true,
    templateUrl: './categorias.component.html',
    styleUrl: './categorias.component.scss',
    imports: [SelectComponent, CardCategoriaComponent]
})
export class CategoriasComponent implements OnInit{
  categorias: Categoria[] = [];
  tipos: WritableSignal<string[]> = signal([]);

  constructor(private service: CategoriaService){}

  router = inject(Router)

  ngOnInit(): void {
    this.categorias = this.service.getCategorias<Categoria>();
    this.tipos.set(this.verificarTipos().map<string>(tipo => tipo));
  }

  verificarTipos(){
    let novaLista: string[] = [];
    
    this.categorias.forEach(categoria => novaLista.push(categoria.tipo))
    
    return [...new Set(novaLista)]
  }

  buscarPorTipo(tipo: string) {
    this.categorias = this.service.getCategorias<Categoria>(tipo)
  }

  showCategoria(categoriaNome: string){
    this.router.navigateByUrl(`categoria/${categoriaNome}`)
  }
}
