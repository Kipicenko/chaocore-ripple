import type { RollupOptions } from "rollup";

import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const build_esm: RollupOptions = {
    input: "src/index.ts",
    output: {
        dir: "dist/esm",
        format: "es",
        exports: "named",
        preserveModules: true,
    },
    plugins: [
        typescript({
            noEmitOnError: true,
            compilerOptions: {
                outDir: "dist/esm",
            },
        }),
        terser(),
    ],
};

const build_cjs: RollupOptions = {
    input: "src/index.ts",
    output: {
        dir: "dist/cjs",
        format: "cjs",
        exports: "named",
        preserveModules: true,
    },
    plugins: [
        typescript({
            noEmitOnError: true,
            compilerOptions: {
                outDir: "dist/cjs",
            },
        }),
        terser(),
    ],
};

const build_iife: RollupOptions = {
    input: "src/rippleCore.ts",
    output: {
        file: "dist/iife/index.min.js",
        format: "iife",
        name: "window",
        extend: true,
        // compact: true,
    },
    plugins: [typescript({ noEmitOnError: true }), terser()],
};

const builds: Array<RollupOptions> = [build_esm, build_cjs, build_iife];

export default builds;
