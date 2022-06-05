import {Promise} from '../node_modules/ecmassembly/assembly/index'

type Reaction = () => void

const dependenciesOfReactions = new Map<Reaction, Set<usize>>() // TODO WeakMap
const dependentsOfSignals = new Map<usize, Set<Reaction>>() // TODO WeakMap

let currentReaction: Reaction | null = null
let scheduledReactions = new Set<Reaction>()

// There is no destructuring (yet), so we use a class with getter and setter for now.
export class Signal<T> {
	constructor(private value: T) {}

	get(/*TODO previous: T*/): T {
		if (currentReaction) trackDependency(changetype<usize>(this), currentReaction!)
		return this.value
	}

	set(newValue: T): T {
		if (dependentsOfSignals.has(changetype<usize>(this)))
			scheduleReactions(dependentsOfSignals.get(changetype<usize>(this)))
		return (this.value = newValue)
	}
}

export function createSignal<T>(initialValue: T): Signal<T> {
	return new Signal(initialValue)
}

export function createEffect<T extends Reaction>(effect: T): void {
	runReaction(effect) // Run the reaction immediately initially.
}

function trackDependency(signal: usize, reaction: Reaction): void {
	if (!dependenciesOfReactions.has(reaction)) dependenciesOfReactions.set(reaction, new Set())
	dependenciesOfReactions.get(reaction).add(signal)

	if (!dependentsOfSignals.has(signal)) dependentsOfSignals.set(signal, new Set())
	dependentsOfSignals.get(signal).add(reaction)
}

let areScheduled = false

function scheduleReactions(reactions: Set<Reaction>): void {
	const _reactions = reactions.values()
	for (let i = 0, l = _reactions.length; i < l; i += 1) scheduleReaction(_reactions[i])
}

// Super simple microtask scheduling, does not have dynamic re-ordering while executing yet
function scheduleReaction(reaction: Reaction): void {
	scheduledReactions.add(reaction)

	if (areScheduled) return
	areScheduled = true

	// TODO replace with queueMicrotask
	// Promise.resolve(0)
	new Promise<i32, Error>(actions => actions.resolve(0)).then(() => {
		areScheduled = false
		runReactions()
	})
}

function runReactions(): void {
	const reactions = scheduledReactions.values()
	scheduledReactions.clear()
	for (let i = 0, l = reactions.length; i < l; i += 1) runReaction(reactions[i])
}

function runReaction(reaction: Reaction): void {
	// Clear dependencies before running the reaction to recalculate them so
	// that signals in unused branches don't trigger re-runs.
	if (dependenciesOfReactions.has(reaction)) {
		const dependencies = dependenciesOfReactions.get(reaction)
		const _deps = dependencies.values()
		dependencies.clear()

		for (let i = 0, l = _deps.length; i < l; i += 1) {
			const signal = _deps[i]
			const dependents = dependentsOfSignals.get(signal)
			dependents.delete(reaction)
		}
	}

	currentReaction = reaction
	reaction()
	currentReaction = null
}
