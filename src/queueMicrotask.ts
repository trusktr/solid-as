// TODO replace with global queueMicrotask binding from ecmassembly

export function queueMicrotask(fn: (_i: i32) => void): void {
	new Promise<i32>(actionsOrResolve => {
		if (ASC_TARGET == 0) actionsOrResolve(0)
		// @ts-expect-error Wasm only
		else actionsOrResolve.resolve(0)
	}).then(fn)
}
