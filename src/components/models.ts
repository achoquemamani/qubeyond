export interface Column {
  name: string;
  label: string;
  field: string;
  sortable?: boolean;
}
export interface Planet {
  name: string;
  rotation_period: string;
  diameter: string;
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