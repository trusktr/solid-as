import assert from "assert";
import { add } from "../dist/debug.js";
assert.strictEqual(add(1, 2), 3);
console.log("ok");
