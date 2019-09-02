window.addEventListener('load', ()=> {
    let long;
    let lat;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'http://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/88a153bc35af430b22738aca702b4fe8/${lat},${long}`;
           
            fetch(api)
              .then(Response => {
                  return Response.json();
              })
              .then(data => {
                //   console.log(data);
                  const { temperature, summary, icon} = data.currently;
                    //set Dom Elements from the Api
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent= data.timezone;
                    // Formula for celsius

                    let celsius = (temperature -32) * (5 /9);

                    //set Icon
                    setIcons(icon, document.querySelector('.icon'));
                    
                    //change temperature to Fahrenheit/Celsius
                    temperatureSection.addEventListener('click', ()=> {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });

    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color : "white"});
        const currentIcon = icon.replace(/-/g, "_" ).toUpperCase();
        skycons.play();
        return skycons.set(iconID, skycons[currentIcon]);
    }
});