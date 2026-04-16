import { useState, useMemo } from "react";
import { MapPin, Phone, Clock, Search, ChevronRight, Globe, Navigation } from "lucide-react";

export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: "US" | "CA" | "UK";
  phone: string;
  hours: string;
  lat: number;
  lng: number;
}

const stores: Store[] = [
  // ── UNITED STATES — scraped from metalsupermarkets.com/location/ ──
  { id: "atlanta-northeast", name: "Atlanta NE (Doraville)", address: "4301 Pleasantdale Rd, Suite J", city: "Atlanta", state: "GA", zip: "30340", country: "US", phone: "(678) 421-0054", hours: "Mon–Fri 8am–5pm", lat: 33.9019, lng: -84.2627 },
  { id: "atlanta-northwest", name: "Atlanta NW (Marietta)", address: "1349 Old 41 Hwy NW, Suite 250", city: "Marietta", state: "GA", zip: "30060", country: "US", phone: "(770) 218-0550", hours: "Mon–Fri 8am–5pm", lat: 33.9631, lng: -84.5553 },
  { id: "atlanta-south", name: "Atlanta South", address: "800 Atlanta South Pkwy, Suite 150", city: "Atlanta", state: "GA", zip: "30349", country: "US", phone: "(470) 615-9580", hours: "Mon–Fri 8am–5pm", lat: 33.6376, lng: -84.4932 },
  { id: "buford-ga", name: "Buford, GA", address: "4908 Golden Parkway, Suite 400", city: "Buford", state: "GA", zip: "30518", country: "US", phone: "(470) 655-6797", hours: "Mon–Fri 8am–5pm", lat: 34.1198, lng: -84.0058 },
  { id: "austin-north", name: "Austin North (Pflugerville)", address: "13816 Immanuel Road, Unit C/D", city: "Pflugerville", state: "TX", zip: "78660", country: "US", phone: "(512) 580-7650", hours: "Mon–Fri 7:30am–5pm", lat: 30.4340, lng: -97.6201 },
  { id: "baltimore-md", name: "Baltimore, MD", address: "7120 Golden Ring Rd., Unit 112", city: "Baltimore", state: "MD", zip: "21221", country: "US", phone: "(410) 918-0199", hours: "Mon–Fri 8am–5pm", lat: 39.3337, lng: -76.4695 },
  { id: "beltsville-md", name: "Beltsville, MD", address: "11316 Old Baltimore Pike", city: "Beltsville", state: "MD", zip: "20705", country: "US", phone: "(301) 970-9494", hours: "Mon–Fri 8am–5pm", lat: 39.0359, lng: -76.9219 },
  { id: "baton-rouge-la", name: "Baton Rouge, LA", address: "11430 Merchant Drive", city: "Baton Rouge", state: "LA", zip: "70809", country: "US", phone: "(225) 325-7320", hours: "Mon–Fri 8am–5pm", lat: 30.3738, lng: -91.0733 },
  { id: "birmingham-al", name: "Birmingham, AL", address: "4550 5th Avenue South, Bldg M3", city: "Birmingham", state: "AL", zip: "35222", country: "US", phone: "(205) 282-0360", hours: "Mon–Fri 7:30am–4:30pm", lat: 33.5108, lng: -86.7975 },
  { id: "charleston-sc", name: "Charleston, SC", address: "4204 Domino Avenue, Suite C", city: "North Charleston", state: "SC", zip: "29405", country: "US", phone: "(843) 310-4843", hours: "Mon–Fri 8am–5pm", lat: 32.8629, lng: -79.9779 },
  { id: "charlotte-nc", name: "Charlotte, NC", address: "6701 Northpark Blvd, Unit A", city: "Charlotte", state: "NC", zip: "28216", country: "US", phone: "(704) 599-3919", hours: "Mon–Fri 8am–5pm, Sat 9am–1pm", lat: 35.3148, lng: -80.8745 },
  { id: "chattanooga-tn", name: "Chattanooga, TN", address: "1701 Riverside Drive", city: "Chattanooga", state: "TN", zip: "37406", country: "US", phone: "(423) 648-0787", hours: "Mon–Fri 8am–5pm", lat: 35.0466, lng: -85.2688 },
  { id: "chicago-niles", name: "Chicago (Niles), IL", address: "6285 West Howard Street", city: "Niles", state: "IL", zip: "60714", country: "US", phone: "(847) 647-2423", hours: "Mon–Fri 8am–5pm", lat: 42.0128, lng: -87.8006 },
  { id: "chicago-villa-park", name: "Chicago (Villa Park), IL", address: "1187 N. Ellsworth Avenue", city: "Villa Park", state: "IL", zip: "60181", country: "US", phone: "(630) 516-0537", hours: "Mon–Fri 8am–5pm", lat: 41.8896, lng: -87.9769 },
  { id: "chicago-bridgeview", name: "Chicago (Bridgeview), IL", address: "7411 W. 90th St.", city: "Bridgeview", state: "IL", zip: "60455", country: "US", phone: "(708) 599-8605", hours: "Mon–Fri 7:30am–4:30pm", lat: 41.7414, lng: -87.8037 },
  { id: "chicago-cicero", name: "Chicago (Cicero), IL", address: "5819 W. Ogden Ave.", city: "Cicero", state: "IL", zip: "60804", country: "US", phone: "(708) 329-8580", hours: "Mon–Fri 8am–5pm", lat: 41.8497, lng: -87.7697 },
  { id: "cincinnati-oh", name: "Cincinnati, OH", address: "4766 Dues Dr, Unit D", city: "Cincinnati", state: "OH", zip: "45246", country: "US", phone: "(513) 942-8222", hours: "Mon–Fri 8am–5pm, Sat 8am–12pm", lat: 39.3077, lng: -84.5029 },
  { id: "cleveland-south", name: "Cleveland South (Brooklyn Heights)", address: "5399 Lancaster Drive, Unit 9", city: "Brooklyn Heights", state: "OH", zip: "44131", country: "US", phone: "(216) 369-9898", hours: "Mon–Fri 8am–5pm, Sat 10am–1pm", lat: 41.4007, lng: -81.6845 },
  { id: "cleveland-east", name: "Cleveland East (Mentor)", address: "7561 Tyler Blvd., Suite 5", city: "Mentor", state: "OH", zip: "44060", country: "US", phone: "(440) 368-5045", hours: "Mon–Fri 8am–5pm", lat: 41.6663, lng: -81.3395 },
  { id: "columbia-sc", name: "Columbia, SC", address: "1025 Dreyfuss Rd", city: "Columbia", state: "SC", zip: "29201", country: "US", phone: "(803) 470-3355", hours: "Mon–Fri 8am–5pm", lat: 33.9990, lng: -81.0299 },
  { id: "columbus-oh", name: "Columbus, OH", address: "2180 Wilson Road", city: "Columbus", state: "OH", zip: "43228", country: "US", phone: "(614) 363-1880", hours: "Mon–Fri 8am–5pm, Sat 8am–12pm", lat: 39.9554, lng: -83.1026 },
  { id: "dallas-tx", name: "Dallas, TX", address: "9140 Premier Row", city: "Dallas", state: "TX", zip: "75247", country: "US", phone: "(972) 445-2008", hours: "Mon–Fri 7:30am–5pm", lat: 32.8236, lng: -96.8870 },
  { id: "dayton-oh", name: "Dayton, OH", address: "2310 S Edwin C. Moses Blvd.", city: "Dayton", state: "OH", zip: "45417", country: "US", phone: "(937) 610-7791", hours: "Mon–Fri 8am–5pm", lat: 39.7369, lng: -84.2165 },
  { id: "akron-oh", name: "Akron (New Franklin), OH", address: "6250 Van Buren Rd", city: "New Franklin", state: "OH", zip: "44216", country: "US", phone: "(330) 800-0560", hours: "Mon–Fri 8am–5pm", lat: 40.9370, lng: -81.5777 },
  { id: "denver-commerce-city", name: "Denver (Commerce City), CO", address: "7003 East 47th Ave Drive, Suite 400", city: "Denver", state: "CO", zip: "80216", country: "US", phone: "(720) 779-0434", hours: "Mon–Fri 7:30am–4:30pm", lat: 39.7884, lng: -104.9282 },
  { id: "denver-englewood", name: "Denver (Englewood/Sheridan), CO", address: "1500 West Hampden Ave, Bldg 2, Ste A", city: "Sheridan", state: "CO", zip: "80110", country: "US", phone: "(720) 722-6317", hours: "Mon–Fri 7:30am–5pm", lat: 39.6475, lng: -105.0225 },
  { id: "colorado-springs", name: "Colorado Springs, CO", address: "4285 Sinton Rd, Ste 120", city: "Colorado Springs", state: "CO", zip: "80907", country: "US", phone: "(719) 302-3020", hours: "Mon–Fri 8am–5pm", lat: 38.9007, lng: -104.8613 },
  { id: "fort-worth-tx", name: "Fort Worth, TX", address: "5007 Martin Luther King Freeway", city: "Fort Worth", state: "TX", zip: "76119", country: "US", phone: "(817) 496-9595", hours: "Mon–Fri 7:30am–5pm", lat: 32.7007, lng: -97.2680 },
  { id: "greenville-greer", name: "Greenville/Greer (Lyman), SC", address: "203-A Inman Road", city: "Lyman", state: "SC", zip: "29365", country: "US", phone: "(864) 642-0166", hours: "Mon–Fri 8am–5pm, Sat 9am–1pm", lat: 34.7090, lng: -81.9823 },
  { id: "houston-northeast", name: "Houston NE, TX", address: "15905 Morales Road, L200", city: "Houston", state: "TX", zip: "77032", country: "US", phone: "(832) 621-0289", hours: "Mon–Fri 8am–5pm", lat: 29.9244, lng: -95.3292 },
  { id: "houston-northwest", name: "Houston NW, TX", address: "13240 Hempstead Hwy, Unit 214", city: "Houston", state: "TX", zip: "77040", country: "US", phone: "(713) 934-8528", hours: "Mon–Fri 8am–5pm", lat: 29.8585, lng: -95.5357 },
  { id: "houston-southeast", name: "Houston SE, TX", address: "9191 Winkler Drive, Suite G", city: "Houston", state: "TX", zip: "77017", country: "US", phone: "(713) 904-1720", hours: "Mon–Fri 8am–5pm", lat: 29.6893, lng: -95.2788 },
  { id: "houston-southwest", name: "Houston SW (Stafford), TX", address: "10700 Corporate Dr., Unit 118", city: "Stafford", state: "TX", zip: "77477", country: "US", phone: "(832) 939-4600", hours: "Mon–Fri 8am–5pm", lat: 29.6124, lng: -95.5773 },
  { id: "indianapolis-west", name: "Indianapolis West, IN", address: "5228 W 79th St.", city: "Indianapolis", state: "IN", zip: "46268", country: "US", phone: "(317) 584-8555", hours: "Mon–Fri 8am–5pm", lat: 39.8786, lng: -86.2416 },
  { id: "indianapolis-east", name: "Indianapolis East, IN", address: "3250 North Post Road, Suite 102", city: "Indianapolis", state: "IN", zip: "46226", country: "US", phone: "(317) 897-6330", hours: "Mon–Fri 8am–5pm", lat: 39.8337, lng: -86.0156 },
  { id: "jacksonville-fl", name: "Jacksonville, FL", address: "13913 Duval Road #300", city: "Jacksonville", state: "FL", zip: "32218", country: "US", phone: "(904) 660-0733", hours: "Mon–Fri 8am–5pm", lat: 30.4469, lng: -81.6573 },
  { id: "kansas-city-olathe", name: "Kansas City (Olathe), KS", address: "1713 E 123rd Street", city: "Olathe", state: "KS", zip: "66061", country: "US", phone: "(913) 289-0021", hours: "Mon–Fri 7:30am–4:30pm", lat: 38.8643, lng: -94.7905 },
  { id: "los-angeles-gardena", name: "Los Angeles (Gardena), CA", address: "17207 South Broadway", city: "Gardena", state: "CA", zip: "90248", country: "US", phone: "(424) 260-2848", hours: "Mon–Fri 8am–5pm", lat: 33.8899, lng: -118.3082 },
  { id: "miami-fl", name: "Miami (Hialeah), FL", address: "471 W 28th St", city: "Hialeah", state: "FL", zip: "33010", country: "US", phone: "(305) 728-0456", hours: "Mon–Fri 7:30am–4:30pm", lat: 25.8357, lng: -80.2932 },
  { id: "delray-fl", name: "Delray Beach, FL", address: "1749 N Congress Ave, Suite 5", city: "Delray Beach", state: "FL", zip: "33445", country: "US", phone: "(561) 265-4464", hours: "Mon–Fri 8am–5pm", lat: 26.4756, lng: -80.1001 },
  { id: "west-palm-beach-fl", name: "West Palm Beach, FL", address: "2001 Australian Ave, Suite 230", city: "West Palm Beach", state: "FL", zip: "33409", country: "US", phone: "(561) 296-3434", hours: "Mon–Fri 8am–5pm", lat: 26.7076, lng: -80.0700 },
  { id: "fort-lauderdale-fl", name: "Fort Lauderdale, FL", address: "3200 NW 67th Ave, Bay 6", city: "Fort Lauderdale", state: "FL", zip: "33309", country: "US", phone: "(954) 866-5390", hours: "Mon–Fri 8am–5pm", lat: 26.1861, lng: -80.2295 },
  { id: "minneapolis-roseville", name: "Minneapolis (Roseville), MN", address: "1900 Oakcrest Avenue, Suite 5", city: "Roseville", state: "MN", zip: "55113", country: "US", phone: "(651) 634-0600", hours: "Mon–Fri 8am–5pm", lat: 44.9977, lng: -93.1568 },
  { id: "nashville-tn", name: "Nashville, TN", address: "429 Enos Reed Drive", city: "Nashville", state: "TN", zip: "37210", country: "US", phone: "(615) 256-9787", hours: "Mon–Fri 7:30am–5pm", lat: 36.1327, lng: -86.7408 },
  { id: "orlando-south-fl", name: "Orlando South, FL", address: "3601 Vineland Road, Suite 5", city: "Orlando", state: "FL", zip: "32811", country: "US", phone: "(407) 316-2909", hours: "Mon–Fri 8am–5pm", lat: 28.4952, lng: -81.4416 },
  { id: "orlando-north-fl", name: "Orlando North, FL", address: "560 Wilma Street", city: "Altamonte Springs", state: "FL", zip: "32701", country: "US", phone: "(407) 772-3333", hours: "Mon–Fri 8am–5pm", lat: 28.6614, lng: -81.3651 },
  { id: "philadelphia-northeast", name: "Philadelphia NE (Bensalem), PA", address: "3161 State Rd, Unit C", city: "Bensalem", state: "PA", zip: "19020", country: "US", phone: "(215) 610-6289", hours: "Mon–Fri 8am–5pm", lat: 40.1024, lng: -74.9321 },
  { id: "phoenix-north-az", name: "Phoenix North, AZ", address: "21609 N 12th Ave, Suite 400", city: "Phoenix", state: "AZ", zip: "85027", country: "US", phone: "(623) 258-4787", hours: "Mon–Fri 8am–5pm, Sat 9am–1pm", lat: 33.6802, lng: -112.0823 },
  { id: "phoenix-east-az", name: "Phoenix East (Chandler), AZ", address: "590 N 54th St., Bldg 5, Ste 1", city: "Chandler", state: "AZ", zip: "85226", country: "US", phone: "(480) 535-9940", hours: "Mon–Fri 7am–5pm, Sat 9am–2pm", lat: 33.3612, lng: -111.9750 },
  { id: "phoenix-west-az", name: "Phoenix West, AZ", address: "4625 West McDowell Rd, Unit 140", city: "Phoenix", state: "AZ", zip: "85035", country: "US", phone: "(480) 360-3680", hours: "Mon–Fri 7am–5pm, Sat 9am–1pm", lat: 33.4756, lng: -112.1453 },
  { id: "pittsburgh-monroeville", name: "Pittsburgh (Monroeville), PA", address: "205 Seco Rd.", city: "Monroeville", state: "PA", zip: "15146", country: "US", phone: "(412) 205-0738", hours: "Mon–Fri 8am–5pm", lat: 40.4283, lng: -79.7671 },
  { id: "pittsburgh-cranberry", name: "Pittsburgh (Cranberry Twp), PA", address: "505 Thomson Park Drive", city: "Cranberry Township", state: "PA", zip: "16066", country: "US", phone: "(412) 219-2470", hours: "Mon–Fri 7:30am–4:30pm", lat: 40.6845, lng: -80.1073 },
  { id: "portland-or", name: "Portland, OR", address: "13010 NE David Circle, Suite A&B", city: "Portland", state: "OR", zip: "97230", country: "US", phone: "(503) 258-1151", hours: "Mon–Fri 8am–5pm", lat: 45.5534, lng: -122.5092 },
  { id: "raleigh-north-nc", name: "Raleigh North (Durham), NC", address: "2310 Presidential Dr. #106", city: "Durham", state: "NC", zip: "27703", country: "US", phone: "(919) 446-4445", hours: "Mon–Fri 7:30am–4:30pm", lat: 35.9940, lng: -78.8539 },
  { id: "salt-lake-city-ut", name: "Salt Lake City, UT", address: "537 W. Pickett Circle (1810 S), Suite 800", city: "Salt Lake City", state: "UT", zip: "84115", country: "US", phone: "(801) 972-5911", hours: "Mon–Fri 8am–5pm", lat: 40.7264, lng: -111.9118 },
  { id: "san-antonio-east", name: "San Antonio East, TX", address: "10602 Sentinel Drive", city: "San Antonio", state: "TX", zip: "78217", country: "US", phone: "(210) 504-4210", hours: "Mon–Fri 8am–5pm", lat: 29.5498, lng: -98.3713 },
  { id: "san-diego-south", name: "San Diego South, CA", address: "1520 Corporate Center Drive", city: "San Diego", state: "CA", zip: "92154", country: "US", phone: "(619) 816-4242", hours: "Mon–Fri 8am–5pm", lat: 32.5673, lng: -117.0263 },
  { id: "seattle-kent", name: "Seattle (Kent), WA", address: "22029-70th Avenue South", city: "Kent", state: "WA", zip: "98032", country: "US", phone: "(253) 395-1835", hours: "Mon–Fri 8am–5pm", lat: 47.4254, lng: -122.2569 },
  { id: "st-louis-olivette", name: "St. Louis (Olivette), MO", address: "9427 Dielman Rock Island Industrial Dr", city: "St. Louis", state: "MO", zip: "63132", country: "US", phone: "(314) 764-7610", hours: "Mon–Fri 7:30am–4:30pm", lat: 38.6772, lng: -90.4186 },
  { id: "st-louis-ofallon", name: "St. Louis (O'Fallon, IL)", address: "1402 Frontage Road", city: "O'Fallon", state: "IL", zip: "62269", country: "US", phone: "(618) 680-0761", hours: "Mon–Fri 8am–5pm", lat: 38.5891, lng: -89.9262 },
  { id: "tampa-fl", name: "Tampa, FL", address: "4901 W. Rio Vista Ave. Suite A", city: "Tampa", state: "FL", zip: "33634", country: "US", phone: "(813) 906-5077", hours: "Mon–Fri 8am–5pm", lat: 27.9692, lng: -82.5337 },
  { id: "tampa-east-fl", name: "Tampa East, FL", address: "4414 N. 56th Street", city: "Tampa", state: "FL", zip: "33610", country: "US", phone: "(813) 467-9916", hours: "Mon–Fri 8am–5pm", lat: 27.9902, lng: -82.4218 },
  { id: "alexandria-va", name: "Alexandria, VA", address: "6460 General Green Way", city: "Alexandria", state: "VA", zip: "22312", country: "US", phone: "(571) 895-5237", hours: "Mon–Fri 8am–5pm", lat: 38.8418, lng: -77.1479 },
  { id: "york-pa", name: "York, PA", address: "908 Roosevelt Avenue", city: "York", state: "PA", zip: "17404", country: "US", phone: "(717) 850-8532", hours: "Mon–Fri 8am–5pm", lat: 39.9682, lng: -76.7524 },
  { id: "plano-tx", name: "Plano, TX", address: "1401 Summit Ave., Unit 7", city: "Plano", state: "TX", zip: "75074", country: "US", phone: "(972) 422-5167", hours: "Mon–Fri 8am–5pm", lat: 33.0198, lng: -96.6989 },
  { id: "lewisville-tx", name: "Lewisville, TX", address: "1501 Eagle Ct., #1101", city: "Lewisville", state: "TX", zip: "75057", country: "US", phone: "(469) 830-0722", hours: "Mon–Fri 7:30am–4:30pm", lat: 33.0318, lng: -97.0092 },
  { id: "mckinney-tx", name: "McKinney, TX", address: "2140 Redbud Blvd, Suite G", city: "McKinney", state: "TX", zip: "75069", country: "US", phone: "(214) 856-2212", hours: "Mon–Fri 8am–5pm", lat: 33.1974, lng: -96.6150 },
  { id: "anchorage-ak", name: "Anchorage, AK", address: "8535 Dimond D Circle, Unit B", city: "Anchorage", state: "AK", zip: "99515", country: "US", phone: "(907) 313-3990", hours: "Mon–Fri 8am–5pm, Sat 9am–1pm", lat: 61.1344, lng: -149.9003 },
  { id: "memphis", name: "Memphis, TN", address: "6991 Appling Farms Pkwy, Suite 106", city: "Memphis", state: "TN", zip: "38133", country: "US", phone: "(901) 582-2267", hours: "Mon–Fri 8am–5pm", lat: 35.1495, lng: -90.0490 },
  { id: "new-orleans", name: "New Orleans (Elmwood), LA", address: "5820 Plauche St.", city: "Elmwood", state: "LA", zip: "70123", country: "US", phone: "(504) 315-3213", hours: "Mon–Fri 8am–5pm", lat: 29.9511, lng: -90.1300 },
  { id: "knoxville", name: "Knoxville, TN", address: "500 Milwaukee Way", city: "Knoxville", state: "TN", zip: "37932", country: "US", phone: "(865) 630-2555", hours: "Mon–Fri 8am–5pm", lat: 35.9606, lng: -84.0069 },
  { id: "louisville", name: "Louisville, KY", address: "4620 Shepherdsville Rd.", city: "Louisville", state: "KY", zip: "40218", country: "US", phone: "(502) 479-3231", hours: "Mon–Fri 8am–5pm, Sat 8am–12pm", lat: 38.2527, lng: -85.7585 },
  { id: "norfolk", name: "Norfolk, VA", address: "1135 Lance Road", city: "Norfolk", state: "VA", zip: "23502", country: "US", phone: "(757) 372-4540", hours: "Mon–Fri 8am–5pm", lat: 36.8468, lng: -76.2852 },
  { id: "omaha", name: "Omaha, NE", address: "13239 Portal Drive, Suite 105", city: "Omaha", state: "NE", zip: "68138", country: "US", phone: "(402) 205-7545", hours: "Mon–Fri 8am–5pm", lat: 41.2565, lng: -96.0587 },
  { id: "tulsa", name: "Tulsa, OK", address: "7340 E. 38th St.", city: "Tulsa", state: "OK", zip: "74145", country: "US", phone: "(918) 221-9612", hours: "Mon–Fri 7:30am–4:30pm", lat: 36.1540, lng: -95.9928 },
  { id: "wichita", name: "Wichita, KS", address: "9110 East 35th Street North, Suite B", city: "Wichita", state: "KS", zip: "67226", country: "US", phone: "(316) 217-8107", hours: "Mon–Fri 7:30am–4:30pm", lat: 37.6872, lng: -97.3301 },
  { id: "mobile", name: "Mobile (Theodore), AL", address: "5540 Hamilton Blvd", city: "Theodore", state: "AL", zip: "36582", country: "US", phone: "(251) 206-8956", hours: "Mon–Fri 8am–5pm, Sat 8am–12pm", lat: 30.5383, lng: -88.1853 },
  { id: "huntsville-al", name: "Huntsville, AL", address: "2210 Meridian Street", city: "Huntsville", state: "AL", zip: "35811", country: "US", phone: "(938) 867-4246", hours: "Mon–Fri 8am–5pm", lat: 34.7304, lng: -86.5861 },
  { id: "rockford", name: "Rockford (Loves Park), IL", address: "5107 Forest Hills Court", city: "Loves Park", state: "IL", zip: "61111", country: "US", phone: "(815) 282-6544", hours: "Mon–Fri 8am–5pm", lat: 42.3251, lng: -89.0626 },
  { id: "cedar-rapids", name: "Cedar Rapids, IA", address: "6805 4th Street SW, Suite 101", city: "Cedar Rapids", state: "IA", zip: "52404", country: "US", phone: "(319) 382-2325", hours: "Mon–Fri 8am–5pm", lat: 41.9779, lng: -91.6656 },
  { id: "fort-wayne", name: "Fort Wayne, IN", address: "5400 Distribution Dr.", city: "Fort Wayne", state: "IN", zip: "46825", country: "US", phone: "(260) 482-9000", hours: "Mon–Fri 8am–5pm", lat: 41.0799, lng: -85.1394 },
  { id: "appleton", name: "Appleton, WI", address: "1890 S Technology Drive", city: "Appleton", state: "WI", zip: "54914", country: "US", phone: "(920) 903-3515", hours: "Mon–Fri 7:30am–4:30pm", lat: 44.2619, lng: -88.4154 },
  { id: "waukesha", name: "Waukesha, WI", address: "2000 Pewaukee Road, Suite M", city: "Waukesha", state: "WI", zip: "53188", country: "US", phone: "(262) 446-1818", hours: "Mon–Fri 8am–5pm", lat: 43.0117, lng: -88.2315 },
  { id: "albany", name: "Albany, NY", address: "1054 Broadway", city: "Albany", state: "NY", zip: "12204", country: "US", phone: "(518) 435-0024", hours: "Mon–Fri 8am–5pm", lat: 42.6526, lng: -73.7562 },
  { id: "worcester", name: "Worcester (Auburn), MA", address: "7 C St., Bldg. 14B", city: "Auburn", state: "MA", zip: "01501", country: "US", phone: "(508) 233-2623", hours: "Mon–Fri 8am–5pm", lat: 42.1939, lng: -71.8494 },
  { id: "boston-north", name: "Boston North (Woburn), MA", address: "16A 6th Road", city: "Woburn", state: "MA", zip: "01801", country: "US", phone: "(781) 933-0176", hours: "Mon–Fri 8am–5pm", lat: 42.4793, lng: -71.1523 },
  { id: "bridgeport", name: "Bridgeport, CT", address: "1085 Connecticut Avenue, Unit 5E", city: "Bridgeport", state: "CT", zip: "06607", country: "US", phone: "(203) 666-8839", hours: "Mon–Fri 8am–5pm", lat: 41.1865, lng: -73.1952 },
  { id: "danbury", name: "Danbury, CT", address: "4 Lee Mac Ave.", city: "Danbury", state: "CT", zip: "06810", country: "US", phone: "(203) 293-0406", hours: "Mon–Fri 8am–5pm", lat: 41.3948, lng: -73.4540 },
  { id: "edison", name: "Edison, NJ", address: "973 New Durham Road", city: "Edison", state: "NJ", zip: "08817", country: "US", phone: "(848) 229-7900", hours: "Mon–Fri 8am–5pm", lat: 40.5187, lng: -74.4121 },
  { id: "elizabeth-nj", name: "Elizabeth, NJ", address: "606 Dowd Avenue, Unit D", city: "Elizabeth", state: "NJ", zip: "07201", country: "US", phone: "(908) 440-0791", hours: "Mon–Fri 8am–5pm", lat: 40.6640, lng: -74.2107 },
  { id: "hackensack", name: "Hackensack, NJ", address: "80 Hobart Street", city: "Hackensack", state: "NJ", zip: "07601", country: "US", phone: "(201) 957-7955", hours: "Mon–Fri 7:30am–5:30pm, Sat 9am–2pm", lat: 40.8859, lng: -74.0435 },
  { id: "warwick", name: "Warwick, RI", address: "177 Chestnut Street", city: "Warwick", state: "RI", zip: "02888", country: "US", phone: "(401) 287-7343", hours: "Mon–Fri 7:30am–4:30pm", lat: 41.7001, lng: -71.4162 },
  { id: "newport-news", name: "Newport News, VA", address: "321 Ed Wright Lane, Unit B", city: "Newport News", state: "VA", zip: "23606", country: "US", phone: "(757) 907-9979", hours: "Mon–Fri 8am–5pm", lat: 37.0871, lng: -76.4730 },
  { id: "greensboro", name: "Greensboro, NC", address: "137 S Walnut Circle", city: "Greensboro", state: "NC", zip: "27409", country: "US", phone: "(336) 265-9498", hours: "Mon–Fri 8am–5pm", lat: 36.0726, lng: -79.7920 },
  { id: "statesville", name: "Statesville, NC", address: "211 Marble Rd, Suite B", city: "Statesville", state: "NC", zip: "28625", country: "US", phone: "(704) 380-9161", hours: "Mon–Fri 8am–5pm", lat: 35.7829, lng: -80.8873 },
  { id: "lancaster-tx", name: "Lancaster, TX", address: "1500 S. I-35E, Suite 121", city: "Lancaster", state: "TX", zip: "75146", country: "US", phone: "(972) 619-5373", hours: "Mon–Fri 8am–5pm", lat: 32.5921, lng: -96.7561 },
  { id: "pittsburgh-coraopolis", name: "Pittsburgh (Coraopolis), PA", address: "308 Moon Clinton Rd, Suite 201", city: "Coraopolis", state: "PA", zip: "15108", country: "US", phone: "(412) 460-9040", hours: "Mon–Fri 7:30am–4:30pm", lat: 40.5209, lng: -80.1662 },
  { id: "everett", name: "Everett, WA", address: "715 100th St. SE, C-3", city: "Everett", state: "WA", zip: "98208", country: "US", phone: "(425) 265-1830", hours: "Mon–Fri 7am–4pm", lat: 47.9790, lng: -122.2021 },
  { id: "sarasota", name: "Sarasota, FL", address: "1195 Tallevast Road", city: "Sarasota", state: "FL", zip: "34243", country: "US", phone: "(941) 313-2590", hours: "Mon–Fri 8am–5pm", lat: 27.3364, lng: -82.5307 },
  { id: "lakeland", name: "Lakeland, FL", address: "3633 Century Blvd., Ste. 1", city: "Lakeland", state: "FL", zip: "33811", country: "US", phone: "(863) 215-6901", hours: "Mon–Fri 8am–5pm", lat: 27.9904, lng: -82.0299 },
  { id: "longmont", name: "Longmont (Mead), CO", address: "4005 South Valley Drive", city: "Mead", state: "CO", zip: "80504", country: "US", phone: "(720) 853-4393", hours: "Mon–Fri 8am–5pm", lat: 40.2338, lng: -104.9966 },
  { id: "wheat-ridge", name: "Denver (Golden/Wheat Ridge), CO", address: "765 Moss Street", city: "Golden", state: "CO", zip: "80401", country: "US", phone: "(303) 424-1030", hours: "Mon–Fri 8am–5pm", lat: 39.7555, lng: -105.2211 },
  { id: "melbourne", name: "Melbourne, FL", address: "4045 Dow Road, Suite 104", city: "Melbourne", state: "FL", zip: "32934", country: "US", phone: "(321) 378-4050", hours: "Mon–Fri 8am–5pm", lat: 28.0836, lng: -80.6081 },
  { id: "richmond", name: "Richmond, VA", address: "711 Hospital Street, Suite 21", city: "Richmond", state: "VA", zip: "23219", country: "US", phone: "(804) 977-0577", hours: "Mon–Fri 8am–5pm, Sat 8am–1pm", lat: 37.5407, lng: -77.4360 },
  { id: "ventura-county", name: "Ventura County (Newbury Park), CA", address: "2630 Lavery Court, Unit D", city: "Newbury Park", state: "CA", zip: "91320", country: "US", phone: "(805) 214-4392", hours: "Mon–Fri 8am–5pm", lat: 34.1839, lng: -118.9072 },
  // ── CANADA — scraped from metalsupermarkets.com/location/ ──────
  { id: "barrie-on", name: "Barrie, ON", address: "16 Truman Road", city: "Barrie", state: "ON", zip: "L4N 8Y8", country: "CA", phone: "(705) 792-6684", hours: "Mon–Fri 8am–5pm", lat: 44.3893, lng: -79.7028 },
  { id: "calgary-ab", name: "Calgary, AB", address: "4780 50th Avenue SE", city: "Calgary", state: "AB", zip: "T2B 3R4", country: "CA", phone: "(403) 720-2267", hours: "Mon–Fri 8am–5pm, Sat 9am–2pm", lat: 51.0353, lng: -114.0232 },
  { id: "cambridge-on", name: "Cambridge, ON", address: "1195 Franklin Boulevard, Units 3 & 4", city: "Cambridge", state: "ON", zip: "N1R 7R7", country: "CA", phone: "(519) 714-2833", hours: "Mon–Fri 8am–5pm", lat: 43.3601, lng: -80.3135 },
  { id: "don-mills-on", name: "Don Mills (North York), ON", address: "73 Railside Rd., Unit 2", city: "North York", state: "ON", zip: "M3A 1B3", country: "CA", phone: "(416) 441-2012", hours: "Mon–Fri 8am–5pm", lat: 43.7440, lng: -79.3372 },
  { id: "edmonton-west-ab", name: "Edmonton West, AB", address: "11451-156th St. NW", city: "Edmonton", state: "AB", zip: "T5M 3T2", country: "CA", phone: "(780) 454-6385", hours: "Mon–Fri 8am–5pm", lat: 53.5685, lng: -113.6256 },
  { id: "edmonton-south-ab", name: "Edmonton South, AB", address: "5204 75th St. NW", city: "Edmonton", state: "AB", zip: "T6E 6S3", country: "CA", phone: "(780) 440-1212", hours: "Mon–Fri 8am–5pm, Sat 10am–2pm", lat: 53.4833, lng: -113.4995 },
  { id: "etobicoke-on", name: "Etobicoke, ON", address: "22 Jutland Rd.", city: "Etobicoke", state: "ON", zip: "M8Z 2G9", country: "CA", phone: "(416) 201-9242", hours: "Mon–Fri 7:30am–4:30pm", lat: 43.6352, lng: -79.5299 },
  { id: "halifax-ns", name: "Halifax/Dartmouth, NS", address: "75 MacDonald Ave, Unit-5", city: "Dartmouth", state: "NS", zip: "B3B 1T8", country: "CA", phone: "(902) 700-5855", hours: "Mon–Fri 8am–5pm", lat: 44.7022, lng: -63.6138 },
  { id: "hamilton-on", name: "Hamilton, ON", address: "735 South Service Rd., Unit 1", city: "Hamilton", state: "ON", zip: "L8E 5Z2", country: "CA", phone: "(905) 643-5387", hours: "Mon–Fri 8am–5pm", lat: 43.2276, lng: -79.7536 },
  { id: "kelowna-bc", name: "Kelowna, BC", address: "104-2350 Acland Road", city: "Kelowna", state: "BC", zip: "V1X 6N6", country: "CA", phone: "(236) 361-0310", hours: "Mon–Fri 8am–5pm, Sat 9am–1pm", lat: 49.9011, lng: -119.3961 },
  { id: "kitchener-on", name: "Kitchener/Waterloo, ON", address: "5 Forwell Rd., Unit 4", city: "Kitchener", state: "ON", zip: "N2B 1W3", country: "CA", phone: "(519) 742-8411", hours: "Mon–Fri 8am–5pm", lat: 43.4562, lng: -80.4710 },
  { id: "london-on", name: "London, ON", address: "2100 Oxford Street E., Unit 33", city: "London", state: "ON", zip: "N5V 4A4", country: "CA", phone: "(519) 659-1212", hours: "Mon–Fri 8am–5pm", lat: 43.0055, lng: -81.1777 },
  { id: "mississauga-on", name: "Mississauga, ON", address: "1445 Bonhill Rd., Unit 21", city: "Mississauga", state: "ON", zip: "L5T 1V3", country: "CA", phone: "(905) 670-9555", hours: "Mon–Fri 7:30am–5pm", lat: 43.6431, lng: -79.6413 },
  { id: "nanaimo-bc", name: "Nanaimo, BC", address: "2266 McGarrigle Rd., Unit 1", city: "Nanaimo", state: "BC", zip: "V9S 4M6", country: "CA", phone: "(250) 751-2323", hours: "Mon–Fri 8am–5pm", lat: 49.1534, lng: -123.9826 },
  { id: "niagara-on", name: "Niagara (St. Catharines), ON", address: "113 Cushman Rd, Unit 43", city: "St. Catharines", state: "ON", zip: "L2M 6S9", country: "CA", phone: "(905) 687-8808", hours: "Mon–Fri 8am–5pm", lat: 43.1778, lng: -79.2306 },
  { id: "oakville-on", name: "Oakville, ON", address: "1290 Speers Rd, Unit 4", city: "Oakville", state: "ON", zip: "L6L 2X4", country: "CA", phone: "(905) 847-1911", hours: "Mon–Fri 8am–5pm", lat: 43.4043, lng: -79.6989 },
  { id: "ottawa-on", name: "Ottawa, ON", address: "2275 Stevenage Dr. Unit 1", city: "Ottawa", state: "ON", zip: "K1G 3W1", country: "CA", phone: "(613) 519-9303", hours: "Mon–Fri 8am–5pm", lat: 45.3972, lng: -75.6436 },
  { id: "saskatoon-sk", name: "Saskatoon, SK", address: "517 42nd A Street East", city: "Saskatoon", state: "SK", zip: "S7K 0V4", country: "CA", phone: "(639) 638-3555", hours: "Mon–Fri 8am–5pm, Sat 10am–2pm", lat: 52.1422, lng: -106.5834 },
  { id: "scarborough-on", name: "Scarborough, ON", address: "45 Ironside Crescent, Unit 12", city: "Scarborough", state: "ON", zip: "M1X 1N3", country: "CA", phone: "(416) 293-9550", hours: "Mon–Fri 7:30am–5pm", lat: 43.8023, lng: -79.2273 },
  { id: "vancouver-burnaby", name: "Vancouver (Burnaby), BC", address: "7755 Venture Street", city: "Burnaby", state: "BC", zip: "V5A 1T9", country: "CA", phone: "(604) 293-1231", hours: "Mon–Fri 8am–5pm, Sat 9am–3pm", lat: 49.2611, lng: -122.9434 },
  { id: "vancouver-langley", name: "Vancouver (Langley), BC", address: "20059 92A Avenue, Unit 3", city: "Langley", state: "BC", zip: "V1M 3A5", country: "CA", phone: "(604) 513-9850", hours: "Mon–Fri 8am–5pm, Sat 9am–3pm", lat: 49.1710, lng: -122.6703 },
  { id: "vancouver-richmond", name: "Vancouver (Richmond), BC", address: "14271 Knox Way, Unit 140", city: "Richmond", state: "BC", zip: "V6V 2Z4", country: "CA", phone: "(604) 821-1142", hours: "Mon–Fri 8am–5pm", lat: 49.1877, lng: -123.1344 },
  { id: "vaughan-on", name: "Vaughan, ON", address: "100 Haist Ave, Unit B", city: "Vaughan", state: "ON", zip: "L4L 5V4", country: "CA", phone: "(905) 851-0173", hours: "Mon–Fri 8am–5pm", lat: 43.7894, lng: -79.5864 },
  { id: "victoria-bc", name: "Victoria (Saanichton), BC", address: "2111 Keating Cross Road", city: "Saanichton", state: "BC", zip: "V8M 2A5", country: "CA", phone: "(250) 544-4000", hours: "Mon–Fri 8am–5pm", lat: 48.5963, lng: -123.4095 },
  { id: "windsor-on", name: "Windsor, ON", address: "2841 Walker Road", city: "Windsor", state: "ON", zip: "N8W 3R2", country: "CA", phone: "(519) 800-0189", hours: "Mon–Fri 7:30am–4:30pm, Sat 8am–12pm", lat: 42.3026, lng: -83.0110 },
  { id: "winnipeg-mb", name: "Winnipeg, MB", address: "1678 Church Avenue", city: "Winnipeg", state: "MB", zip: "R2X 2W9", country: "CA", phone: "(204) 480-8034", hours: "Mon–Fri 8am–5pm, Sat 9am–1pm", lat: 49.9276, lng: -97.1651 },
  // ── UNITED KINGDOM — scraped from metalsupermarkets.co.uk ──────
  { id: "uk-leeds", name: "Leeds (Morley), UK", address: "Unit 4 Overland Trading Estate, Gelderd Rd", city: "Morley", state: "West Yorkshire", zip: "LS27 7JN", country: "UK", phone: "0113 238 0900", hours: "Mon–Fri 7am–5pm, Sat 8am–12pm", lat: 53.7479, lng: -1.6022 },
  { id: "uk-glasgow", name: "Glasgow (Govan), UK", address: "Unit 2, Moorpark Industrial Estate, Broomloan Road", city: "Glasgow", state: "Scotland", zip: "G51 2HF", country: "UK", phone: "0141 440 1300", hours: "Mon–Fri 8am–5pm", lat: 55.8614, lng: -4.3228 },
  { id: "uk-london-greenwich", name: "London (Greenwich), UK", address: "Unit 8, Lombard Trading Estate, 51 Anchor and Hope Lane", city: "London", state: "England", zip: "SE7 7SN", country: "UK", phone: "020 8049 3298", hours: "Mon–Fri 8am–5pm", lat: 51.4868, lng: 0.0636 },
  { id: "uk-london-park-royal", name: "London (Park Royal), UK", address: "Units 10 & 11 Hanover West Industrial Estate, 161 Acton Lane", city: "London", state: "England", zip: "NW10 7NB", country: "UK", phone: "020 8961 1414", hours: "Mon–Fri 7am–5pm, Sat 8am–12pm", lat: 51.5329, lng: -0.2681 },
  { id: "uk-manchester", name: "Manchester (Trafford Park), UK", address: "Unit 1 Harp Trading Estate, Guinness Road, Trafford Park", city: "Manchester", state: "England", zip: "M17 1SR", country: "UK", phone: "0161 518 9370", hours: "Mon–Fri 7am–5pm, Sat 8am–12pm", lat: 53.4652, lng: -2.3014 },
  { id: "uk-gateshead", name: "Gateshead (Team Valley), UK", address: "269D Queensway South, Team Valley Trading Estate", city: "Gateshead", state: "England", zip: "NE11 0SD", country: "UK", phone: "0191 487 2144", hours: "Mon–Fri 7am–5pm, Sat 8am–12pm", lat: 54.9329, lng: -1.6020 },
  { id: "uk-southampton", name: "Southampton, UK", address: "Unit 16, Mount Pleasant Industrial Estate, Mount Pleasant Road", city: "Southampton", state: "England", zip: "SO14 0SP", country: "UK", phone: "023 8022 0999", hours: "Mon–Fri 7am–5pm, Sat 8am–12pm", lat: 50.9097, lng: -1.4044 },
  { id: "uk-west-bromwich", name: "West Bromwich, UK", address: "37 Kelvin Way Trading Estate", city: "West Bromwich", state: "England", zip: "B70 7TP", country: "UK", phone: "0121 553 4424", hours: "Mon–Fri 7am–5pm", lat: 52.5191, lng: -2.0028 },
];

