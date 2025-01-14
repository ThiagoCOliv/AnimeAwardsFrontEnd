import { Component, Input, OnInit, inject } from '@angular/core';
import { Anime } from '../../interfaces/anime.interface';
import { AnimeService } from '../../services/anime.service';
import { Router } from '@angular/router';
import { Categoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-anime',
  standalone: true,
  imports: [],
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.scss'
})
export class AnimeComponent implements OnInit{
  animeId!: number;
  anime!: Anime;
  vitorias: Categoria[] = []

  router = inject(Router)

  @Input()
  set id(animeId: number) {
    this.animeId = animeId;
  }

  constructor(private service: AnimeService){}

  ngOnInit(): void {
    this.service.getAnime(this.animeId).subscribe(res => {
      this.anime = res.anime;
      this.vitorias = res.vitorias;
    });
  }

  onEdit(){
    this.router.navigateByUrl(`edit-anime/${this.animeId}`)
  }

  verCategoria(nomeCategoria: string)
  {
    sessionStorage.setItem("pagina", "2")
    this.router.navigateByUrl(`categoria/${nomeCategoria}`)
  }
}
