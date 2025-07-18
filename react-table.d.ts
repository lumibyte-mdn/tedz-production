/* eslint-disable @typescript-eslint/no-unused-vars */
import '@tanstack/react-table';
import { MantineStyleProps } from '@mantine/core';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    ps?: string;
    width?: MantineStyleProps['w'];
  }
}

export interface GlobalFilterTableState<TData extends AnyData> {
  globalFilter: FilterFnOption<TData>;
}

export type FilterFnOption<TData extends AnyData> =
  | 'auto'
  | BuiltInFilterFn
  | FilterFn<TData>
  | 'fuzzy';
