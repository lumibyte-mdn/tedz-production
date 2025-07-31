export type TFormState<T = any> = {
  successMessage?: string;
  errors?: StringMap | null;
  message?: string;
  data?: T;
};

export type StringMap = Record<string, string>;

export type StringToBooleanMap = Record<string, boolean>;

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

type TQueryParams = string | number | Array<string, number | string> | null;

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TProject {
  id: number;
  title: string;
  image: string;
  video: string;
  category: string;
  description: string;
}

export interface TService {
  title: string;
  slug: string;
  image: string;
}

export interface TBrand {
  id: number;
  name: string;
  logo: string;
  createdAt: Date;
  updatedAt: Date;
}
