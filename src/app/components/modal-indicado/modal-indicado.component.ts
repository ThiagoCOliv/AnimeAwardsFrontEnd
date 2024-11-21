import { Component, Input, output } from '@angular/core';
import { Categoria } from '../../interfaces/categoria.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Anime } from '../../interfaces/anime.interface';
import { AnimeService } from '../../services/anime.service';
import { Indicado } from '../../interfaces/indicado.interface';

@Component({
  selector: 'app-modal-indicado',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-indicado.component.html',
  styleUrl: './modal-indicado.component.scss'
})
export class ModalIndicadoComponent {
  @Input() categoria!: Categoria;
  animeSelecionado!: Anime;
  animesSelecionaveis: Anime[] = [];
  
  constructor(private service:AnimeService){}
  
  ngOnInit(): void
  {
    this.service.getAnimes<Anime>().subscribe(res => {
      if(this.categoria.tipo == "Subjetivas" || this.categoria.nome == "Melhor Antagonista" || this.categoria.nome == "Melhor Protagonista")
      {
        const animesIndicados: Anime[] = this.categoria.indicados.filter(indicado => indicado.anime).map(indicado => indicado.anime);
  
        if(animesIndicados.length < res.length)
        {
          this.animesSelecionaveis = res.filter(anime => !animesIndicados.some(animeIndicado => animeIndicado.id === anime.id));
        }
      }
      else
      {
        this.animesSelecionaveis = res; 
      }

      this.animesSelecionaveis.length == 0 ? this.onSubmit() : this.animeSelecionado = this.animesSelecionaveis[0];
    });
  }

  form = new FormGroup
  ({
    anime: new FormControl<string>('Defina um anime!'),
    numero: new FormControl<number>(1),
    personagemA: new FormControl<string>(''),
    personagemAImg: new FormControl<string>(''),
    personagemB: new FormControl<string>(''),
    personagemBImg: new FormControl<string>('')
  })

  animeEscolhido()
  {
    this.animeSelecionado = this.animesSelecionaveis.find(anime => anime.nome == this.form.controls.anime.value) as Anime
  }

  adicionar = output<Indicado | string>()

  cancelarIndicacao(motivo: string)
  {
    this.adicionar.emit(motivo)
  }

  onSubmit()
  {
    if(this.animesSelecionaveis.length == 0)
    {
      this.cancelarIndicacao('')
    }
    else
    {
      if(this.categoria.tipo == "Subjetivas" && this.form.controls.numero.value as number > 0)
      {
        let novoIndicado: Indicado = {
          anime: this.animeSelecionado,
          numero: this.form.controls.numero.value as number,
          pontos: 0
        }

        this.adicionar.emit(novoIndicado)
      }
      else if(this.categoria.tipo == "Personagens")
      {
        let novoIndicado: Indicado;

        if(this.form.controls.personagemA.value == '' || this.form.controls.personagemAImg.value == '')
        {
          alert('Preencha todos os campos!')
        }
        else if(this.categoria.nome != "Melhor Casal")
        {
          novoIndicado = {
            anime: this.animeSelecionado,
            pontos: 0,
            personagem: this.form.controls.personagemA.value as string,
            imagem: this.form.controls.personagemAImg.value as string
          }

          this.adicionar.emit(novoIndicado)
        }
        else if(this.form.controls.personagemB.value == '' || this.form.controls.personagemBImg.value == '')
        {
          console.log(this.form.value)
          alert('Preencha todos os campos!')
        }
        else
        {
          novoIndicado = {
            anime: this.animeSelecionado,
            pontos: 0,
            casal: this.form.controls.personagemA.value as string + ' - ' + this.form.controls.personagemB.value as string,
            imagemA: this.form.controls.personagemAImg.value as string,
            imagemB: this.form.controls.personagemBImg.value as string
          }

          this.adicionar.emit(novoIndicado)
        }
      }
    }
  }
}
