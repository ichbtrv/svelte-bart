export interface Estimate {
  minutes: string;
  platform: string;
  direction: string;
  length: string;
  color: string;
  hexcolor: string;
  bikeflag: string;
  delay: string;
  cancelflag: string;
  dynamicflag: string;
}

export interface StationTime {
  destination: string;
  abbreviation: string;
  limited: string;
  estimate: Estimate[];
}

export interface Station {
  name: string;
  abbr: string;
  gtfs_latitude: string;
  gtfs_longitude: string;
  address: string;
  city: string;
  county: string;
  state: string;
  zipcode: string;
}