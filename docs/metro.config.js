const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro')

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;
const config = mergeConfig(defaultConfig, {
    /* your config */
    resolver: {
        assetExts: assetExts.filter((extension) => extension !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
    },
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
        unstable_allowRequireContext: true,
        minifierConfig: {
            mangle: {
                keep_fnames: true,
            },
            output: {
                ascii_only: true,
                quote_style: 3,
                wrap_iife: true,
            },
            sourceMap: {
                includeSources: false,
            },
            toplevel: false,
            compress: {
                reduce_funcs: false,
            },
        },
    },
});

module.exports = withNativeWind(config, { input: './src/global.css' })
