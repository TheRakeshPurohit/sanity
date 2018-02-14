// @flow
type KeyedSegment = {
  _key: string
}

type JSONValue = number | string | boolean | {[string]: JSONValue} | JSONValue[]

export type PathSegment = string | number | KeyedSegment

export type Path = Array<PathSegment>

export type Origin = 'remote' | 'local'

type SetPatch = {
  path: Path,
  type: 'set',
  origin: Origin,
  value: JSONValue
}

type SetIfMissingPatch = {
  path: Path,
  origin: Origin,
  type: 'setIfMissing',
  value: JSONValue
}

type UnsetPatch = {
  path: Path,
  origin: Origin,
  type: 'unset'
}

type InsertPatch = {
  path: Path,
  origin: Origin,
  type: 'insert',
  position: 'before' | 'after',
  items: JSONValue[]
}

export type Patch = SetPatch | SetIfMissingPatch | UnsetPatch | InsertPatch
