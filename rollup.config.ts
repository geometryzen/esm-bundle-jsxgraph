import commonjs from "@rollup/plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { RollupOptions, RollupWarning, WarningHandler } from 'rollup';
import packageJson from './package.json' assert { type: 'json' };

const dependencyPkgName = "jsxgraph";
const semverRegEx = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([\da-z-]+(?:\.[\da-z-]+)*))?(\+[\da-z-]+)?$/i;
// TODO: This doesn't capture the version correctly for release candidates e.g. major.minor.patch-candidate.
const dependencyVersion = semverRegEx.exec(
    packageJson.dependencies[dependencyPkgName]
)[0];

/**
 * @param format Either 'module' or 'system'.
 * @param target Either 'es2015' or 'es2016'
 * @returns 
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
        })
    ];
    if (minify) {
        plugins.push(terser());
    }
    const banner = `/**
 * ${packageJson.name}@${packageJson.version} is a bundled "${format}" format for ${dependencyPkgName}@${dependencyVersion}
 * © 2023-2023 ${packageJson.author}
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
        onwarn(warning: RollupWarning, warn: WarningHandler) {
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
    createConfig("module", "es2022", true),
    createConfig("module", "es2022", false),
    createConfig("module", "es2016", true),
    createConfig("module", "es2015", true),
    createConfig("system", "es2022", true),
    createConfig("system", "es2022", false),
    createConfig("system", "es2016", true),
    createConfig("system", "es2015", true),    
];