const countryLabels: Record<string, string> = { US: "United States", CA: "Canada", UK: "United Kingdom" };
const countryFlags: Record<string, string> = { US: "🇺🇸", CA: "🇨🇦", UK: "🇬🇧" };

export default function StoreLocator() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | "US" | "CA" | "UK">("ALL");
  const [selected, setSelected] = useState<Store | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return stores.filter((s) => {
      const matchesCountry = filter === "ALL" || s.country === filter;
      const matchesSearch =
        !q ||
        s.city.toLowerCase().includes(q) ||
        s.state.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.zip.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q);
      return matchesCountry && matchesSearch;
    });
  }, [search, filter]);

  const grouped = useMemo(() => {
    const g: Record<string, Store[]> = {};
    filtered.forEach((s) => {
      if (!g[s.country]) g[s.country] = [];
      g[s.country].push(s);
    });
    return g;
  }, [filtered]);

  const counts = useMemo(
    () => ({ ALL: stores.length, US: stores.filter((s) => s.country === "US").length, CA: stores.filter((s) => s.country === "CA").length, UK: stores.filter((s) => s.country === "UK").length }),
    []
  );

  return (
    <div className="locator-root">
      {/* ── Search + Filter Bar ── */}
      <div className="locator-bar">
        <div className="locator-search-wrap">
          <Search size={16} className="locator-search-icon" />
          <input
            type="text"
            placeholder="Search by city, state, or zip code..."
            className="locator-search"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setSelected(null); }}
          />
          {search && (
            <button className="locator-search-clear" onClick={() => setSearch("")}>×</button>
          )}
        </div>
        <div className="locator-filters">
          {(["ALL", "US", "CA", "UK"] as const).map((c) => (
            <button
              key={c}
              className={`locator-filter-btn${filter === c ? " active" : ""}`}
              onClick={() => { setFilter(c); setSelected(null); }}
            >
              {c !== "ALL" && <span>{countryFlags[c]}</span>}
              {c === "ALL" ? `All (${counts.ALL})` : `${countryLabels[c]} (${counts[c]})`}
            </button>
          ))}
        </div>
      </div>

      {/* ── Result count ── */}
      <div className="locator-count">
        <span className="locator-count-num">{filtered.length}</span>
        {" "}store{filtered.length !== 1 ? "s" : ""} found
        {search && <span className="locator-count-q"> for "<strong>{search}</strong>"</span>}
      </div>

      {/* ── Results ── */}
      {filtered.length === 0 ? (
        <div className="locator-empty">
          <MapPin size={40} />
          <p>No stores found for "<strong>{search}</strong>"</p>
          <p className="locator-empty-sub">Try searching for a nearby city or browse all locations.</p>
          <button className="btn btn-outline" onClick={() => { setSearch(""); setFilter("ALL"); }}>
            Clear Search
          </button>
        </div>
      ) : (
        Object.keys(grouped).sort().map((country) => (
          <div key={country} className="locator-group">
            <div className="locator-group-header">
              <span className="locator-group-flag">{countryFlags[country]}</span>
              <span className="locator-group-name">{countryLabels[country]}</span>
              <span className="locator-group-count">{grouped[country].length} locations</span>
            </div>
            <div className="locator-grid">
              {grouped[country].map((store) => (
                <button
                  key={store.id}
                  className={`store-card${selected?.id === store.id ? " store-card--selected" : ""}`}
                  onClick={() => setSelected(selected?.id === store.id ? null : store)}
                >
                  <div className="store-card-top">
                    <div className="store-card-icon">
                      <MapPin size={16} />
                    </div>
                    <div className="store-card-name">{store.name}</div>
                    <ChevronRight size={14} className="store-card-arrow" />
                  </div>

                  <div className="store-card-addr">{store.address}</div>
                  <div className="store-card-city">{store.city}, {store.state} {store.zip}</div>

                  {selected?.id === store.id && (
                    <div className="store-card-expanded">
                      <div className="store-detail-row">
                        <Phone size={13} />
                        <a href={`tel:${store.phone.replace(/\D/g, "")}`} className="store-detail-link">{store.phone}</a>
                      </div>
                      <div className="store-detail-row">
                        <Clock size={13} />
                        <span>{store.hours}</span>
                      </div>
                      <div className="store-card-actions">
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(store.address + ", " + store.city + ", " + store.state)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="store-action-btn store-action-btn--map"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Navigation size={13} /> Get Directions
                        </a>
                        <a
                          href={`tel:${store.phone.replace(/\D/g, "")}`}
                          className="store-action-btn store-action-btn--call"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Phone size={13} /> Call Store
                        </a>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))
      )}

      <style>{`
        .locator-root {
          width: 100%;
        }

        /* Search bar */
        .locator-bar {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 24px;
          align-items: flex-start;
        }

        .locator-search-wrap {
          position: relative;
          flex: 1;
          min-width: 280px;
        }

        .locator-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }

        .locator-search {
          width: 100%;
          background: var(--surface-2);
          border: 1px solid var(--border-light);
          color: var(--text-primary);
          font-family: var(--font-light);
          font-size: 14px;
          padding: 14px 40px 14px 42px;
          outline: none;
          transition: border-color 0.2s;
          border-radius: 2px;
        }

        .locator-search::placeholder { color: var(--text-muted); }
        .locator-search:focus { border-color: var(--blue); }

        .locator-search-clear {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 18px;
          line-height: 1;
          padding: 4px;
          transition: color 0.2s;
        }
        .locator-search-clear:hover { color: var(--text-primary); }

        /* Filters */
        .locator-filters {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .locator-filter-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 10px 16px;
          border: 1px solid var(--border-light);
          color: var(--text-secondary);
          background: var(--surface-2);
          border-radius: 2px;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .locator-filter-btn:hover {
          border-color: var(--blue);
          color: var(--blue-light);
        }

        .locator-filter-btn.active {
          background: var(--blue);
          border-color: var(--blue);
          color: white;
        }

        /* Count */
        .locator-count {
          font-family: var(--font-light);
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 32px;
        }

        .locator-count-num {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 16px;
          color: var(--blue-light);
        }

        .locator-count-q strong { color: var(--text-secondary); }

        /* Empty state */
        .locator-empty {
          text-align: center;
          padding: 80px 20px;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .locator-empty svg { opacity: 0.3; }
        .locator-empty p { font-family: var(--font-light); font-size: 15px; }
        .locator-empty-sub { font-size: 13px; }

        /* Group */
        .locator-group {
          margin-bottom: 48px;
        }

        .locator-group-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }

        .locator-group-flag { font-size: 20px; }

        .locator-group-name {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 18px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-primary);
          flex: 1;
        }

        .locator-group-count {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--blue-light);
          background: rgba(21,101,192,0.1);
          padding: 4px 10px;
          border: 1px solid rgba(21,101,192,0.2);
          border-radius: 2px;
        }

        /* Grid */
        .locator-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2px;
        }

        /* Store card */
        .store-card {
          text-align: left;
          background: var(--surface-1);
          border: 1px solid var(--border);
          padding: 20px;
          cursor: pointer;
          transition: all 0.2s var(--ease);
          width: 100%;
        }

        .store-card:hover {
          background: var(--surface-2);
          border-color: var(--border-light);
        }

        .store-card--selected {
          background: var(--surface-2);
          border-color: var(--blue) !important;
          border-left: 3px solid var(--blue);
        }

        .store-card-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .store-card-icon {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(21,101,192,0.1);
          border: 1px solid rgba(21,101,192,0.2);
          color: var(--blue);
          flex-shrink: 0;
          border-radius: 2px;
          transition: all 0.2s;
        }

        .store-card:hover .store-card-icon,
        .store-card--selected .store-card-icon {
          background: rgba(21,101,192,0.2);
          border-color: var(--blue);
        }

        .store-card-name {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-primary);
          flex: 1;
        }

        .store-card-arrow {
          color: var(--border-light);
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .store-card--selected .store-card-arrow {
          color: var(--blue);
          transform: rotate(90deg);
        }

        .store-card-addr {
          font-family: var(--font-light);
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 2px;
        }

        .store-card-city {
          font-family: var(--font-light);
          font-size: 11px;
          color: var(--text-muted);
        }

        /* Expanded state */
        .store-card-expanded {
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .store-detail-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-light);
          font-size: 12px;
          color: var(--text-secondary);
        }

        .store-detail-row svg { color: var(--blue); flex-shrink: 0; }

        .store-detail-link {
          color: var(--blue-light);
          text-decoration: none;
          transition: color 0.15s;
        }
        .store-detail-link:hover { color: white; }

        .store-card-actions {
          display: flex;
          gap: 8px;
          margin-top: 8px;
          flex-wrap: wrap;
        }

        .store-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 7px 12px;
          border-radius: 2px;
          text-decoration: none;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .store-action-btn--map {
          background: var(--blue);
          color: white;
        }
        .store-action-btn--map:hover { background: var(--blue-dark); }

        .store-action-btn--call {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border-light);
        }
        .store-action-btn--call:hover { border-color: var(--blue); color: var(--blue-light); }

        @media (max-width: 768px) {
          .locator-grid { grid-template-columns: 1fr; }
          .locator-bar { flex-direction: column; }
          .locator-search-wrap { min-width: 0; }
          .locator-filter-btn { font-size: 11px; padding: 8px 12px; }
        }
      `}</style>
    </div>
  );
}
