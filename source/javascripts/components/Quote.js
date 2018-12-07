import React from "react";
import QuoteCtx from "./QuoteCtx";
import Unit from "./Unit";

class Quote extends React.Component {
  constructor(props) {
    super(props);
  }

  systemTypeName(systemTypes, type) {
    let system_type_info = systemTypes.find((type_info) => {
      return type_info.type === type
    });

    return system_type_info.name;
  }

  orderMetaData(ctx) {
    let metaData = {
      air_filter_side: ctx.air_filter_side,
      air_handler_location: ctx.air_handler_location,
      air_handler_type: ctx.air_handler_type,
      condenser_unit_location: ctx.condenser_unit_location,
      packaged_system_location: ctx.packaged_system_location,
      roof_access: ctx.roof_access,
      water_heater_under_air_handler: ctx.water_heater_under_air_handler
    };

    Object.keys(metaData).forEach((key) => (metaData[key] == null) && delete metaData[key]);

    return metaData;
  }

  renderUnit(unit, props) {
    return <Unit key={unit['AHRI']} unit={unit} {...props} />;
  }

  render() {
    let good = [];
    let better = [];
    let best = [];
    let systemTypeName = this.systemTypeName(this.context.system_types, this.context.system_type);
    let orderMetaData = this.orderMetaData(this.context);

    if (this.context.units.length > 0) {
      this.context.units.forEach(unit => {
        let rating = unit['Good/Better/Best Rating'];
        switch (rating) {
          case 'Good':
            good.push(unit);
            break;
          case 'Better':
            better.push(unit);
            break;
          case 'Best':
            best.push(unit);
            break;
        }
      });
    }

    let props = {
      transition: this.props.transition,
      systemTypeName: systemTypeName,
      orderMetaData: JSON.stringify(orderMetaData),
      zone_num: this.context.zone_num
    };

    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">Here are the Good/Better/Best results for
            you</h3>
        </div>
        <div className="flex-third">
          <div className="good-div">
            <div className="heading-result">
              <div>Good</div>
            </div>
            {
              good.map(unit => {
                return this.renderUnit(unit, props);
              })
            }
          </div>
          <div className="good-div">
            <div className="heading-result best">
              <div>Better</div>
            </div>
            {
              better.map(unit => {
                return this.renderUnit(unit, props);
              })
            }
          </div>
          <div className="good-div">
            <div className="heading-result better">
              <div>Best</div>
            </div>
            {
              best.map(unit => {
                return this.renderUnit(unit, props);
              })
            }
          </div>
        </div>
      </>
    )
  }
}

Quote.contextType = QuoteCtx;


export default Quote;