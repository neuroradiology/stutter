# stutter ![status](https://travis-ci.com/jamestomasino/stutter.svg?branch=master) ![GitHub](https://img.shields.io/github/license/jamestomasino/stutter.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/a4d5b54b3cf91c6a2b3e/maintainability)](https://codeclimate.com/github/jamestomasino/stutter/maintainability)

[![Firefox Get Extension](https://img.shields.io/badge/Firefox-Get%20Extension!-orange.svg?style=social&logo=mozilla-firefox)](https://addons.mozilla.org/en-US/firefox/addon/stutter/) ![Mozilla Add-on](https://img.shields.io/amo/users/stutter.svg?label=Firefox%20Users) ![Mozilla Add-on](https://img.shields.io/amo/stars/stutter.svg)

[![Chrome Get Extension](https://img.shields.io/badge/Chrome-Get%20Extension!-orange.svg?style=social&logo=google-chrome)](https://chrome.google.com/webstore/detail/stutter/fbapmaboedchhgjolcnpfgoanbfajchl) ![Chrome Web Store](https://img.shields.io/chrome-web-store/users/fbapmaboedchhgjolcnpfgoanbfajchl.svg) ![Chrome Web Store](https://img.shields.io/chrome-web-store/stars/fbapmaboedchhgjolcnpfgoanbfajchl.svg)

<a href="https://addons.mozilla.org/en-US/firefox/addon/stutter/"><img src="./icons/stutter.svg" width="100"></a>

**stutter** _(noun)_

1. Distorted speech characterized principally by blocks or spasms interrupting the rhythm.

2. A [Rapid Serial Visual Presentation](https://en.wikipedia.org/wiki/Rapid_serial_visual_presentation) (RSVP) extension for modern web browsers. It is based upon my initial work in a Google Chrome extension, [read](https://github.com/jamestomasino/read_plugin). This is an attempt to modernize the code and offer cross-browser support.

[![stutter demonstration](https://i.imgur.com/hGocwaV.png)](https://www.youtube.com/watch?v=UJwFdPYbRRg)

## Source Install and Testing

**stutter** is built using webpack and babel, with sass support and eslint styling. The code is written using es6 classes. Backend and content-scripts are maintained separately with individual webpack configurations.

To install all dependencies:

    $ yarn

To build the project:

    $ yarn build

To lint the source:

    $ yarn test

To lint the extension configuration (_must build first_):

    $ yarn webext-test

To locally test the extension in Firefox:

    $ yarn extension

To package the extension for production:

    $ yarn package

## TODO

- [x] Verify ES6 support for web extensions (with babel)
- [x] Client-side full-page parsing for readable content (like old Readability API)
- [x] Create selection context-menu as trigger
- [x] Pass selection data to RSVP processor
- [x] Create data structures for calculation of display sequence
- [x] Create on-screen display for RSVP
- [x] Options for speed personalization
- [x] Saving of personalization settings
- [x] Progress display
- [x] Chrome plugin support
- [x] Light theme with toggle in settings
- [x] Syncing of personalization settings through browser sync
- [ ] Mobile support in Firefox Android
- [ ] Seek-bar / rewind

## Permissions

This extension uses several permissions allowed by the web extensions API.

### contextMenus

Stutter allows you to read selected text by highlighting content and right-clicking to view the context menu option. This permission allows us to add the Stutter option to the context menu.

### activeTab

This permission allows the extension to inject the content script code into the browser tab when an action takes place, like clicking on the extension icon. It provides a limited access to the tab that's active when triggered.

### storage

Options in the settings page are stored in browser storage by using this permission. These settings persist between browser restarts.

In a future release of stutter, these settings will sync between browsers if you have browser sync enabled.

## 3rd Party Runtime Libraries

Full page content is analyzed and isolated by means of the [Mozilla Readability Library](https://github.com/mozilla/readability). The version in this project is modified for linting and exported as an es6 module. No changes have been made to the library logic.

[babel-polyfill](https://babeljs.io/docs/en/babel-polyfill) is used during runtime to emulate a full ES2015+ where a browser may be insufficient.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.

## License

[GPL3](LICENSE)

Mozilla's Readability library - http://www.apache.org/licenses/LICENSE-2.0
