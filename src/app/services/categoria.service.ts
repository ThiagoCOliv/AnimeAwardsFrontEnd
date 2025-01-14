import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria.interface';
import { Indicado } from '../interfaces/indicado.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  base_url = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  getCategorias<Categoria>(tipo: string = ""):Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.base_url + `categorias/${tipo}`);
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
