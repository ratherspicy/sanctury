export type AddySearchAddress = {
  id: number;
  a: string;
};

export type AddySearchResponse = {
  matched: number;
  addresses: AddySearchAddress[];
};

export type AddyAddressDetail = {
  id: number;
  full: string;
  region: string;
  address1: string;
  address2: string;
  address3: string;
  suburb: string;
  city: string;
  postcode: string;
};
