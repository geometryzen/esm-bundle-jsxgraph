import commonjs from "@rollup/plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import packageJson from './package.json' assert { type: 'json' };

const dependencyPkgName = "jsxgraph";
const dependencyVersion = /[0-9.]+$/.exec(
    packageJson.dependencies[dependencyPkgName]
)[0];

/**
 * @param format Either 'module' or 'system'.
 * @param target Either 'es5' or 'es2015'
 * @returns 
 */
function createConfig(format, target, minify) {
    const configDir = (format === "module" ? "esm" : format) + "/" + target;
    const plugins = [
        resolve({
            exportConditions: target === "es2015" ? ["es2015"] : undefined,
        }),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' })
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
        onwarn(warning, warn) {
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
    //    createConfig("module", "es5", false),
    //    createConfig("module", "es2015", false),
    //    createConfig("module", "es5", true),
    createConfig("module", "es2015", true),
    //    createConfig("system", "es5", false),
    //    createConfig("system", "es2015", false),
    //    createConfig("system", "es5", true),
    createConfig("system", "es2015", true),
];