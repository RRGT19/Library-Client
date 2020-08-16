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
import {BookCardComponent} from './shared/components/book-card/book-card.component';
import {BookListGridComponent} from './shared/components/book-list-grid/book-list-grid.component';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ColSizeButtonsComponent} from './shared/components/book-list-grid/components/col-size-buttons/col-size-buttons.component';
import {LoadingStateComponent} from './shared/components/loading-state/loading-state.component';
import {SafeHtmlPipe} from './shared/pipes/safe-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LibraryLayoutComponent,
    DashboardComponent,
    BookComponent,
    BookCardComponent,
    BookListGridComponent,
    ColSizeButtonsComponent,
    LoadingStateComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    environment.production ?
      [] : HttpClientInMemoryWebApiModule.forRoot(BookFakeService, {delay: 1000}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
