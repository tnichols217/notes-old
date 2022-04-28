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
  default: () => MyPlugin
});
var import_obsidian = __toModule(require("obsidian"));
var URISCHEME = "file://";
var MyPlugin = class extends import_obsidian.Plugin {
  onload() {
    return __async(this, null, function* () {
      let processList = (element, context) => {
        let iframes = element.querySelectorAll("iframe");
        for (let child of Array.from(iframes)) {
          let src = child.getAttribute("src");
          if (!src.contains("://")) {
            let root = this.app.vault.adapter.getBasePath();
            if (src.startsWith("/")) {
              child.setAttribute("src", root + src);
            } else if (src.startsWith("./")) {
              let source = context.sourcePath;
              let index = source.lastIndexOf("/");
              source = source.substring(0, index);
              console.log(source);
              let path = URISCHEME + root + "/" + source + src.substring(1);
              console.log(path);
            } else {
            }
          }
          console.log(src);
        }
      };
      this.registerMarkdownPostProcessor((element, context) => {
        processList(element, context);
      });
    });
  }
  onunload() {
  }
};
