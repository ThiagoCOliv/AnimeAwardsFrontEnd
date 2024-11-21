import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-card-categoria',
  standalone: true,
  imports: [],
  templateUrl: './card-categoria.component.html',
  styleUrl: './card-categoria.component.scss'
})
export class CardCategoriaComponent {
  @Input() categoria: string = "";

  click = output();

  onClick(){
    this.click.emit();
  }
}
