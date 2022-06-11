//////////////////////////////// TODO using Auto-generated bindings

// import assert from 'assert'
// import {add} from '../dist/debug.js'
// assert.strictEqual(add(1, 2), 3)
// console.log('ok')

//////////////////////////////// For now, manually load the module

import fs from 'fs'
import path from 'path'
import ASLoader from '@assemblyscript/loader'
import {ECMAssembly} from 'ecmassembly/index.js'

// requestAnimationFrame polyfill needed when running in Node.js
import raf from 'raf'
raf.polyfill()

const es = new ECMAssembly()

const imports = {
	...es.wasmImports,
	console: {
		log: s => console.log(wasmModule.exports.__getString(s)),
	},
	env: {
		abort(message, fileName, line, column) {
			console.error('--------- Error message from AssemblyScript ---------')
			console.error('  ' + wasmModule.exports.__getString(message))
			console.error('    In file "' + wasmModule.exports.__getString(fileName) + '"')
			console.error(`    on line ${line}, column ${column}.`)
			console.error('-----------------------------------------------------')
		},
	},
}

function dirname(url) {
	const parts = url.split(path.sep)
	parts.pop()
	return parts.join(path.sep).replace('file://', '')
}

const wasmModule = ASLoader.instantiateSync(
	fs.readFileSync(path.resolve(dirname(import.meta.url), '../dist/wasm/debug.wasm')),
	imports,
)

// Before doing anything, give the exports to ECMAssembly
es.wasmExports = wasmModule.exports

console.log(' ----- TEST WASM BUILD ----- ')
wasmModule.exports.test()
