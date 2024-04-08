export function getFlagStrings<T>(values: number, enumType: T): string[] {
  let result: string[] = [];

  for (let enumMember in enumType) {
    let enumValue = Number(enumMember);
    if (!isNaN(enumValue) && (values & enumValue) !== 0) {
      result.push(enumType[enumValue as keyof T] as string);
    }
  }

  return result;
}
