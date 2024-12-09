import { Component, Input, output } from '@angular/core';
import { Categoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-card-categoria',
  standalone: true,
  imports: [],
  templateUrl: './card-categoria.component.html',
  styleUrl: './card-categoria.component.scss'
})
export class CardCategoriaComponent{
  @Input() categoria?: Categoria;

  click = output();

  onClick(){
    this.click.emit();
  }
}
