export type ResourceKey = string | number;

export interface IResource<T extends ResourceKey> {
  id: T;
  _type?: string;
}