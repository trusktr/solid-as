// The entry file of your WebAssembly module.

import {createSignal, createEffect} from './signal'
import {setInterval} from '../node_modules/ecmassembly/assembly/index'
import {log} from './log'

export function add(a: i32, b: i32): i32 {
	return a + b
}

const bugs = [
	'butterfly',
	'spider',
	'beatle',
	'ladybug',
	'ant',
	'moth',
	'caterpillar',
	'aphid',
	'fly',
]

const username = createSignal(bugs[0])
// const count = createSignal(0)

export function test(): void {
	createEffect(() => {
		log(username.get())

		// if (changesTo(username, 'mary')) {
		// 	count(count() + 1)
		// 	log(count())
		// }
	})

	setInterval(() => {
		const index = Math.round(Math.random() * (bugs.length - 1)) as i32
		username.set(bugs[index])
	}, 1000)
}
