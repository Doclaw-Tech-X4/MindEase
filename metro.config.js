const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for SVG files and other assets
config.resolver.assetExts.push(
  // Images
  'png',
  'jpg',
  'jpeg',
  'gif',
  'webp',
  'svg',
  // Fonts
  'ttf',
  'otf',
  'woff',
  'woff2'
);

// Add support for more file extensions
config.resolver.sourceExts.push('jsx', 'js', 'ts', 'tsx', 'json');

module.exports = config;
