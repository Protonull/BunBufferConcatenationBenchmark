#!/usr/bin/env bun
import { bench, group, run } from "mitata";

group("buffer-concat", () => {
    {
        const [lhs, rhs] = createBuffer(
            (size) => Buffer.allocUnsafe(size),
            (buffer) => buffer,
        );
        bench("Buffer.concat()", async () => {
            Buffer.concat([lhs, rhs]);
        });
    }

    {
        const [lhs, rhs] = createBuffer(
            (size) => Bun.allocUnsafe(size),
            (buffer) => buffer,
        );
        bench("Uint8Array.set()", async () => {
            const result = new Uint8Array(lhs.byteLength + rhs.byteLength);
            result.set(lhs, 0);
            result.set(rhs, lhs.byteLength);
        });
    }

    { // https://stackoverflow.com/a/60590943
        const [lhs, rhs] = createBuffer(
            (size) => new Uint8Array(size),
            (buffer) => buffer,
        );
        bench("Uint8Array.from()", async () => {
            Uint8Array.from([...lhs, ...rhs]);
        });
    }

    { // https://stackoverflow.com/a/75350604
        const [lhs, rhs] = createBuffer(
            (size) => new Uint8Array(size),
            (buffer) => buffer,
        );
        bench("new Blob().arrayBuffer()", async () => {
            await new Blob([lhs, rhs]).arrayBuffer();
        });
    }
});

/**
 * Creates two new buffers to test with.
 *
 * @param constructor Constructs a new buffer with a passed-in length.
 * @param asUint8Array Converts the constructed buffer into a Uint8Array just in case.
 */
function createBuffer<T>(
    constructor: (size: number) => T,
    asUint8Array: (buffer: T) => Uint8Array,
): [T, T] {
    const lhs = constructor(1024 * 1024 * 7);
    crypto.getRandomValues(asUint8Array(lhs));
    const rhs = constructor(1024 * 1024 * 6);
    crypto.getRandomValues(asUint8Array(rhs));
    return [lhs, rhs];
}

await run({
    silent: false,
    avg: true,
    json: false,
    colors: true,
    min_max: true,
    percentiles: false,
});
