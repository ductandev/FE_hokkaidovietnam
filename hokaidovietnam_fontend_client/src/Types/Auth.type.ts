export type UserRegister = {
    ho_ten: string,
    email: string,
    mat_khau: string,
    so_dien_thoai: string,
    anh_dai_dien: string,
    gioi_tinh: string
}
export type UserLogin = Pick<UserRegister, 'email' | 'mat_khau'>
