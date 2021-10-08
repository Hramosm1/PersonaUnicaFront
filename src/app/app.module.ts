import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule, ApplicationConfigurationService } from '@core';
import { SharedModule } from '@shared';
import { ShellModule } from './shell/shell.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';

import { getBsDatepickerConfiguration, getBsModulesForRoot } from './bootstrap/bootstrap.module';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

/**
 * Perfect Scrollbar Default Configuration
 **/

/**
 * Initializing Application
 * Here we load the configuration for the layout and some other stuffs that should be triggered once when the application is loading
 **/
const initializeApp = (_config: ApplicationConfigurationService) => {
  return () => _config.initialize();
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),

    CoreModule,
    ShellModule,
    SharedModule,
    AuthModule,

    // Ngx Bootstrap
    ...getBsModulesForRoot(),

    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [
    // App Initializer
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ApplicationConfigurationService],
      multi: true,
    },

    // Ngx-Bootstrap Datepicker Default Configuration
    {
      provide: BsDatepickerConfig,
      useFactory: getBsDatepickerConfiguration,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
