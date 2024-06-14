# BunBufferConcatenationBenchmark

Created this benchmark as I wanted to test a hunch. I was operating under the delusion that anything NodeJS is therefor
slow, that manual concatenation would be faster because that's how you do it in low[er]-level languages. Needless to say
I was completely wrong.

## How to run

Clone this repo and execute `bun benchmark.ts`

## Results

```
cpu: AMD Ryzen 7 3700X 8-Core Processor
runtime: bun 1.1.13 (x64-linux)

benchmark                     time (avg)             (min … max)
----------------------------------------------------------------
• buffer-concat
----------------------------------------------------------------
Buffer.concat()            1'771 µs/iter   (1'519 µs … 2'664 µs)
Uint8Array.set()           2'563 µs/iter   (2'142 µs … 4'234 µs)
Uint8Array.from()            697 ms/iter       (680 ms … 743 ms)
new Blob().arrayBuffer()   3'967 µs/iter   (2'397 µs … 8'472 µs)

summary for buffer-concat
  Buffer.concat()
   1.45x faster than Uint8Array.set()
   2.24x faster than new Blob().arrayBuffer()
   393.61x faster than Uint8Array.from()
```
