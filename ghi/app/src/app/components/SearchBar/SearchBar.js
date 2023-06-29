import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import YELP_API_KEY from './icls';


function SearchBar() {
    const [business, setBusiness] = useState('');
    const [location, setLocation] = useState('');
    
    const handleBusiness = (e) => {
        setBusiness(e.target.value);
    };
    const handleLocation = (e) => {
        setLocation(e.target.value);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            business: business,
            location: location
    };

      // TODO: handle and API request data here  
      try {
        const response = await fetch(
          `https://api.yelp.com/v3/businesses/search?location=${encodeURIComponent(
            data.location
          )}&term=${encodeURIComponent(data.business)}&attributes=&sort_by=rating&limit=20`,
          {
            headers: {
              Authorization: `Bearer ${YELP_API_KEY}`
            }
          }
        );
        const json = await response.json();
        console.log(json);
      } catch (err) {
        console.error('error:', err);
      }
    };

    return (
        <div style={{display: "flex", flexDirection: 'column', alignItems: 'center' }}>
          <div className="shadow p-4 mt-4">
            { /* Search bar components */}
            <form onSubmit={handleSubmit} id="SearchBar" className="offset-3 col-6">
                <div className="mb-3" id="searchBarFields">
                    <input
                        className="form-control"
                        required type="text"
                        placeholder="Search Business"
                        value={business}
                        onChange={handleBusiness}
                        style={{ alignItems: 'center', justifyContent: 'center', width: 'calc(30ch)', margin: 3 }}
                    />
                    </div>
                    <div className="mb-3">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Location"
                        value={location}
                        onChange={handleLocation}
                        style={{ alignItems: 'center', justifyContent: 'center', width: 'calc(30ch)', margin: 3 }}

                    />
                    <div className="input-group-append">
                        <button className="btn btn-success offset-3 col-6" type="submit" id="search" >
                            Search
                        </button>
                    </div>
                </div>
            </form>
          </div>
        </div>
    )
}

export default SearchBar;