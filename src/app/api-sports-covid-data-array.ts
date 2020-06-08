class Cases {
    "1M_pop": string;
    active: number;
    critical: number;
    new: string;
    recovered: number;
    total: number;
}

class Deaths {
    "1M_pop": string;
    new: string;
    total: number;
}

class Tests {
    "1M_pop": string;
    total: number
}


export class ApiSportsCovidData {
    day: Date
    country: string;
    continent: string;
    time: string;
    population: number;
    cases: Cases;
    deaths: Deaths;
    Tests: Tests;
}
