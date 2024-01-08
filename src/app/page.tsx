/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const CustomGlobe = dynamic(() => import("./components/CustomGlobe"), {
  ssr: false,
});
import axios from "axios";
import { CountryResponse, StatesResponse } from "./components/type";
import useSWR from "swr";
import { fetcher } from "@/api";

export default function Home() {
  const [SelectedCountry, setSelectedCountry] = useState<string>();
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
      " https://restfulcountries.com/api/v1/countries",
      /* `https://restfulcountries.com/api/v1/countries/${countryName}` */ {
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
