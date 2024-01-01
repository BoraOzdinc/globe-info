"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CustomGlobe = dynamic(() => import("./components/CustomGlobe"), {
  ssr: false,
});
import axios from "axios";
import { Country, CountryResponse, StatesResponse } from "./components/type";
import useSWR from "swr";
import { fetcher } from "@/api";

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
  const { data, isLoading, error } = useSWR(`${SelectedCountry}`, fetcher, {
    errorRetryCount: 0,
  });
  console.log(data);
  let vw = 1920;
  if (typeof window !== "undefined") {
    vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    if (vw > 1024) {
      vw = (vw / 4) * 3;
    }
  }

  return (
    <div className=" max-h-screen flex flex-col lg:flex-row">
      <div className="m-3 p-3 h-max w-full border-2 border-blue-50 rounded">
        {!SelectedCountry && <div>Please Select a Country</div>}
        {SelectedCountry && error && <div>{error.message}</div>}
        {isLoading && <div>Loading...</div>}
        {data && (
          <div className="text-xl">
            <p>Country Name: {data.data.name}</p>
            <p>Capital City: {data.data.capital}</p>
            <p>Currency: {data.data.currency}</p>
            <p>Population: {data.data.population} people</p>
            <p>Size: {data.data.size}</p>
            <p>Continent: {data.data.continent}</p>
            <img src={data.data.href.flag} alt={data.data.iso2} />
          </div>
        )}
      </div>

      <div className="">
        <CustomGlobe setCountry={setSelectedCountry} vw={vw} />
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

    return data.data;
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

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
    } else {
      console.log("unexpected error: ", error);
    }
  }
}
