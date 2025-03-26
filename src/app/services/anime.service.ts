import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anime } from '../interfaces/anime.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private base_url = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  getTopTen<Anime>(): Observable<any>
  {
    return this.http.get<Anime[]>(this.base_url + 'animes/top');
  }

  getAnimes<Anime>(genero: string = ""): Observable<Anime[]>{
    return this.http.get<Anime[]>(this.base_url + `animes${genero != "" ? "?genero=" + genero : ""}`)
  }

  getAnime(id: number): Observable<any>{
    return this.http.get<Anime>(this.base_url + `animes/${id}`)
  }

  putAnime(anime: Anime): Observable<any>{
    return this.http.put(this.base_url + 'anime', anime, { observe: 'response' })
  }

  postAnime(anime: Anime): Observable<any>{
    return this.http.post(this.base_url + 'anime', anime, { observe: 'response' })
  }
}
