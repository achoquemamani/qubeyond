export { }
import { ReadablePlanet } from "../components/models";
import sortItems from "./sortItems";

describe('SortItems.spec.ts', () => {
  let planets: ReadablePlanet[]

  beforeAll(() => {
    planets = [{
      name: "test",
      rotation_period: 0,
      orbital_period: 0,
      diameter: 0,
      climate: "test",
      gravity: "test",
      terrain: "test",
      surface_water: 0,
      population: 0
    }, {
      name: "new planet",
      rotation_period: 0,
      orbital_period: 0,
      diameter: 0,
      climate: "test",
      gravity: "test",
      terrain: "test",
      surface_water: 0,
      population: 0
    }];
  });

  test('Test sort descending', () => {
    const { sortByField } = sortItems();
    const sortFn = sortByField(false, 'name');
    planets.sort(sortFn);
    expect(planets[0].name).toBe('new planet');
  });

  test('Test sort ascending', () => {
    const { sortByField } = sortItems();
    const sortFn = sortByField(true, 'name');
    planets.sort(sortFn);
    expect(planets[0].name).toBe('test');
  });
})
