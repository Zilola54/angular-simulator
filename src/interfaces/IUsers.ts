export interface IGeo {
  lat: string;
  lng: string;
}
export interface IAddress {
  city: string;
  street: string;
  zipcode: string;
  suite: string;
  geo: IGeo; 
}
export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string; 
}
export interface IUsers {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;

 address: IAddress;
 company: ICompany
 
}