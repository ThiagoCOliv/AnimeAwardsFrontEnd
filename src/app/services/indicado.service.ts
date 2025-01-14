import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Indicado } from '../interfaces/indicado.interface';
import { Categoria } from '../interfaces/categoria.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicadoService {
  private base_url = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  postIndicado(indicado: Indicado, categoria: Categoria): Observable<any>
  {
    let objPersonagem;

    if(indicado.casal)
    {
      objPersonagem = {
        casal: indicado.casal,
        imagemA: indicado.imagemA,
        imagemB: indicado.imagemB
      }
    }
    else if(indicado.personagem)
    {
      objPersonagem = {
        nome: indicado.personagem,
        imagem: indicado.imagem
      }
    }
    
    let reqBody = {
      anime: indicado.anime,
      categoria: categoria,
      personagem: objPersonagem || null,
      numero: indicado.numero || null
    }

    return this.http.post(this.base_url + "indicado", reqBody, { observe: 'response' })
  }
}
