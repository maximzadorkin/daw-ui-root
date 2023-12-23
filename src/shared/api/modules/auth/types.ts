interface SignUpRequestDto {
    username: string;

    password: string;

    passwordConfirm: string;
}

interface SignInRequestDto {
    username: string;

    password: string;
}

interface SignInResponseDto {
    accessToken: string;
}

interface ChangeUserPasswordDto {
    /** Старый пароль */
    password: string;

    /** Новый пароль */
    newPassword: string;

    /** Новый пароль */
    newPasswordConfirm: string;
}

export type {
    SignUpRequestDto,
    SignInRequestDto,
    SignInResponseDto,
    ChangeUserPasswordDto,
};
