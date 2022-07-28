import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
// import { InMemoryDataService } from './in-memory-data.service'

import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { InboxComponent } from './inbox/inbox.component'
import { NavigationComponent } from './navigation/navigation.component'
import { TaskDetailComponent } from './task-detail/task-detail.component'
import { NewTaskComponent } from './new-task/new-task.component'

@NgModule({
  declarations: [
    AppComponent,
    InboxComponent,
    NavigationComponent,
    TaskDetailComponent,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDatepickerModule,
    FormsModule,
    HttpClientModule
    /*
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    })
    */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
