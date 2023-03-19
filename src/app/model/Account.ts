export class Account {
    id: number;
    username: String;
    password: String;
    email: String;
    birthday: Date;
    statusAccount: number;
    dateOfRegister: String;
    wallet: number
    logoutTime: String;
    fullName: String;
    gender: String;
    city: String;
    country: String;
    avatar: String;
    height: number;
    weight: number;
    hobby: String;
    description: String;
    statusComment: number;
    statusVip: number;


    constructor(id: number, username: String, password: String, email: String, birthday: Date, statusAccount: number, dateOfRegister: String, wallet: number, logoutTime: String, fullName: String, gender: String, city: String, country: String, avatar: String, height: number, weight: number, hobby: String, description: String, statusComment: number, statusVip: number) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.birthday = birthday;
        this.statusAccount = statusAccount;
        this.dateOfRegister = dateOfRegister;
        this.wallet = wallet;
        this.logoutTime = logoutTime;
        this.fullName = fullName;
        this.gender = gender;
        this.city = city;
        this.country = country;
        this.avatar = avatar;
        this.height = height;
        this.weight = weight;
        this.hobby = hobby;
        this.description = description;
        this.statusComment = statusComment;
        this.statusVip = statusVip;
    }
}