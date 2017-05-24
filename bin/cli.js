#! /usr/bin/env node

/*
 * From: https://github.com/rhysd/NyaoVim/blob/master/bin/cli.js
 * License: MIT (https://github.com/rhysd/NyaoVim/blob/master/LICENSE.txt)
 */

const spawn = require('child_process').spawn;
const electron = require('electron');
const join = require('path').join;

const argv = process.argv.slice(2);
const no_detach_idx = argv.indexOf('--no-detach');
const detached =
    no_detach_idx === -1 &&
    argv.indexOf('--help') === -1 &&
    argv.indexOf('--version') === -1;

if (no_detach_idx !== -1) {
    argv.splice(no_detach_idx, 1);
}
argv.unshift(join(__dirname, '..'));

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
}

if (detached) {
    spawn(electron, argv, {
        stdio: 'inherit',
        detached: true
    }).unref();
} else {
    spawn(electron, argv, { stdio: 'inherit' });
}

