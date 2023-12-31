export interface CountryResponse {
    data: Country
}

export interface Country {
    name: string
    full_name: string
    capital: string
    iso2: string
    iso3: string
    covid19: Covid19
    current_president: any
    currency: string
    phone_code: string
    continent: string
    description: any
    size: string
    independence_date: any
    population: string
    href: {
        self: string
        states: string
        presidents: string
        flag: string
    }
}

export interface Covid19 {
    total_case: string
    total_deaths: string
    last_updated: string
}


export interface StatesResponse {
    data: States[]
}

export interface States {
    name: string
    iso2: string
    fips_code: string
    population: string
    size: any
    official_language: any
    region: any
    href: {
        self: string
        country: string
    }
}
