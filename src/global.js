
/*
 * eventJS JavaScript Pub-Sub Library v@VERSION
 *
 * Copyright Pramod Jain
 * Released under the MIT license
 *
 */
"use strict";

import { EventEmitter } from "./core/EventEmitter.js";

    
globalThis.EventJs = new EventEmitter({strictMode:true});
