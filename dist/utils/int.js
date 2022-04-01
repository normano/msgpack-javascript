"use strict";
// Integer Utility
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUint64 = exports.getInt64 = exports.setInt64 = exports.setUint64 = exports.setBInt64 = exports.setBUint64 = exports.isBInt64 = exports.isBUInt64 = exports.BIG_MAX_SAFE_INTEGER = exports.BIG_MIN_SAFE_INTEGER = exports.BIGINT64_MAX = exports.BIGINT64_MIN = exports.BIGUINT64_MAX = exports.UINT32_MAX = void 0;
exports.UINT32_MAX = 4294967295;
exports.BIGUINT64_MAX = BigInt("18446744073709551615");
exports.BIGINT64_MIN = BigInt("-9223372036854775808");
exports.BIGINT64_MAX = BigInt("9223372036854775807");
exports.BIG_MIN_SAFE_INTEGER = BigInt(Number.MIN_SAFE_INTEGER);
exports.BIG_MAX_SAFE_INTEGER = BigInt(Number.MAX_SAFE_INTEGER);
function isBUInt64(value) {
    return value <= exports.BIGUINT64_MAX;
}
exports.isBUInt64 = isBUInt64;
function isBInt64(value) {
    return value >= exports.BIGINT64_MIN && value <= exports.BIGINT64_MAX;
}
exports.isBInt64 = isBInt64;
function setBUint64(view, offset, value) {
    view.setBigUint64(offset, value);
}
exports.setBUint64 = setBUint64;
function setBInt64(view, offset, value) {
    view.setBigInt64(offset, value);
}
exports.setBInt64 = setBInt64;
// DataView extension to handle int64 / uint64,
// where the actual range is 53-bits integer (a.k.a. safe integer)
function setUint64(view, offset, value) {
    const high = value / 4294967296;
    const low = value; // high bits are truncated by DataView
    view.setUint32(offset, high);
    view.setUint32(offset + 4, low);
}
exports.setUint64 = setUint64;
function setInt64(view, offset, value) {
    const high = Math.floor(value / 4294967296);
    const low = value; // high bits are truncated by DataView
    view.setUint32(offset, high);
    view.setUint32(offset + 4, low);
}
exports.setInt64 = setInt64;
function getInt64(view, offset) {
    const bigNum = view.getBigInt64(offset);
    if (bigNum < exports.BIG_MIN_SAFE_INTEGER || bigNum > exports.BIG_MAX_SAFE_INTEGER) {
        return bigNum;
    }
    return Number(bigNum);
}
exports.getInt64 = getInt64;
function getUint64(view, offset) {
    const bigNum = view.getBigUint64(offset);
    if (bigNum > exports.BIG_MAX_SAFE_INTEGER) {
        return bigNum;
    }
    return Number(bigNum);
}
exports.getUint64 = getUint64;
//# sourceMappingURL=int.js.map