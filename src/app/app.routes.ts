import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AnimesPageComponent } from './pages/animes-page/animes-page.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { AnimeComponent } from './pages/anime/anime.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { AnimeFormComponent } from './pages/anime-form/anime-form.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'animes', component: AnimesPageComponent },
    { path: 'categorias', component: CategoriasComponent },
    { path: 'anime/:id', component: AnimeComponent },
    { path: 'categoria/:nome', component: CategoriaComponent },
    { path: 'add-anime', component: AnimeFormComponent },
    { path: 'edit-anime/:id', component: AnimeFormComponent },
    { path: '**', redirectTo: '' }
];
