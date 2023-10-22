export interface Column {
  name: string;
  label: string;
  field: string;
  sortable?: boolean;
}
export class Planet {
  name: string;
  rotation_period: string;
  diameter: string;
  climate: string;
  gravity: string;

  constructor(name: string, rotation_period: string, diameter: string, climate: string, gravity: string) {
    this.name = name;
    this.rotation_period = rotation_period;
    this.diameter = diameter;
    this.climate = climate;
    this.gravity = gravity;
  }

  static fromDto(item: Planet): ReadablePlanet {
    const planet: ReadablePlanet = {
      name: item.name,
      rotation_period: parseFloat(item.rotation_period),
      diameter: parseFloat(item.diameter),
      climate: item.climate,
      gravity: item.gravity
    };
    return planet;
  }
}

export interface ReadablePlanet {
  name: string;
  rotation_period: number;
  diameter: number;
  climate: string;
  gravity: string;
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
