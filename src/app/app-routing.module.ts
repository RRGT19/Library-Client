import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LibraryLayoutComponent} from "./core/layouts/library-layout/library-layout.component";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {BookComponent} from "./modules/book/book.component";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";

const routes: Routes = [

  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},

  {
    path: '',
    component: LibraryLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'book/:bookId/page/:pageNumber',
        component: BookComponent
      }
    ]
  },

  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
