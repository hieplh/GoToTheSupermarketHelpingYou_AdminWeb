import React, { Component } from "react";
import GoogleMapReact, { Marker } from "google-map-react";
import MarkerOnMap from "./MarkerOnMap";
import logoShipper from "../images/driving_pin.png";
import logoMarket from "../images/cart.png";
import logoAddressDelivery from "../images/dfMarker.png";

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centerShipper: {
        lat: this.props.shipperPositionLat,
        lng: this.props.shipperPositionLong,
      },
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      centerShipper: {
        lat: props.shipperPositionLat,
        lng: props.shipperPositionLong,
      },
    });
    
  }

  static defaultProps = {
    center: {
      lat: 10.8476,
      lng: 106.7520,
    },
    zoom: 12,
  };

  render() {

    // console.log(typeof );
    // let shipperPositionFormat = this.props.shipperPosition.map(element => parseF(element))
    // const renderMarkers = (map, maps) => {
    //   let marker = new maps.Marker({
    //     position: { lat: this.props.addressDeliveryLat, lng: this.props.addressDeliveryLng },

    //     map,

    //     // title: "Hello World!",
    //   });
    //   return marker;
    // };
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "400px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCvlIOQUZEmyNxvrwKtXACB_QqycPTnAmE" }}
       
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {/* <AnyReactComponent
            image={"../images/driving_pin.png"}
            lat={10.844534}
            lng={106.806008}
          /> */}

          <MarkerOnMap
            lat={this.props.shipperPosition[0]}
            lng={this.props.shipperPosition[1]}
            name="Shipper"
            srcUrl={logoShipper}
          />
          <MarkerOnMap
            lat={this.props.marketPositionLat}
            lng={this.props.marketPositionLong}
            name="Market"
            srcUrl={logoMarket}
          />
          <MarkerOnMap
            lat={this.props.addressDeliveryLat}
            lng={this.props.addressDeliveryLng}
            name="AddressDelivery"
            srcUrl={logoAddressDelivery}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
