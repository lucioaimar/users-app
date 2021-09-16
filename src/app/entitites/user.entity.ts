
export class User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;

  constructor(){
  }
}

export enum UserFormState
{
  New = 1,
  Edit = 2,
}
