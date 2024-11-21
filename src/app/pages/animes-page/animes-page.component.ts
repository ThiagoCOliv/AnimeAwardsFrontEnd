import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { Anime } from '../../interfaces/anime.interface';
import { CardAnimeComponent } from "../../components/card-anime/card-anime.component";
import { AnimeService } from '../../services/anime.service';
import { SelectComponent } from "../../components/select/select.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-animes-page',
    standalone: true,
    templateUrl: './animes-page.component.html',
    styleUrl: './animes-page.component.scss',
    imports: [CardAnimeComponent, SelectComponent]
})
export class AnimesPageComponent implements OnInit{
  animes: Anime[] = [];
  generos: any[] = [];

  router = inject(Router)

  constructor(private service: AnimeService){}

  ngOnInit(): void 
  {
    this.service.getAnimes<Anime>().subscribe(res => this.animes = res);
    this.generos = this.verificarGeneros(this.animes.map<string[]>(anime => anime.generos))
  }

  verificarGeneros(lista: any[]){
    let novaLista: string[] = [];

    lista.forEach(item => {
      if(item.includes(' - '))
      {
        const generos = item.split(' - ');
        generos.forEach((genero: string) => novaLista.push(genero))
      }
      else
      {
        novaLista.push(item)
      }
    })
    
    return [...new Set(novaLista)]
  }

  buscarPorGenero(genero: string){
    this.service.getAnimes<Anime>(genero).subscribe(res => this.animes = res);
  }

  onAdd(){
    this.router.navigateByUrl(`add-anime`)
  }
}
