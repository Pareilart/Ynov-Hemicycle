export interface IEmailOptions {
  to: string | string[];
  from?: {
    email: string;
    name?: string;
  };
  subject?: string;
  text?: string;
  html?: string;
  template_uuid?: string;
  template_variables?: {
    [key: string]: string;
  };
}
