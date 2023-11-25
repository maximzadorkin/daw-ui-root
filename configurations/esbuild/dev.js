import esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { clean } from 'esbuild-plugin-clean';
import colors from 'cli-color';
import { postcssModules, sassPlugin } from 'esbuild-sass-plugin';
import postcssUrl from 'postcss-url';

const PORT = 3000;
const cssPrefix = 'ui-daw-root';

const rebuild = () => {
    return {
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
    };
};

const main = async () => {
    const ctx = await esbuild.context({
        entryPoints: ['src/index.tsx'],
        bundle: true,
        minify: true,
        outfile: 'build/main.js',
        alias: {
            '@app': './src/app',
            '@entities': './src/entities',
            '@features': './src/features',
            '@pages': './src/pages',
            '@widgets': './src/widgets',
            '@processes': './src/processes',
            '@shared': './src/shared',
        },
        banner: {
            js: `
                (() => {
                    const host = '/esbuild';
                    const reload = () => {
                        location.reload();
                        console.log('Reload');
                    };
                    new EventSource(host)
                        .addEventListener('change', reload);
                })();
            `,
        },
        loader: {
            '.sass': 'css',
        },
        plugins: [
            clean({ patterns: ['./build/*'] }),
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
            rebuild(),
        ],
    });
    await ctx.watch();
    await ctx.rebuild();
    await ctx.serve({
        port: PORT,
        servedir: 'build',
    });
};

main().finally();
