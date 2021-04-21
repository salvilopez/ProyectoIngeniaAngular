
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import{MatTableModule}from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { TagsPageComponent } from './pages/tags-page/tags-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ExpertsListComponent } from './views/experts-list/experts-list.component';
import { TagsListComponent } from './views/tags-list/tags-list.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { NavComponent } from './components/nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ExpertPageComponent } from './pages/expert-page/expert-page.component';
import { ExpertDataTableComponent } from './components/expert-data-table/expert-data-table.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TagDataTableComponent } from './components/tag-data-table/tag-data-table.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ExpertDetailsPageComponent } from './pages/expert-details-page/expert-details-page.component';
import { TagDetailsPageComponent } from './pages/tag-details-page/tag-details-page.component';
import { GeneralDataComponent } from './components/general-data/general-data.component';
import { ObservationsComponent } from './components/observations/observations.component';
import { NewExpertPageComponent } from './pages/new-expert-page/new-expert-page.component';
import { NewExpertFormComponent } from './components/new-expert-form/new-expert-form.component';
import { DialogAddTagComponent } from './components/dialog-add-tag/dialog-add-tag.component';
///////////////////////////////////////////////////////////////////////
import {MatDialogModule} from '@angular/material/dialog'


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NotFoundPageComponent,
    ExpertPageComponent,
    TagsPageComponent,
    LoginComponent,
    RegistroComponent,
    ExpertsListComponent,
    TagsListComponent,
    ExpertDataTableComponent,
    NavComponent,
    TagDataTableComponent,
    ExpertDetailsPageComponent,
    TagDetailsPageComponent,
    GeneralDataComponent,
    ObservationsComponent,
    NewExpertPageComponent,
    NewExpertFormComponent,
    DialogAddTagComponent,

  ],
  entryComponents:[DialogAddTagComponent],
  imports: [
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatMenuModule,
    MatSortModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatChipsModule,
    MatTabsModule,
    MatNativeDateModule,

    MatButtonModule,

    MatCardModule,

    MatChipsModule,

    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,

    MatSelectModule,
    MatSidenavModule,

    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
