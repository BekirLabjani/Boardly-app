export class User {
  userName: string;
  phoneNumb: string;
  email: string;
  id: string;

  constructor(obj?: any) {
    this.userName = obj ? obj.firstName : '';
    this.phoneNumb = obj ? obj.phoneNumb : '';
    this.email = obj ? obj.email : '';
    this.id = obj ? obj.id : '';
  }

  public toJSON() {
    return {
      userName: this.userName,
      phoneNumb: this.phoneNumb,
      email: this.email,
      id: this.id,
    };
  }
}
