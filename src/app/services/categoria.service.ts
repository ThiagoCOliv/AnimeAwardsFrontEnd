import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria.interface';
import { Indicado } from '../interfaces/indicado.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  base_url = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getCategorias<Categoria>(tipo: string = ""){
    let categorias: Categoria[] = [];

    this.http.get<Categoria[]>(this.base_url + `categorias/${tipo}`).subscribe(lista => {
      lista.forEach(item => categorias.push(item))
    });

    return categorias;
  }

  getCategory(categoriaNome: string): Observable<Categoria>{
    return this.http.get<Categoria>(this.base_url + `categoria/${categoriaNome}`)
  }

  putCategory(categoriaDesatualizada: Categoria, indicadosAtuais: Indicado[]): Observable<any>{
    let categoriaAtualizada = categoriaDesatualizada;
    categoriaAtualizada.indicados = indicadosAtuais;

    return this.http.put(this.base_url + 'categoria', categoriaAtualizada, { observe: 'response' });
  }
}
