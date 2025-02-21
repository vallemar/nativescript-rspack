"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const NEW_WORKER_WITH_STRING_RE = /new\s+Worker\((['"`].+['"`])\)/g;
/**
 * Replaces
 * new Worker('./somePath')
 * with
 * new Worker(new URL('./somePath', import.meta.url))
 */
function loader(content, map) {
    const source = content.replace(NEW_WORKER_WITH_STRING_RE, 'new Worker(new URL($1, import.meta.url))');
    this.callback(null, source, map);
}
exports.default = loader;
//# sourceMappingURL=index.js.map