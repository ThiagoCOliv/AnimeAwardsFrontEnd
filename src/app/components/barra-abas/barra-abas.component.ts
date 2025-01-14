import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-barra-abas',
  standalone: true,
  imports: [],
  templateUrl: './barra-abas.component.html',
  styleUrl: './barra-abas.component.scss'
})
export class BarraAbasComponent {
  @Input() lista?: any[];
  status: string = "fechado";

  click = output();
  
  buscar(item:any)
  {
    this.status = "fechado";
    this.click.emit(item)
  }

  toggleMenu()
  {
    this.status = this.status == "aberto" ? "fechado" : "aberto";
  }
}
