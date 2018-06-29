"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entry = /** @class */ (function () {
    function Entry($key, $value) {
        this.$key = $key;
        this.$value = $value;
    }
    Object.defineProperty(Entry.prototype, "key", {
        get: function () {
            return this.$key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entry.prototype, "value", {
        get: function () {
            return this.$value;
        },
        enumerable: true,
        configurable: true
    });
    return Entry;
}());
exports.Entry = Entry;
exports.test = function () {
    var a = new Entry('a', 2);
    var b = new Entry('b', 4);
    var c = new Entry('b', 6);
    return [a, b, c]
        .map(function (entry) { return entry.value * 2; })
        .every(function (value) { return value > 0; });
};
//# sourceMappingURL=entry.js.map