import { gapi } from 'gapi-script';

const CLIENT_ID = '243243244928-om8sopt16c9a9on1l80lubjagbdbrkra.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/analytics.readonly';


const pivotReportRequest = {
  pivots: [
    {
      fieldNames: [
        "country"
      ],
      limit: 4
    },
    {
      fieldNames: [
        "region"
      ],
      limit: 4
    },
    {
        fieldNames: [
          "city"
        ],
        limit: 4
    },
    {
        fieldNames: [
          "countryId"
        ],
        limit: 4
    }
  ],
  dateRanges: [
    {
        endDate: "today",
        startDate: "7daysAgo",
    }
  ],
  dimensions: [
    {
        name: "countryId"
    },
    {
        name: "country"
    },
    {
        name: "region"
    },
    {
        name: "city"
    },
  ],
  metrics: [
    {
      name: "activeUsers"
    }
  ]
}



const reportRequest = {
dateRanges: [
    {
      startDate: "7daysAgo",
      endDate: "today"
    }
],
metrics: [
    {
      name: "activeUsers"
    }
],
dimensions: [
    {
      name: "region",
    }
],
};

const realTimeReportRequest = {
minuteRanges: [
    {
      startMinutesAgo: 29,
      endMinutesAgo: 0
    }
],
metrics: [
    {
      name: "activeUsers"
    }
],
dimensions: [
    {
      name: "minutesAgo"
    }
],
};

// Function to load gapi client and auth2 library
const loadGapiAndAuth2 = () => {
  return new Promise((resolve, reject) => {
    gapi.load('client:auth2', {
      callback: resolve,
      onerror: reject,
      timeout: 5000, // 5 seconds.
      ontimeout: reject
    });
  });
};

// Function to initialize the Google API client
const initGapiClient = async () => {
  await gapi.client.init({
    clientId: CLIENT_ID,
    scope: SCOPES,
  });
};

// Function to initialize authentication instance (if not already initialized)
const initAuthInstance = async () => {
  if (!gapi.auth2.getAuthInstance()) {
    await gapi.auth2.init({ client_id: CLIENT_ID });
  }
};

// Function to sign in
export const ApiSignIn = async () => {
  try {
    await initAuthInstance(); // Ensure auth2 instance is initialized
    await gapi.auth2.getAuthInstance().signIn();
    console.log("Signed in successfully");
  } catch (error) {
    console.error("Error signing in:", error);
  }
};


const fetchCoordinates = async (location) => {
  try {
    let url;
    if (location.region === "(Not Set)") {
      url = `https://api.tomtom.com/search/2/structuredGeocode.json?key=fQCd1AsSZ1AKorCTCIUw2DybAiCiBGKU&countryCode=${location.countryId}`;
    } else {
      url = `https://api.tomtom.com/search/2/structuredGeocode.json?key=fQCd1AsSZ1AKorCTCIUw2DybAiCiBGKU&countryCode=${location.countryId}&countrySubdivision=${location.region.split(' ').join('_')}&municipalitySubdivision=${location.city}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API call failed with HTTP status ${response.status}`);
    }

    const data = await response.json();
    const latLon = data.results[0].position;
    return latLon;
  } catch (error) {
    // Handle or log the error
    console.error('Failed to fetch coordinates:', error.message);
    // Optionally return a default value or rethrow the error
    return null; // or throw error;
  }
}

// Function to run the Google Analytics report
// const runReport = async (propertyId, reportRequest, type) => {
//     try {
//       const response = await gapi.client.request({
//         path: `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
//         method: 'POST',
//         body: reportRequest,
//       });

//       const tempReport = response.result.rows.map(row => ({
//           city: row.dimensionValues[0].value,
//           number: row.metricValues[0].value,
//       }));

//       const toCordArray = await Promise.all(tempReport.map(async ({ city, number }) => {
//           const response = await fetch(`https://api.tomtom.com/search/2/geocode/${encodeURIComponent(city)}.json?key=${"fQCd1AsSZ1AKorCTCIUw2DybAiCiBGKU"}`);
//           const data = await response.json();
//           const position = data.results[0] ? data.results[0].position : null;
//           return { city: position, number: number };
//       }));

//       return { report: toCordArray, error: null };
//     } catch (err) {
//       return { report: null, error: err };
//     }
// };

const runRealtimeReport = async (propertyId, reportRequest) => {
  try {
    const response = await gapi.client.request({
      path: `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runRealtimeReport`,
      method: 'POST',
      body: reportRequest,
    });

    let eventData = response.result.rows

    .map(row => ({
        rawTime: row.dimensionValues[0].value,
        time: row.dimensionValues[0].value,
        numUsers: +row.metricValues[0].value,
    }))
    .sort((a, b) => a.rawTime.localeCompare(b.rawTime));

    const minTime = parseInt(eventData[0]?.rawTime, 10);
    const maxTime = parseInt(eventData[eventData.length - 1]?.rawTime, 10);

    const filledEventData = [];
    for (let time = minTime; time <= maxTime; time++) {
        const timeStr = time.toString().padStart(2, '0');
        const existingData = eventData.find(event => event.rawTime === timeStr);
        if (existingData) {
            filledEventData.push(existingData);
        } else {
            filledEventData.push({ rawTime: timeStr, time: timeStr, numUsers: 0 });
        }
    }
    console.log(filledEventData)
    const tempReport = filledEventData.map(data => ({
        ...data,
        time: timeValueFormatter(data.time),
    }));
    
    return { result: tempReport, error: null }
  } catch (err) {
    console.log(err)
    return { result: null, error: err };
  }
}

const timeValueFormatter = (value) => {
  if(value[0] === "0"){
      return `${value[1]} Mins Ago`
  }else{
      return `${value} Mins Ago`
  }
};

const runPivotReport = async (propertyId, reportRequest) => {
  try {
    const response = await gapi.client.request({
      path: `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runPivotReport`,
      method: 'POST',
      body: reportRequest,
    });

    const tempReport = await Promise.all(response.result.rows.map(async row => {
        const country = row.dimensionValues[0].value;
        const region = row.dimensionValues[1].value;
        const city = row.dimensionValues[2].value;
        const countryId = row.dimensionValues[3].value;
        const number = row.metricValues[0].value;
        const location = { countryId, country, region, city };
        const latLon = await fetchCoordinates(location);
        console.log({country: country, region: region, city: city, countryId: countryId, number: number, lonLat: latLon})
        return { country: country, region: region, city: city, countryId: countryId, number: number, lonLat: latLon};
    }));

    console.log(tempReport)
    return { result: tempReport, error: null };
  } catch (err) {
    console.log(err)
    return { result: null, error: err };
  }
}

// Function to fetch Google Analytics report
export const fetchGoogleAnalyticsReport = async (propertyId) => {
  try {
    await loadGapiAndAuth2();
    await initGapiClient();

    // const report = await runReport(propertyId, reportRequest);
    const pivotReport = await runPivotReport(propertyId, pivotReportRequest )
    const realTimeReport = await runRealtimeReport(propertyId, realTimeReportRequest)
    
    return {pivotReport, realTimeReport};
  } catch (error) {
    console.error("Error fetching the report:", error);
    return { report: null, error };
  }
};

// Initial load of gapi client and auth libraries
loadGapiAndAuth2().then(initGapiClient).catch(console.error);
