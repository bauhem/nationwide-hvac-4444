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
    {type: "WSHP", name: "Water Sourced", description: ""}
  ],
  tonnage: [1.5,2,2.5,3,3.5,4,5]
};
 
export default configuration;