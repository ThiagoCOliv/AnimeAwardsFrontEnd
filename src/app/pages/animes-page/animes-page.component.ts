import { Component, OnInit, inject } from '@angular/core';
import { Anime } from '../../interfaces/anime.interface';
import { CardAnimeComponent } from "../../components/card-anime/card-anime.component";
import { AnimeService } from '../../services/anime.service';
import { Router } from '@angular/router';
import { BtnAddComponent } from "../../components/btn-add/btn-add.component";
import { BarraAbasComponent } from "../../components/barra-abas/barra-abas.component";

@Component({
    selector: 'app-animes-page',
    standalone: true,
    templateUrl: './animes-page.component.html',
    styleUrl: './animes-page.component.scss',
    imports: [CardAnimeComponent, BtnAddComponent, BarraAbasComponent]
})
export class AnimesPageComponent implements OnInit{
  animes: Anime[] = [];
  generos: any[] = [];
  generosAtivos: any[] = [];

  router = inject(Router)

  constructor(private service: AnimeService){}

  ngOnInit(): void 
  {
    this.service.getAnimes<Anime>().subscribe(res => {
      this.animes = res;
      
      if(this.animes.length > 0)
      {
        this.generos = this.verificarGeneros(this.animes.map<string[]>(anime => anime.generos));
        this.generosAtivos = this.generos;
      }
    });
  }

  verificarGeneros(listaGenerosPorAnime: any[])
  {
    let novaLista: any[] = [];

    listaGenerosPorAnime.forEach(generos => generos.forEach((genero: string) => {
      let objGenero = {
        id: novaLista.length,
        nome: genero,
        status: "desmarcado"
      }

      if(novaLista.length == 0 || !novaLista.some(item => item.nome == genero)) novaLista.push(objGenero);
    }))
    
    return novaLista
  }

  buscarPorGenero(genero: any)
  {
    if(genero.status)
    {
      if(genero.status == "marcado")
      {
        this.generos.forEach(gen => gen.status = "desmarcado")
        this.generosAtivos = this.generos;
      }
      else
      {
        this.generos.forEach(gen => gen.status = gen.nome == genero.nome ? "marcado" : "desmarcado")
        this.generosAtivos = [genero];
      }
      
      this.service.getAnimes<Anime>(this.generosAtivos.length == 1 ? genero.nome : "").subscribe(res => this.animes = res)
    }
  }

  onAdd(){ this.router.navigateByUrl(`add-anime`) }
}
