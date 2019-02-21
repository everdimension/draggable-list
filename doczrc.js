import { css } from 'docz-plugin-css';

export default {
  typescript: true,
  wrapper: 'src/styleguide/PlaygroundWrapper',
  plugins: [
    css({
      preprocessor: 'postcss',
      /**
       * class names created by linaria are already "scoped"
       */
      cssmodules: false,
    }),
  ],
  modifyBundlerConfig(config, isDev) {
    /**
     * Unfortunately, docz doesn't have a better way
     * to hook into its existing build rules, so we have to
     * find the first rule for js that is run for components' code
     */
    const jsRule = config.module.rules.find(
      rule => rule.test.test('.js') && !('enforce' in rule),
    );
    if (jsRule) {
      jsRule.use.push({
        loader: 'linaria/loader',
        options: {
          sourceMap: isDev,
        },
      });
    }
    return config;
  },
};
