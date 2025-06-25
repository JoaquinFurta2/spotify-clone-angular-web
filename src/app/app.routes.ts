import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { LibraryComponent } from './shared/components/library/library.component';
import { screenSizeGuard } from './shared/guards/screen-size.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent}, 
    {path: 'playlist/:id', component: PlaylistComponent},
    {path: 'library', component: LibraryComponent, canActivate: [screenSizeGuard]},
    { path: '**', redirectTo: '' }
    ];
