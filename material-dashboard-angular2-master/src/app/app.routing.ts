import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard', // Redirige a la vista de 'dashboard'
    pathMatch: 'full',
  },
  {
    path: '', // Ruta base
    component: AdminLayoutComponent, // Usa el layout principal
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule) // Carga perezosa del módulo
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard' // Redirige a 'dashboard' en caso de rutas no encontradas
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true // Usa hash en las rutas para evitar problemas con el servidor
    })
  ],
  exports: [RouterModule], // Exporta el módulo de rutas para que sea accesible en toda la app
})
export class AppRoutingModule { }

