// First import JS helpers
import 'assemblyscript/std/portable/index.js'
import './portable-helpers-js.js'

// Then import AS code so that it works in the JS target
export * from './index-wasm.js'
