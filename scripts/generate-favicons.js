const path = require('path');
const favicons = require('favicons');

const iconPath = path.resolve(__dirname, '..', 'assets-src/favicon.png');

// TODO
favicons(iconPath, { path: '/', icons: { appleIcon: true } }).then(result => {
  console.log(
    'result files',
    result.files.length,
    result.files.map(f => f.name),
  );
});
