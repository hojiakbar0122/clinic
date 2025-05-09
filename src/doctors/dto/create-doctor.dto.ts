export class CreateDoctorDto {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    confirm_password:string
    specialization: string;
    experience: number;
    photo_url?: string;
    bio: string;
    departmentId: number;
    is_active: boolean;
}
