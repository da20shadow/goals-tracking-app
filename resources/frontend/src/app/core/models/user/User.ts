export interface User {
  id: number;
  first_name:string;
  last_name:string;
  email_verified_at: string|null,
  created_at: string,
  updated_at: string,
  email:string;
  token:string;
}
