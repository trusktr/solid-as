// The entry file of your WebAssembly module.

import {createSignal, createEffect} from './signal'
import {queueMicrotask} from './queueMicrotask'
import './log.js'

export * from './signal'

const bugs = ['butterfly', 'spider', 'beatle', 'ladybug', 'ant', 'moth', 'caterpillar', 'aphid', 'fly']
const result: string[] = []
let loop: () => void
let count = 0

const bug = createSignal(bugs[0])

export function test(): void {
	loop = () => {
		const index = Math.round(Math.random() * (bugs.length - 1)) as i32
		bug.set(bugs[index])
	}

	createEffect(() => {
		count++
		result.push(bug.get())
		log(bug.get())

		if (count < 4) {
			setTimeout(loop, 16)
		} else {
			queueMicrotask(() => {
				assert(result.length === 4, 'expected length 4')

				for (let i = 0, l = result.length; i < l; i++) {
					assert(bugs.includes(result[i]), 'expected a bug')
				}

				log('test finished')
			})
		}
	})
}
