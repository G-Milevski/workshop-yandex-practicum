//https://stackoverflow.com/questions/71571684/ts-node-with-tsconfig-paths-wont-work-when-using-esm
//https://github.com/TypeStrong/ts-node/discussions/1450#discussion-3563207

// loader.js
import { lstatSync } from 'fs'

import {
    resolve as resolveTs,
    getFormat,
    transformSource,
    load,
  } from "ts-node/esm";
  import * as tsConfigPaths from "tsconfig-paths"
  
  export { getFormat, transformSource, load };
  
  const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig()
  const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths)
  
  export function resolve(specifier, context, defaultResolver) {
    const mappedSpecifier = matchPath(specifier)
    if (mappedSpecifier) {

        try {
          const directory = lstatSync(mappedSpecifier).isDirectory()
          specifier = `${mappedSpecifier}${directory ? '/index.js' : '.js'}`
        } catch {
          specifier = `${mappedSpecifier}.js`
        }
      }

    return resolveTs(specifier, context, defaultResolver);
  }