import { Component, Input } from '@angular/core';
import { Anime } from '../../interfaces/anime.interface';
import { AnimeService } from '../../services/anime.service';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component
({
  selector: 'app-anime-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './anime-form.component.html',
  styleUrl: './anime-form.component.scss'
})

export class AnimeFormComponent
{
  estudios: string[] = [];
  generos: string[] = [];
  lancamento: string[] = [];
  funcaoPagina: string = "Adicionar";

  animeAtualizado: Anime = {
    id:0,
    nome: '',
    imagemURL: '',
    temporadaAnime: 1,
    temporadaLancamento: [],
    estudio: [],
    generos: [],
    fonte: '',
    pontos:0
  };

  mensagem: string = "";
  statusRequisicao: string = ""

  constructor(private readonly service: AnimeService, private readonly router: Router){}

  form = new FormGroup
  ({
    nome: new FormControl<string>('', Validators.required),
    imagem: new FormControl<string>('', Validators.required),
    lancamento: new FormControl<string[]>([], Validators.minLength(1)),
    temporada: new FormControl<number>(1, Validators.required),
    estudios: new FormControl<string[]>([], Validators.minLength(1)),
    generos: new FormControl<string[]>([], Validators.minLength(1)),
    fonte: new FormControl<string>('', Validators.required)
  })

  formList = new FormGroup(
  {
    estudio: new FormControl<string>(''),
    genero: new FormControl<string>(''),
    lancamento: new FormControl<string>('')
  })

  @Input()
  set id(animeId: number) 
  {
    if(animeId)
    {
      this.service.getAnime(animeId).subscribe(res => 
      {
        this.animeAtualizado = res
        this.estudios = res.estudio;
        this.form.controls.estudios.setValue(res.estudio)
        this.generos = res.generos;
        this.form.controls.generos.setValue(res.generos)
        this.form.controls.nome.setValue(res.nome)
        this.form.controls.imagem.setValue(res.imagemURL)
        this.form.controls.lancamento.setValue(res.temporadaLancamento)
        this.form.controls.temporada.setValue(res.temporadaAnime)
        this.form.controls.fonte.setValue(res.fonte)
        this.funcaoPagina = "Editar"
      });
    }
  }

  deleteEstudio(estudio: string)
  {
    this.form.controls.estudios.setValue(this.estudios.filter(item => item != estudio))
    this.estudios = this.form.controls.estudios.value || []
  }

  deleteGenero(genero: string)
  {
    this.form.controls.generos.setValue(this.generos.filter(item => item != genero))
    this.generos = this.form.controls.generos.value || []
  }

  deleteTemporada(temporada: string)
  {
    this.form.controls.lancamento.setValue(this.lancamento.filter(item => item != temporada))
    this.lancamento = this.form.controls.lancamento.value || []
  }

  addEstudio()
  {
    let value = this.formList.controls.estudio.value;

    if(value)
    {
      this.estudios.push(this.capitalize(value));
      this.form.controls.estudios.setValue(this.estudios);
      this.formList.controls.estudio.setValue('')
    }
  }
  
  addGenero()
  {
    let value = this.formList.controls.genero.value;

    if(value)
    {
      this.generos.push(this.capitalize(value));
      this.form.controls.generos.setValue(this.generos)
      this.formList.controls.genero.setValue('')
    }
    
  }

  addTemporada()
  {
    let value = this.formList.controls.lancamento.value;

    if(value)
    {
      this.lancamento.push(this.capitalize(value));
      this.form.controls.lancamento.setValue(this.lancamento);
      this.formList.controls.lancamento.setValue('')
    }
    
  }

  onSubmit()
  {
    let estudios = this.form.controls.estudios.value || [];
    let generos = this.form.controls.generos.value || [];

    if(this.form.valid && estudios?.length > 0 && generos?.length > 0 && this.lancamento.length > 0)
    {
      let animeAtual: Anime = this.animeAtualizado
      animeAtual.estudio = this.form.value.estudios as string[];
      animeAtual.fonte = this.form.value.fonte as string;
      animeAtual.generos = this.form.value.generos as string[];
      animeAtual.imagemURL = this.form.value.imagem as string;
      animeAtual.nome = this.form.value.nome as string;
      animeAtual.temporadaAnime = this.form.value.temporada as number;
      animeAtual.temporadaLancamento = this.form.value.lancamento as string[];

      this.funcaoPagina == "Adicionar" ? 
        this.service.postAnime(animeAtual).subscribe(res => res.status == 201 ? this.router.navigate(['animes']) : this.exibirStatusRequisicao(res)) : 
        this.service.putAnime(animeAtual).subscribe(res => this.exibirStatusRequisicao(res))
    }
  }
  
  exibirStatusRequisicao(resposta: any)
  {
    this.mensagem = resposta.body.mensagem;

    this.statusRequisicao = resposta.status == 201 ? "sucesso" : "erro"

    setTimeout(() => {
      this.statusRequisicao = ""
      this.mensagem = "";
    }, 3000)
  }

  capitalize(texto: String)
  {
    return texto.split(' ').map(palavra => {
      const minusculo = palavra.toLowerCase();
      return minusculo.length > 2 ? minusculo.charAt(0).toUpperCase() + minusculo.slice(1) : minusculo;
    }).join(' ');
  }
}