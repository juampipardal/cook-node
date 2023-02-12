export function distanceToUS(lat: number, lon: number): number {

    const usLat = 40.730610;
    const usLon = -73.935242;

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat-usLat);  // deg2rad below
    var dLon = deg2rad(lon-usLon); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(usLat)) * Math.cos(deg2rad(lat)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180);
  }