import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { StatsDisplayComponent } from './stats-display/stats-display.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ToArrayPipe } from './to-array.pipe';
import { HeaderboardComponent } from './headerboard/headerboard.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { DataGraphComponent } from './data-graph/data-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    StatsDisplayComponent,
    DropdownComponent,
    ToArrayPipe,
    HeaderboardComponent,
    LoadingIndicatorComponent,
    DataGraphComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
