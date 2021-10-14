// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

// config.resolver.sourceExt.push('ts');
// config.resolver.sourceExt.push('tsx')

module.exports = config
