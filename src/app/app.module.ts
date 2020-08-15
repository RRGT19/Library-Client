import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './core/header/header.component';
import {LibraryLayoutComponent} from './core/layouts/library-layout/library-layout.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {BookComponent} from './modules/book/book.component';
import {HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {BookFakeService} from "./shared/services/book-fake.service";
import { BookCardComponent } from './shared/components/book-card/book-card.component';
import { BookListGridComponent } from './shared/components/book-list-grid/book-list-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LibraryLayoutComponent,
    DashboardComponent,
    BookComponent,
    BookCardComponent,
    BookListGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    environment.production ?
      [] : HttpClientInMemoryWebApiModule.forRoot(BookFakeService, {delay: 1500}) // 1.5 second delay
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
