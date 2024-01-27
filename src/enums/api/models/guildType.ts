export enum EGuildType {
  None = 0,
  Unverified = 1 << 0,
  Verified = 1 << 1,
  Featured = 1 << 2,
  Private = 1 << 3,
  All = Unverified | Verified | Featured | Private,
}
