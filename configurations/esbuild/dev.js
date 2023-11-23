const fs = require('fs');
fs.symlink;
const esbuild = require('esbuild');
const { copy } = require('esbuild-plugin-copy');
const { clean } = require('esbuild-plugin-clean');
const colors = require('cli-color');

const PORT = 3000;

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
    try {
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
                rebuild(),
            ],
        });
        await ctx.watch();
        await ctx.rebuild();
        await ctx.serve({
            port: PORT,
            servedir: 'build',
        });
    } catch (error) {
        process.exit(1);
    }
};

main().finally();
