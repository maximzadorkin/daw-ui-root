import esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { clean } from 'esbuild-plugin-clean';
import { postcssModules, sassPlugin } from 'esbuild-sass-plugin';
import postcssUrl from 'postcss-url';

const cssPrefix = 'ui-daw-root';

const main = async () => {
    try {
        await esbuild.build({
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
            plugins: [
                clean({ patterns: ['./build/*'] }),
                copy({
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
                            generateScopedName:
                                '[name]__[local]_[hash:base64:8]',
                        },
                        [postcssUrl({ url: 'inline' })],
                    ),
                }),
            ],
        });
    } catch (error) {
        process.exit(1);
    }
};

main().finally();
