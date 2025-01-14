import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{
  paginas = [
    {
      titulo: "Home",
      status: ""
    },
    {
      titulo: "Animes",
      status: ""
    },
    {
      titulo: "Categorias",
      status: ""
    }
  ];

  ngOnInit(): void {
    let paginaAtual = sessionStorage.getItem("pagina");
    
    if(paginaAtual)
    {
      let numeroPagina = parseInt(paginaAtual);
      this.paginas.forEach((pag, indice) => pag.status = indice == numeroPagina ? "ativa" : "inativa");
    }
    else
    {
      this.paginas[0].status = "ativa";
      this.paginas[1].status = "inativa";
      this.paginas[2].status = "inativa";
    }
  }

  alterarPagina(pagina: number)
  {
    if(pagina < this.paginas.length)
    {
      this.paginas.forEach((pag, indice) => pag.status = indice == pagina ? "ativa" : "inativa");
      sessionStorage.setItem("pagina", pagina.toString())
    }
  }
  title = 'anime-awards';
}