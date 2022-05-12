export class AuthenticationRequestDto {
  login: string | undefined;
  password: string | undefined;

  constructor(email: string, password: string) {
    this.login = email;
    this.password = password;
  }

}
