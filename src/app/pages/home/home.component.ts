import { Component, OnInit } from '@angular/core';
import { Anime } from '../../interfaces/anime.interface';
import { AnimeService } from '../../services/anime.service';
import { CardAnimeComponent } from "../../components/card-anime/card-anime.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CardAnimeComponent]
})

export class HomeComponent implements OnInit
{
  animes: Anime[] = [];
  mensagemErro: String = '';

  constructor(private service: AnimeService){}

  ngOnInit(): void 
  {
    this.service.getTopTen<Anime>().subscribe(lista => lista.forEach((item: Anime) => this.animes.push(item)));
  }
}
