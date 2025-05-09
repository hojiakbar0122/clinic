export class CreateAdminDto {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
  confirm_password: string;
  is_creator: boolean;
  is_active: boolean;
}
