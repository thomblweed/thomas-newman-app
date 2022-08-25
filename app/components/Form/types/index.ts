import type { ButtonType, FieldType } from '../enums';

export type FormField = {
  type: FieldType;
  name: string;
  label: string;
  required: boolean;
};

export type FormButton = {
  type: ButtonType;
  label: string;
  id: string;
  role?: string;
};

export type FormSchema = {
  fields: FormField[];
  buttons?: FormButton[];
};

export type InputType =
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';
