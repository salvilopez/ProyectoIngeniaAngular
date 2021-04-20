export class User {
  email: string;
  password: string;
  img: string;
  constructor(email: string, password: string, img: string) {
    this.email = email;
    this.password = password;
    this.img = img;
  }
}
