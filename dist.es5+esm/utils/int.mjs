// Integer Utility
export var UINT32_MAX = 4294967295;
export var BIGUINT64_MAX = BigInt("18446744073709551615");
export var BIGINT64_MIN = BigInt("-9223372036854775808");
export var BIGINT64_MAX = BigInt("9223372036854775807");
export var BIG_MIN_SAFE_INTEGER = BigInt(Number.MIN_SAFE_INTEGER);
export var BIG_MAX_SAFE_INTEGER = BigInt(Number.MAX_SAFE_INTEGER);
export function isBUInt64(value) {
    return value <= BIGUINT64_MAX;
}
export function isBInt64(value) {
    return value >= BIGINT64_MIN && value <= BIGINT64_MAX;
}
export function setBUint64(view, offset, value) {
    view.setBigUint64(offset, value);
}
export function setBInt64(view, offset, value) {
    view.setBigInt64(offset, value);
}
// DataView extension to handle int64 / uint64,
// where the actual range is 53-bits integer (a.k.a. safe integer)
export function setUint64(view, offset, value) {
    var high = value / 4294967296;
    var low = value; // high bits are truncated by DataView
    view.setUint32(offset, high);
    view.setUint32(offset + 4, low);
}
export function setInt64(view, offset, value) {
    var high = Math.floor(value / 4294967296);
    var low = value; // high bits are truncated by DataView
    view.setUint32(offset, high);
    view.setUint32(offset + 4, low);
}
export function getInt64(view, offset) {
    var bigNum = view.getBigInt64(offset);
    if (bigNum < BIG_MIN_SAFE_INTEGER || bigNum > BIG_MAX_SAFE_INTEGER) {
        return bigNum;
    }
    return Number(bigNum);
}
export function getUint64(view, offset) {
    var bigNum = view.getBigUint64(offset);
    if (bigNum > BIG_MAX_SAFE_INTEGER) {
        return bigNum;
    }
    return Number(bigNum);
}
//# sourceMappingURL=int.mjs.map