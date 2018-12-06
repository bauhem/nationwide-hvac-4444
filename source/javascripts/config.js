const configuration = {
  packaged_system: [
    {type: "P SC", name: "Straight Cool", description: "Straight cool systems are great for homeowners that almost never turn their heat on. It costs less up front and is more efficient on the cooling side, but costs more to use in heat mode than a heat pump system might."},
    {type: "P HP", name: "Heat Pump", description: "Technically, a heat pump is a mechanical-compression cycle refrigeration system that can be reversed to either heat or cool a controlled space."},
    {type: "P HP OU", name: "Over-under", description: ""}
  ],
  split_system: [
    {type: "SS SC", name: "Straight Cool", description: "Straight cool systems are great for homeowners that almost never turn their heat on. It costs less up front and is more efficient on the cooling side, but costs more to use in heat mode than a heat pump system might."},
    {type: "SS HP", name: "Heat Pump", description: "Technically, a heat pump is a mechanical-compression cycle refrigeration system that can be reversed to either heat or cool a controlled space."},
  ],
  water_system: [
    {type: "WSHP", name: "Water Sourced", description: "Mostly used in high rise buildings, a water source heat pump operates much like a traditional air source heat pump except that it extracts and dissipates heat by way of water instead of air."}
  ],
  tonnage: [1.5,2,2.5,3,3.5,4,5],
  model_to_tons: [
    {model: "18", tons: 1.5},
    {model: "24", tons: 2},
    {model: "30", tons: 2.5},
    {model: "36", tons: 3},
    {model: "42", tons: 3.5},
    {model: "48", tons: 4},
    {model: "60", tons: 5},
  ],
  square_footage_to_tons: [
    {footage: '600-900', tons: 1.5},
    {footage: '901-1200', tons: 2},
    {footage: '1201-1500', tons: 2.5},
    {footage: '1501-1800', tons: 3},
    {footage: '1801-2100', tons: 3.5},
    {footage: '2101-2400', tons: 4},
    {footage: '2401-3000', tons: 5}
  ],
  root_url: 'https://egidius.serveo.net'
};

export default configuration;
