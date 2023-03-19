export  class AccountCreate{
username!:String;
fullName!:String;
email!:String;
phoneNumber!:String;
password!:String;
birthday!:Date;
gender!:String;

    constructor(username: String, fullName: String, email: String, phoneNumber: String, password: String, birthday: Date, gender: String) {
        this.username = username;
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.birthday = birthday;
        this.gender = gender;
    }
}