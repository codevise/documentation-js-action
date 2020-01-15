const core = require('@actions/core');
const exec = require('@actions/exec');
const camelCase = require('camelcase');
const path = require('path');

async function run() {
  try {
    const input = core.getInput('input');
    const args = ['build', input];

    let theme = core.getInput('theme');
    const themePackage = core.getInput('themePackage');

    if (themePackage) {
      await exec.exec('npm', ['install', themePackage], {cwd: __dirname});

      args.push('--theme')
      args.push(path.resolve(__dirname, 'node_modules', theme))
    }

    [
      'project-name',
      'project-version',
      'project-description',
      'project-homepage',
      'favicon',
      'markdown-toc',
      'markdown-toc-max-depth',
      'shallow',
      'config',
      'no-package',
      'external',
      'require-extension',
      'parse-extension',
      'private',
      'access',
      'github',
      'infer-private',
      'document-exported',
      'sort-order',
      'output',
      'format'
    ].forEach(option => {
      const key = camelCase(option)
      const value = core.getInput(key);

      if (value) {
        args.push(`--${option}`);
        args.push(value);
      }
    });

    const script = `${__dirname}/node_modules/documentation/bin/documentation.js`;

    await exec.exec(script, args);
  }
  catch(error) {
    core.setFailed(error.message);
  }
}

run();
