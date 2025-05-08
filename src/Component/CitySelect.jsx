import React, { useState, useEffect } from "react";
import axios from 'axios';

function CitySelect() {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);
  
   const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
        axios
            .get("https://crio-location-selector.onrender.com/countries")
            .then((response) => {
                setCountries(response.data);
            })
            .catch((error) => {
                console.error("Error fetching countries:", error);
            });
    }, []);


    useEffect(() => {
        if (selectedCountry) {
            axios
                .get(
                    `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
                )
                .then((response) => {
                    setStates(response.data);
                    setSelectedState(""); // Reset state selection
                    setCities([]); // Clear citiesnpm 
                    setSelectedCity(""); // Reset city selection
                })
                .catch((error) => {
                    console.error("Error fetching states:", error);
                });
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedCountry && selectedState) {
            axios
                .get(
                    `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
                )
                .then((response) => {
                    setCities(response.data);
                    setSelectedCity(""); // Reset city selection
                })
                .catch((error) => {
                    console.error("Error fetching cities:", error);
                });
        }
    }, [selectedCountry, selectedState]);





    return (
        <>

            <div className='main_wrapper'>

                <h2> Select Location </h2>
                <div className="city_selector">

                    <div className='dropdowns '>
                        <select
                            className="dropdown"
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}>
                            <option value="" disabled>
                                Select Country
                            </option>
                            {countries.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}

                        </select>
                    </div>

                    <div className='dropdowns '>
                        <select className="dropdown"
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            disabled={!selectedCountry}
                        >
                            <option value="" disabled>
                                Select State
                            </option>
                            {states.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}

                        </select>
                    </div>


                    <div className='dropdowns '>
                        <select className="dropdown"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            disabled={!selectedState}
                        >
                            <option value="" disabled>
                                Select City
                            </option>
                            {cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

<br/>


                   







                </div>

                <div className='dropdowns'>
                    {selectedCity && (
        <h2 className="result">
          You selected <span className="highlight">{selectedCity}</span>,
          <span className="fade">
            {" "}
            {selectedState}, {selectedCountry}
          </span>
        </h2>
      )}
                    </div>

            </div>



        </>
    )
}

export default CitySelect