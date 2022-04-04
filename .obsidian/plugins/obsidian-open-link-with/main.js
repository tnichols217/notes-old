'use strict';

var obsidian = require('obsidian');
var child_process = require('child_process');
var fs = require('fs');
var path = require('path');
var os = require('os');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return Object.freeze(n);
}

var path__namespace = /*#__PURE__*/_interopNamespace(path);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const BROWSER_SYSTEM = {
    val: '_system',
    display: 'system-default',
};
const BROWSER_GLOBAL = {
    val: '_global',
    display: 'global',
};
const PRESET_BROWSERS = {
    safari: {
        darwin: {
            sysCmd: 'open',
            sysArgs: ['-a'],
            cmd: 'safari',
            optional: {},
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                return true;
            }),
        },
    },
    firefox: {
        darwin: {
            cmd: path__namespace.join('/Applications', 'Firefox.app', 'Contents', 'MacOS', 'firefox'),
            optional: {
                private: {
                    args: ['--private-window'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                return fs.existsSync(b.cmd);
            }),
        },
        linux: {
            cmd: 'firefox',
            optional: {
                private: {
                    args: ['--private-window'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                const c = child_process.spawnSync('which', [b.cmd]);
                return c.status === 0;
            }),
        },
        win32: {
            cmd: path__namespace.join('c:', 'Program Files', 'Mozilla Firefox', 'firefox.exe'),
            optional: {
                private: {
                    args: ['--private-window'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                return fs.existsSync(b.cmd);
            }),
        },
    },
    chrome: {
        darwin: {
            cmd: path__namespace.join('/Applications', 'Google Chrome.app', 'Contents', 'MacOS', 'Google Chrome'),
            optional: {
                private: {
                    args: ['-incognito'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                return fs.existsSync(b.cmd);
            }),
        },
        linux: {
            cmd: 'google-chrome',
            optional: {
                private: {
                    args: ['-incognito'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                const c = child_process.spawnSync('which', [b.cmd]);
                return c.status === 0;
            }),
        },
        win32: {
            cmd: path__namespace.join('c:', 'Program Files (x86)', 'Google', 'Chrome', 'Application', 'chrome.exe'),
            optional: {
                private: {
                    args: ['-incognito'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                return fs.existsSync(b.cmd);
            }),
        },
    },
    chromium: {
        darwin: {
            cmd: path__namespace.join('/Applications', 'Chromium.app', 'Contents', 'MacOS', 'Chromium'),
            optional: {
                private: {
                    args: ['-incognito'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                return fs.existsSync(b.cmd);
            }),
        },
        linux: {
            cmd: 'chromium-browser',
            optional: {
                private: {
                    args: ['-incognito'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                const c = child_process.spawnSync('which', [b.cmd]);
                return c.status === 0;
            }),
        },
    },
    edge: {
        darwin: {
            cmd: path__namespace.join('/Applications', 'Microsoft Edge.app', 'Contents', 'MacOS', 'Microsoft Edge'),
            optional: {
                private: {
                    args: ['-inprivate'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                return fs.existsSync(b.cmd);
            }),
        },
        win32: {
            cmd: path__namespace.join('c:', 'Program Files (x86)', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
            optional: {
                private: {
                    args: ['-inprivate'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                return fs.existsSync(b.cmd);
            }),
        },
    },
};
const MODIFIER_TEXT_FALLBACK = {
    none: 'None',
    meta: 'Meta',
    alt: 'Alt',
    ctrl: 'Ctrl',
    shift: 'Shift',
};
const MODIFIER_TEXT = {
    mac: {
        meta: 'Cmd⌘',
        alt: 'Option⌥',
        ctrl: 'Control⌃',
        shift: 'Shift⇧',
    },
    win: {
        meta: 'Windows',
    },
};

var Platform;
(function (Platform) {
    Platform["Unknown"] = "unknown";
    Platform["Linux"] = "linux";
    Platform["Mac"] = "mac";
    Platform["Win"] = "win";
})(Platform || (Platform = {}));
var MouseButton;
(function (MouseButton) {
    MouseButton[MouseButton["Main"] = 0] = "Main";
    MouseButton[MouseButton["Auxiliary"] = 1] = "Auxiliary";
    MouseButton[MouseButton["Secondary"] = 2] = "Secondary";
    MouseButton[MouseButton["Fourth"] = 3] = "Fourth";
    MouseButton[MouseButton["Fifth"] = 4] = "Fifth";
})(MouseButton || (MouseButton = {}));

const getPlatform = () => {
    const platform = window.navigator.platform;
    switch (platform.slice(0, 3)) {
        case 'Mac':
            return Platform.Mac;
        case 'Win':
            return Platform.Win;
        default:
            return Platform.Linux;
    }
};
const genRandomChar = (radix) => {
    return Math.floor(Math.random() * radix)
        .toString(radix)
        .toLocaleUpperCase();
};
const genRandomStr = (len) => {
    const id = [];
    for (const _ of ' '.repeat(len)) {
        id.push(genRandomChar(36));
    }
    return id.join('');
};
const getValidModifiers = (platform) => {
    if (platform == Platform.Unknown) {
        return ['none'];
    }
    else {
        return ['none', 'ctrl', 'meta', 'alt', 'shift'];
    }
};
const log = (msg_type, title, message) => {
    let wrapper;
    if (msg_type === 'warn') {
        wrapper = console.warn;
    }
    else if (msg_type === 'error') {
        wrapper = console.error;
    }
    else {
        wrapper = console.info;
    }
    if (typeof message === 'string') {
        wrapper('[open-link-with] ' + title + ':\n' + message);
    }
    else {
        wrapper('[open-link-with] ' + title);
        wrapper(message);
    }
};

class Browser {
    constructor(name, defaultCMD) {
        this.name = name;
        this.profiles = defaultCMD;
    }
}
const openWith = (url, cmd, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const _spawn = (args) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((res) => {
            var _a, _b;
            const _args = [...args];
            const reg = RegExp(/^[^"|'](.+)(?<!\\)(\ ){1}/);
            const match = reg.exec(_args[0]);
            if (match !== null) {
                // TODO: may have potential issues
                _args[0] = `"${_args[0]}"`;
            }
            reg.exec(_args[0]);
            if ((_a = options === null || options === void 0 ? void 0 : options.enableLog) !== null && _a !== void 0 ? _a : false) {
                log('info', 'opening', _args.join(' '));
            }
            const child = child_process.spawn(_args[0], args.slice(1), {
                stdio: 'ignore',
                shell: true,
            });
            child.on('exit', (code) => {
                res(code);
            });
            setTimeout(() => {
                res(0);
            }, (_b = options === null || options === void 0 ? void 0 : options.timeout) !== null && _b !== void 0 ? _b : 250);
        });
    });
    const target = '$TARGET_URL';
    let match = false;
    const _cmd = cmd.map((arg) => {
        const idx = arg.indexOf(target);
        if (idx !== -1) {
            match = true;
            return (arg.substr(0, idx) +
                encodeURIComponent(url) +
                arg.substr(idx + target.length));
        }
        else {
            return arg;
        }
    });
    if (!match) {
        _cmd.push(url);
    }
    return yield _spawn(_cmd);
});
const getPresetBrowser = () => {
    const presets = [];
    presets.push(new Browser('safari', PRESET_BROWSERS['safari']));
    presets.push(new Browser('firefox', PRESET_BROWSERS['firefox']));
    presets.push(new Browser('chrome', PRESET_BROWSERS['chrome']));
    presets.push(new Browser('chromium', PRESET_BROWSERS['chromium']));
    presets.push(new Browser('edge', PRESET_BROWSERS['edge']));
    return presets;
};
const getValidBrowser = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = getPresetBrowser();
    const os$1 = os.platform();
    const preset = {};
    browser.forEach(({ profiles, name }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        let app = profiles[os$1];
        if (typeof app !== 'undefined' &&
            app.test &&
            (yield app.test(app))) {
            for (const pvt of [0, 1]) {
                const cmds = [];
                if (pvt) {
                    if (!((_a = app === null || app === void 0 ? void 0 : app.optional) === null || _a === void 0 ? void 0 : _a.private)) {
                        continue;
                    }
                    app = Object.assign(Object.assign({}, app), ((_b = app.optional.private) !== null && _b !== void 0 ? _b : {}));
                }
                if (app.sysCmd) {
                    cmds.push(app.sysCmd);
                }
                if (app.sysArgs) {
                    app.sysArgs.forEach((arg) => cmds.push(arg));
                }
                cmds.push(app.cmd);
                if (app.args) {
                    app.args.forEach((arg) => cmds.push(arg));
                }
                preset[name + (pvt ? '-private' : '')] =
                    cmds;
            }
        }
    }));
    return preset;
});

const DEFAULT_SETTINGS = {
    selected: BROWSER_SYSTEM.val,
    custom: {},
    modifierBindings: [],
    enableLog: false,
    timeout: 500,
};
class OpenLinkPlugin extends obsidian.Plugin {
    get profiles() {
        return Object.assign(Object.assign({}, this.presetProfiles), this.settings.custom);
    }
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSettings();
            const extLinkClick = (evt, validClassName, options = {}) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const el = evt.target;
                if (el.classList.contains(validClassName)) {
                    const { button, altKey, ctrlKey, metaKey, shiftKey, } = evt;
                    let modifier = 'none';
                    if (altKey) {
                        modifier = 'alt';
                    }
                    else if (ctrlKey) {
                        modifier = 'ctrl';
                    }
                    else if (metaKey) {
                        modifier = 'meta';
                    }
                    else if (shiftKey) {
                        modifier = 'shift';
                    }
                    const url = el.getAttribute('href');
                    const profileName = (_a = this.settings.modifierBindings.find((mb) => {
                        if (mb.auxClickOnly &&
                            button !=
                                MouseButton.Auxiliary) {
                            return false;
                        }
                        else {
                            return (mb.modifier == modifier);
                        }
                    })) === null || _a === void 0 ? void 0 : _a.browser;
                    const cmd = this.getOpenCMD(profileName !== null && profileName !== void 0 ? profileName : this.settings.selected);
                    if (this.settings.enableLog) {
                        log('info', 'external link clicked...', {
                            click: {
                                button,
                                altKey,
                                ctrlKey,
                                metaKey,
                                shiftKey,
                            },
                            modifier,
                            mouseEvent: evt,
                            url,
                            profileName,
                            cmd,
                        });
                    }
                    // right click trigger (windows only)
                    if (typeof options.allowedButton !=
                        'undefined' &&
                        button != options.allowedButton) {
                        return;
                    }
                    if (typeof cmd !== 'undefined') {
                        evt.preventDefault();
                        const code = yield openWith(url, cmd, {
                            enableLog: this.settings.enableLog,
                            timeout: this.settings.timeout,
                        });
                        if (code !== 0) {
                            if (this.settings.enableLog) {
                                log('error', 'failed to open', `'spawn' exited with code ${code} when ` +
                                    `trying to open an external link with ${profileName}.`);
                            }
                            open(url);
                        }
                    }
                }
            });
            this.presetProfiles = yield getValidBrowser();
            this.addSettingTab(new SettingTab(this.app, this));
            this.registerDomEvent(document, 'click', (evt) => {
                return extLinkClick(evt, 'fake-external-link', {
                    allowedButton: MouseButton.Main,
                });
            });
            this.registerDomEvent(document, 'auxclick', (evt) => {
                return extLinkClick(evt, 'external-link', {
                    allowedButton: MouseButton.Auxiliary,
                });
            });
            eval(`
            window._open = window.open
            window.open = (e, t, n) => {
                let isExternalLink = false
                try {
                    if (
                        ['http:', 'https:'].indexOf(
                            new URL(e).protocol
                        ) != -1
                    ) {
                        isExternalLink = true
                    }
                } catch (TypeError) {}
                if (isExternalLink) {
                    const url = e
                    const fakeID = 'fake_extlink'
                    let fake = document.getElementById(fakeID)
                    if (fake == null) {
                        fake = document.createElement('span')
                        fake.classList.add('fake-external-link')
                        fake.setAttribute('id', fakeID)
                        document.body.append(fake)
                    }
                    fake.setAttr('href', url)
                } else {
                    window._open(e, t, n)
                }
            }
            window.document.addEventListener('click', (e) => {
                const fakeId = 'fake_extlink'
                if (e.target.classList == 'external-link') {
                    const fake = document.getElementById(fakeId)
                    if (fake != null) {
                        e.preventDefault()
                        const e_cp = new MouseEvent(e.type, e)
                        fake.dispatchEvent(e_cp)
                        fake.remove()
                    } else {
                        console.error(
                            '[open-link-with] fake-el with "' +
                                fakeId +
                                '" not found'
                        )
                    }
                }
            })
        `);
        });
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.settings.enableLog) {
                log('info', 'saving settings', this.settings);
            }
            yield this.saveData(this.settings);
        });
    }
    getOpenCMD(val) {
        if (val === BROWSER_SYSTEM.val) {
            return undefined;
        }
        if (val === BROWSER_GLOBAL.val) {
            val = this.settings.selected;
        }
        return this.profiles[val];
    }
}
class PanicModal extends obsidian.Modal {
    constructor(app, message) {
        super(app);
        this.message = message;
    }
    onOpen() {
        let { contentEl } = this;
        contentEl.setText(this.message);
    }
    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}
class SettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
        this._profileChangeHandler = obsidian.debounce((val) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const profiles = JSON.parse(val);
                this.plugin.settings.custom = profiles;
                yield this.plugin.saveSettings();
                this._render();
            }
            catch (e) {
                this.panic((_b = (_a = e.message) !== null && _a !== void 0 ? _a : e.toString()) !== null && _b !== void 0 ? _b : 'some error occurred in open-link-with');
            }
        }), 1500, true);
        this._timeoutChangeHandler = obsidian.debounce((val) => __awaiter(this, void 0, void 0, function* () {
            const timeout = parseInt(val);
            if (Number.isNaN(timeout)) {
                this.panic('Value of timeout should be interger.');
            }
            else {
                this.plugin.settings.timeout = timeout;
                yield this.plugin.saveSettings();
                this._render();
            }
        }), 1500, true);
    }
    panic(msg) {
        new PanicModal(this.app, msg).open();
    }
    _render() {
        let { containerEl } = this;
        containerEl.empty();
        new obsidian.Setting(containerEl)
            .setName('Browser')
            .setDesc('Open external link with selected browser.')
            .addDropdown((dd) => {
            const cur = this.plugin.settings.selected;
            const items = [];
            const profiles = this.plugin.profiles;
            let _match = false;
            for (const p of Object.keys(profiles)) {
                if (p === cur) {
                    _match = true;
                    items.unshift({ val: p });
                }
                else {
                    items.push({ val: p });
                }
            }
            if (!_match) {
                items.unshift(BROWSER_SYSTEM);
            }
            else {
                items.push(BROWSER_SYSTEM);
            }
            items.forEach((i) => { var _a; return dd.addOption(i.val, (_a = i.display) !== null && _a !== void 0 ? _a : i.val); });
            dd.onChange((p) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.selected = p;
                yield this.plugin.saveSettings();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName('Customization')
            .setDesc('Customization profiles in JSON.')
            .addTextArea((text) => text
            .setPlaceholder('{}')
            .setValue(JSON.stringify(this.plugin.settings.custom, null, 4))
            .onChange(this._profileChangeHandler));
        const mbSetting = new obsidian.Setting(containerEl)
            .setName('Modifier Bindings')
            .setDesc('Matching from top to bottom') // TODO:
            .addButton((btn) => {
            btn.setButtonText('New');
            btn.onClick((_) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.modifierBindings.unshift({
                    id: genRandomStr(6),
                    platform: Platform.Unknown,
                    modifier: 'none',
                    auxClickOnly: true,
                });
                yield this.plugin.saveSettings();
                this._render();
            }));
        });
        const mbSettingEl = mbSetting.settingEl;
        mbSettingEl.setAttr('style', 'flex-wrap:wrap');
        const bindings = this.plugin.settings.modifierBindings;
        bindings.forEach((mb) => {
            const ctr = document.createElement('div');
            ctr.setAttr('style', 'flex-basis:100%;height:auto;margin-top:18px');
            const mini = document.createElement('div');
            const kb = new obsidian.Setting(mini);
            kb.addDropdown((dd) => {
                var _a;
                const browsers = [
                    ...Object.keys(this.plugin.profiles).map((b) => {
                        return { val: b };
                    }),
                    BROWSER_SYSTEM,
                    BROWSER_GLOBAL,
                ];
                browsers.forEach((b) => {
                    var _a;
                    dd.addOption(b.val, (_a = b.display) !== null && _a !== void 0 ? _a : b.val);
                });
                dd.setValue((_a = mb.browser) !== null && _a !== void 0 ? _a : BROWSER_GLOBAL.val);
                dd.onChange((browser) => __awaiter(this, void 0, void 0, function* () {
                    if (browser == BROWSER_GLOBAL.val) {
                        browser = undefined;
                    }
                    this.plugin.settings.modifierBindings.find((m) => m.id == mb.id).browser = browser;
                    yield this.plugin.saveSettings();
                }));
            })
                .addToggle((toggle) => {
                toggle.setValue(mb.auxClickOnly);
                toggle.setTooltip('Triggered on middle mouse button click only');
                toggle.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.modifierBindings.find((m) => m.id == mb.id).auxClickOnly = val;
                    yield this.plugin.saveSettings();
                }));
            })
                .addDropdown((dd) => {
                const platform = getPlatform();
                getValidModifiers(platform).forEach((m) => {
                    dd.addOption(m, Object.assign(Object.assign({}, MODIFIER_TEXT_FALLBACK), MODIFIER_TEXT[platform])[m]);
                });
                dd.setValue(mb.modifier);
                dd.onChange((modifier) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.modifierBindings.find((m) => m.id == mb.id).modifier = modifier;
                    yield this.plugin.saveSettings();
                }));
            })
                .addButton((btn) => {
                btn.setButtonText('Remove');
                btn.setClass('mod-warning');
                btn.onClick((_) => __awaiter(this, void 0, void 0, function* () {
                    const idx = this.plugin.settings.modifierBindings.findIndex((m) => m.id == mb.id);
                    this.plugin.settings.modifierBindings.splice(idx, 1);
                    yield this.plugin.saveSettings();
                    this._render();
                }));
            });
            kb.controlEl.setAttr('style', 'justify-content: space-between !important;');
            mbSettingEl.appendChild(ctr);
            ctr.appendChild(kb.controlEl);
        });
        new obsidian.Setting(containerEl)
            .setName('Logs')
            .setDesc('Display logs in console (open developer tools to view).')
            .addToggle((toggle) => {
            toggle.setValue(this.plugin.settings.enableLog);
            toggle.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.enableLog = val;
                yield this.plugin.saveSettings();
                this._render();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName('Timeout')
            .addText((text) => text
            .setPlaceholder('500')
            .setValue(this.plugin.settings.timeout.toString())
            .onChange(this._timeoutChangeHandler));
    }
    display() {
        this._render();
    }
}

module.exports = OpenLinkPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy9jb25zdGFudC50cyIsIi4uL3NyYy90eXBlcy50cyIsIi4uL3NyYy91dGlscy50cyIsIi4uL3NyYy9vcGVuLnRzIiwiLi4vc3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOm51bGwsIm5hbWVzIjpbInBhdGgiLCJleGlzdHNTeW5jIiwic3Bhd25TeW5jIiwic3Bhd24iLCJvcyIsInBsYXRmb3JtIiwiUGx1Z2luIiwiTW9kYWwiLCJQbHVnaW5TZXR0aW5nVGFiIiwiZGVib3VuY2UiLCJTZXR0aW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdURBO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNu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
