import countries from 'world-countries';

type Country = {
  code: string;
  name: string;
  flag: string;
  location: [number, number];
  region: string;
};

export const formattedCountries: Country[] = countries.map((item) => ({
  code: item.cca2,
  name: item.name.common,
  flag: item.flag,
  location: item.latlng as [number, number],
  region: item.region,
}));

export const findCountryByCode = (code: string): Country | undefined => 
  formattedCountries.find((item) => item.code === code);
