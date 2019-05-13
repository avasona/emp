import { IResource } from './IResource';

interface ISharedProps {
  firstName: string;
  lastName?: string;
  age?: number;
  email?: string;
  phone?: string;
}

export interface IEmployeeBase extends ISharedProps, IResource<number> {}

export interface IEmployeeCreate extends ISharedProps {}