import { Component, Input, inject } from '@angular/core';
import { Anime } from '../../interfaces/anime.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-anime',
  standalone: true,
  imports: [],
  templateUrl: './card-anime.component.html',
  styleUrl: './card-anime.component.scss'
})
export class CardAnimeComponent {
  @Input() anime!: Anime;
  @Input() pagina = '';

  router = inject(Router)

  onClick(){
    this.router.navigateByUrl(`anime/${this.anime.id}`)
  }
}
