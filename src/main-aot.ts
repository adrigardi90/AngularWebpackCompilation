﻿// Styles.
import './styles/styles.scss';

import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';

// Entry point for AoT compilation.
declare var System: any;

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
