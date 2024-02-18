import fs from 'fs/promises';
import esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { clean } from 'esbuild-plugin-clean';
import colors from 'cli-color';
import { postcssModules, sassPlugin } from 'esbuild-sass-plugin';
import postcssUrl from 'postcss-url';
import svgr from 'esbuild-plugin-svgr';
import { esbuildPluginDecorator } from 'esbuild-plugin-decorator';
import path from 'path';

const PORT = 3000;
const SERVE_DIR = 'build';
const cssPrefix = 'ui-daw-root';

const buildInfo = () => ({
    name: 'on-end',
    setup(build) {
        build.onEnd((result) => {
            console.log(
                colors.green(`Сборка ${new Date().toLocaleString('ru')}:`),
            );
            console.log(
                colors.yellow(`Предупреждений: ${result.warnings.length}`),
            );
            console.log(colors.red(`Ошибок: ${result.errors.length}`));
            console.log();
            result.errors.forEach((error, index) => {
                console.group(
                    colors.red(`Ошибка #${index + 1}: ${error.text}`),
                );
                const link = error.location?.file;
                console.log(
                    colors.cyan(
                        [
                            `file:///${process.cwd()}/${link}`,
                            `${error.location?.line}:${error.location?.column}`,
                        ].join(' '),
                    ),
                );
                console.log(error.location?.lineText);
                console.groupEnd();
            });
        });
    },
});

const excludeNodeModulesFromSourceMaps = () => ({
    name: 'excludeNodeModulesFromSourceMaps',
    setup(build) {
        build.onLoad({ filter: /node_modules/ }, async (args) => {
            return {
                contents: `${await fs.readFile(
                    args.path,
                    'utf8',
                )}\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiJdLCJtYXBwaW5ncyI6IkEifQ==`,
                loader: 'default',
            };
        });
    },
});

const JSXAppendix = `
/** @jsx jsx */
import { jsx } from '@emotion/react';
`;

const main = async () => {
    const ctx = await esbuild.context({
        entryPoints: [
            'src/index.tsx',
            'workers/analyse.ts',
            'worklets/current-volume.ts',
        ],
        bundle: true,
        minify: false,
        format: 'esm',
        sourcemap: 'inline',
        outdir: 'build',
        jsxImportSource: '@emotion/react',
        jsx: 'automatic',
        alias: {
            '@app': './src/app',
            '@entities': './src/entities',
            '@features': './src/features',
            '@pages': './src/pages',
            '@widgets': './src/widgets',
            '@processes': './src/processes',
            '@shared': './src/shared',
        },
        loader: {
            '.sass': 'css',
        },
        plugins: [
            clean({ patterns: ['./build/*'] }),
            // excludeNodeModulesFromSourceMaps(),
            copy({
                watch: true,
                resolveFrom: 'cwd',
                assets: {
                    from: ['./public/*'],
                    to: ['./build'],
                },
            }),
            sassPlugin({
                type: 'style',
                cssImports: true,
                transform: postcssModules(
                    {
                        localsConvention: 'camelCase',
                        hashPrefix: cssPrefix,
                        generateScopedName: '[name]__[local]_[hash:base64:8]',
                    },
                    [postcssUrl({ url: 'inline' })],
                ),
            }),
            esbuildPluginDecorator(),
            svgr(),
            buildInfo(),
        ],
    });

    await ctx.watch();
    await ctx.rebuild();
    await ctx.serve({
        port: PORT,
        servedir: SERVE_DIR,
        fallback: path.join(process.cwd(), SERVE_DIR, 'index.html'),
    });
};

main().finally();
