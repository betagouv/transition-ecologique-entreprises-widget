export type WithoutNullableKeys<Type> = {
  [Key in keyof Type]-?: WithoutNullableKeys<NonNullable<Type[Key]>>
}

export type ValueOf<T> = T[keyof T]
