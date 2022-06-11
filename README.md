# solid-as

Solid as \_\_\_\_\_!

Solid, AssemblyScriptified and compiled to WebAssembly (very work in progress).

# Installation

TODO

# Test

`npm i && npm test`

# TODO:

- [ ] No tuples or
      [array](https://github.com/AssemblyScript/assemblyscript/pull/1788)
      [destructuring](https://github.com/AssemblyScript/assemblyscript/pull/2008) in
      AS yet. For now `createSignal` returns an object with `.get` and `.set` methods.
- [ ] No closures in AS yet except for around top-level module variables, which is what the example test() uses.

But at least without the above two features, we can begin to implement the
mechanics in a type-safe way that compiles to Wasm. I imagine this will evolve
in parallel, then once ready we merge into one.

- [ ] The rest of the Solid core APIs besides `createEffect` and `createSignal`
