export interface Column {
  name: string;
  label: string;
  field: string;
  sortable?: boolean;
}
export class Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;

  constructor(name: string, rotation_period: string, diameter: string, climate: string, gravity: string) {
    this.name = name;
    this.rotation_period = rotation_period;
    this.diameter = diameter;
    this.climate = climate;
    this.gravity = gravity;
    this.orbital_period = '';
    this.terrain = '';
    this.surface_water = '';
    this.population = '';
  }

  static fromDto(item: Planet): ReadablePlanet {
    const parseFloatWithValidation = (value: string) => {
      return !isNaN(parseFloat(value)) ? parseFloat(value) : 0
    }

    const planet: ReadablePlanet = {
      name: item.name,
      rotation_period: parseFloatWithValidation(item.rotation_period),
      orbital_period: parseFloatWithValidation(item.orbital_period),
      diameter: parseFloatWithValidation(item.diameter),
      climate: item.climate,
      gravity: item.gravity,
      terrain: item.terrain,
      surface_water: parseFloatWithValidation(item.surface_water),
      population: parseFloatWithValidation(item.population),
    };
    return planet;
  }
}

export interface ReadablePlanet {
  name: string;
  rotation_period: number;
  orbital_period: number;
  diameter: number;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: number;
  population: number;
}

export interface GetPlanetResponse {
  data: {
    count: number;
    next: string;
    previous: string;
    results: Planet[];
  }
}

export interface Pagination {
  pagination: {
    page: number;
    rowsPerPage: number;
    sortBy: string;
    descending: boolean;
  }
}

export interface UserConfiguration {
  isDark: boolean;
}

export interface Language {
  value: string;
  icon: string;
  langIso: string;
}
