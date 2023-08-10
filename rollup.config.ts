import commonjs from "@rollup/plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { LoggingFunction, RollupOptions, RollupWarning } from 'rollup';
import cleanup from 'rollup-plugin-cleanup';
import packageJson from './package.json' assert { type: 'json' };

const dependencyPkgName = "jsxgraph";
const semverRegEx = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([\da-z-]+(?:\.[\da-z-]+)*))?(\+[\da-z-]+)?$/i;
const dependencyVersion = semverRegEx.exec(
    packageJson.dependencies[dependencyPkgName]
)[0];

/**
 * @param format Determines whether to generate EcmaScript or System format.
 * @param target Determines the JavaScript version.
 */
function createConfig(format: 'module' | 'system', target: 'es2022' | 'es2016' | 'es2015', minify: boolean): RollupOptions {
    const configDir = (format === "module" ? "esm" : format) + "/" + target;
    const plugins = [
        resolve({
            // Adding conditions that change the exports resolution isn't really doing anything in this case.
            exportConditions: [target],
        }),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
            target  // I'm not sure if this is really doing what I want (override tsconfig.json).
        }),
        cleanup()
    ];
    if (minify) {
        plugins.push(terser());
    }
    const banner = `/**
 * ${packageJson.name}@${packageJson.version} is a bundled "${format}" format for ${dependencyPkgName}@${dependencyVersion}
 * © 2023 ${packageJson.author}
 * Released under the ${packageJson.license} License.
 */
`.trim();

    return {
        input: "./src/index.ts",
        output: [
            {
                file: `./${configDir}/index${minify ? ".min" : ""}.js`,
                format,
                sourcemap: true,
                banner,
            }
        ],
        onwarn(warning: RollupWarning, warn: LoggingFunction) {
            // skip certain warnings
            if (warning.code === 'EVAL') return;

            // throw on others
            // Using Object.assign over new Error(warning.message) will make the CLI
            // print additional information such as warning location and help url.
            // if (warning.code === 'MISSING_EXPORT') throw Object.assign(new Error(), warning);

            // Use default for everything else
            warn(warning);
        },
        plugins
    };
}

export default [
    // Keep the number of builds to a minimum to avoid JavaScript heap out of memory issues in GitHub Actions.
    createConfig("module", "es2022", true),
    createConfig("system", "es2022", true),
];