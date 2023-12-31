"use client";
import React, { useEffect, useState } from "react";
import CustomGlobe from "./components/CustomGlobe";
import axios from "axios";
import { Country, CountryResponse, StatesResponse } from "./components/type";

export default function Home() {
  const mockData: Country = {
    name: "Turkey",
    full_name: "Republic of Turkey",
    capital: "Ankara",
    iso2: "TR",
    iso3: "TUR",
    covid19: {
      total_case: "494,351",
      total_deaths: "13,558",
      last_updated: "2020-12-01T08:35:30.000000Z",
    },
    current_president: null,
    currency: "TRY",
    phone_code: "90",
    continent: "Asia",
    description: null,
    size: "783,562 km\u00b2",
    independence_date: null,
    population: "84,726,208",
    href: {
      self: "https://restfulcountries.com/api/v1/countries/Turkey",
      states: "https://restfulcountries.com/api/v1/countries/Turkey/states",
      presidents:
        "https://restfulcountries.com/api/v1/countries/Turkey/presidents",
      flag: "https://restfulcountries.com/assets/images/flags/Turkey.png",
    },
  };
  const [SelectedCountry, setSelectedCountry] = useState<string>();
  const [CountryData, setCountryData] = useState<Country>();
  const [loading, setLoading] = useState<boolean>(true);
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  getCountry("Turkey");
  getStates("Turkey");
  /*  useEffect(() => {
    setLoading(true);
    if (SelectedCountry) {
      setCountryData(
        getCountry(SelectedCountry).then(async (value) => {
          return await value;
        })
      );

      setLoading(false);
    }
  }, [SelectedCountry]); */

  console.log("country data", CountryData);
  console.log("loading", loading);

  return (
    <div className=" max-h-screen flex flex-row">
      <div className="m-3 p-3 h-max w-full border-2 border-blue-50 rounded">
        <div className="text-xl">
          <p>Country Name: {mockData.name}</p>
          <p>Capital City: {mockData.capital}</p>
          <p>Currency: {mockData.currency}</p>
          <p>Population: {mockData.population} people</p>
          <p>Size: {mockData.size}</p>
          <p>Continent: {mockData.continent}</p>
          <img src={mockData.href.flag} alt={mockData.iso2} />
        </div>
        {/* {!SelectedCountry ? (
          <div>Please Select a Country.</div>
        ) : loading ? (
          <div>Loading...</div>
        ) : (
          <div className="text-xl">
            <p>{mockData.name.common}</p>
          </div>
        )} */}
      </div>

      <div className="">
        <CustomGlobe setCountry={setSelectedCountry} vw={(vw / 4) * 3} />
      </div>
    </div>
  );
}

async function getCountry(countryName: string | undefined) {
  try {
    const { data } = await axios.get<CountryResponse>(
      `https://restfulcountries.com/api/v1/countries/${countryName}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer 478|OXVbGWmXuGs1DdSvxB7d4J7o4On7sCMdqIEsb6Nq",
        },
      }
    );

    return await data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
    } else {
      console.log("unexpected error: ", error);
    }
  }
}
async function getStates(countryName: string | undefined) {
  try {
    const { data } = await axios.get<StatesResponse>(
      `https://restfulcountries.com/api/v1/countries/${countryName}/states`,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer 478|OXVbGWmXuGs1DdSvxB7d4J7o4On7sCMdqIEsb6Nq",
        },
      }
    );

    return await data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
    } else {
      console.log("unexpected error: ", error);
    }
  }
}
