export interface IPushkarJhipster {
  id?: number;
  name?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  pinCode?: number;
  email?: string;
  mobileNumber?: number;
}

export class PushkarJhipster implements IPushkarJhipster {
  constructor(
    public id?: number,
    public name?: string,
    public addressLine1?: string,
    public addressLine2?: string,
    public addressLine3?: string,
    public pinCode?: number,
    public email?: string,
    public mobileNumber?: number
  ) {}
}
