import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {isDevMode} from "@angular/core";

export const extModules = [
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
];
