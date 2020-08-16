import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LibraryLayoutComponent} from "./core/layouts/library-layout/library-layout.component";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {BookComponent} from "./modules/book/book.component";
import {BookPageComponent} from "./modules/book-page/book-page.component";

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
        path: 'book/:bookId',
        component: BookComponent,
        children: [
          {
            path: 'page/:pageNumber',
            component: BookPageComponent
          }
        ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
