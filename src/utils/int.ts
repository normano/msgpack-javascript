// Integer Utility

export const UINT32_MAX = 0xffff_ffff;
export const BIGUINT64_MAX: bigint = BigInt("18446744073709551615");
export const BIGINT64_MIN: bigint = BigInt("-9223372036854775808");
export const BIGINT64_MAX: bigint = BigInt("9223372036854775807");
export const BIG_MIN_SAFE_INTEGER = BigInt(Number.MIN_SAFE_INTEGER);
export const BIG_MAX_SAFE_INTEGER = BigInt(Number.MAX_SAFE_INTEGER);

export function isBUInt64(value: bigint) {
  return value <= BIGUINT64_MAX;
}

export function isBInt64(value: bigint) {
  return value >= BIGINT64_MIN && value <= BIGINT64_MAX;
}

export function setBUint64(view: DataView, offset: number, value: bigint): void {
  view.setBigUint64(offset, value);
}

export function setBInt64(view: DataView, offset: number, value: bigint): void {
  view.setBigInt64(offset, value);
}

// DataView extension to handle int64 / uint64,
// where the actual range is 53-bits integer (a.k.a. safe integer)
export function setUint64(view: DataView, offset: number, value: number): void {

  const high = value / 0x1_0000_0000;
  const low = value; // high bits are truncated by DataView
  view.setUint32(offset, high);
  view.setUint32(offset + 4, low);
}

export function setInt64(view: DataView, offset: number, value: number): void {
  const high = Math.floor(value / 0x1_0000_0000);
  const low = value; // high bits are truncated by DataView
  view.setUint32(offset, high);
  view.setUint32(offset + 4, low);
}

export function getInt64(view: DataView, offset: number): number | bigint {
  const bigNum = view.getBigInt64(offset);

  if(bigNum < BIG_MIN_SAFE_INTEGER || bigNum > BIG_MAX_SAFE_INTEGER) {
    return bigNum;
  }
  
  return Number(bigNum);
}

export function getUint64(view: DataView, offset: number): number | bigint {
  const bigNum = view.getBigUint64(offset);

  if(bigNum > BIG_MAX_SAFE_INTEGER) {
    return bigNum;
  }
  
  return Number(bigNum);
}
