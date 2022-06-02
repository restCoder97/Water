'use strict'

// Reference: inspired by getMovieList: 
// https://replit.com/@ProfAmenta/Movies-Frontend-Server#src/MovieList.jsx

async function sendGetRequest(url, date) {
  // Send request to origin server at appropriate endpoint
  let api_url = '/query' + url + "?year=" + date.year + "&month=" + date.month;
  console.log("api_url", api_url);
  let params = {
    method: 'GET'
  };
  
  // Fetch data
  let response = await fetch(api_url, params);
  console.log("received response");
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    throw Error(response.status);
  }
}

export default sendGetRequest;