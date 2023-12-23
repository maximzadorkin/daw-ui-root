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

export type { SignUpRequestDto, SignInRequestDto, SignInResponseDto };
