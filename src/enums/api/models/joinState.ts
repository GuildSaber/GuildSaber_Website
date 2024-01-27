export enum EJoinState {
  None = 0,
  Requested = 1 << 0,
  Joined = 1 << 1,
  Refused = 1 << 2,

  //Invited   = 1 << 3,
  Removed = 1 << 29,
  Banned = 1 << 30,
  All = Joined | Requested | Refused | Banned, // | Invited
}
