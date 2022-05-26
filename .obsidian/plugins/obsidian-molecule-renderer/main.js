/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// main.ts
__export(exports, {
  default: () => ObsidianMoleculeRenderer
});
var import_obsidian2 = __toModule(require("obsidian"));

// obsidian-settings/settings.ts
var import_obsidian = __toModule(require("obsidian"));
function display(obj, DEFAULT_SETTINGS2, name) {
  const { containerEl } = obj;
  containerEl.empty();
  containerEl.createEl("h2", { text: "Settings for " + name });
  let keyvals = Object.entries(DEFAULT_SETTINGS2);
  for (let keyval of keyvals) {
    let setting = new import_obsidian.Setting(containerEl).setName(keyval[1].name).setDesc(keyval[1].desc);
    if (typeof keyval[1].value == "boolean") {
      setting.addToggle((toggle) => toggle.setValue(obj.plugin.settings[keyval[0]].value).onChange((bool) => {
        obj.plugin.settings[keyval[0]].value = bool;
        obj.plugin.saveSettings();
      }));
    } else {
      setting.addText((text) => text.setPlaceholder(String(keyval[1].value)).setValue(String(obj.plugin.settings[keyval[0]].value)).onChange((value) => {
        obj.plugin.settings[keyval[0]].value = obj.plugin.parseObject(value, typeof keyval[1].value);
        obj.plugin.saveSettings();
      }));
    }
  }
}
function loadSettings(obj, DEFAULT_SETTINGS2) {
  obj.settings = DEFAULT_SETTINGS2;
  obj.loadData().then((data) => {
    if (data) {
      let items = Object.entries(data);
      items.forEach((item) => {
        obj.settings[item[0]].value = item[1];
      });
    }
  });
}
function saveSettings(obj, DEFAULT_SETTINGS2) {
  return __async(this, null, function* () {
    let saveData = {};
    Object.entries(obj.settings).forEach((i) => {
      saveData[i[0]] = i[1].value;
    });
    yield obj.saveData(saveData);
  });
}

// main.ts
var NAME = "Obsidian Molecule Renderer";
var CODEBLOCK = "molecule";
var DEFAULT_SETTINGS = {};
var ObsidianMoleculeRenderer = class extends import_obsidian2.Plugin {
  onload() {
    return __async(this, null, function* () {
      yield this.loadSettings();
      this.addSettingTab(new ObsidianMoleculeRendererSettings(this.app, this));
      let colors = {};
      let updateColor = () => __async(this, null, function* () {
        let s = getComputedStyle(document.body);
        colors.C = s.getPropertyValue("--text-normal");
        colors.O = s.getPropertyValue("--text-accent");
        colors.N = s.getPropertyValue("--text-selection").split(",").slice(0, 3).join(",") + ")";
        colors.F = s.getPropertyValue("--interactive-success");
        colors.CL = colors.F;
        colors.BR = s.getPropertyValue("--text-error");
        colors.I = s.getPropertyValue("--interactive-accent");
        colors.P = colors.BR;
        colors.S = s.getPropertyValue("--text-highlight-bg").split(",").slice(0, 3).join(",") + ")";
        colors.B = s.getPropertyValue("--text-error-hover");
        colors.SI = colors.B;
        colors.H = s.getPropertyValue("--text-muted");
        colors.BACKGROUND = s.getPropertyValue("--background-primary");
      });
      updateColor();
      this.registerMarkdownCodeBlockProcessor(CODEBLOCK, (src, el, ctx) => __async(this, null, function* () {
        let req = JSON.parse(yield (0, import_obsidian2.request)({ url: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/" + src + "/property/IsomericSMILES/JSON" }));
        if ("Fault" in req) {
          let heading = el.createEl("h1");
          heading.innerText = "Chemical Not found";
          heading = el.createEl("h2");
          heading.innerText = "Similar Chemicals include:";
          let suggestions = JSON.parse(yield (0, import_obsidian2.request)({ url: "https://pubchem.ncbi.nlm.nih.gov/rest/autocomplete/compound/" + src })).dictionary_terms.compound;
          let list = el.createEl("ol");
          for (let i of suggestions) {
            let item = list.createEl("li");
            item.innerText = i.toLowerCase();
          }
        } else {
        }
      }));
    });
  }
  onunload() {
  }
  loadSettings() {
    return __async(this, null, function* () {
      console.log(this);
      loadSettings(this, DEFAULT_SETTINGS);
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield saveSettings(this, DEFAULT_SETTINGS);
    });
  }
};
var ObsidianMoleculeRendererSettings = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    display(this, DEFAULT_SETTINGS, NAME);
  }
};
