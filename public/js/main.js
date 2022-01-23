const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city_name");

const temp_real_val = document.getElementById("temp_real_val");
const temp_status = document.getElementById("temp_status");

const datahide = document.querySelector(".middle_layer");

const getInfo = async(event) => {
    event.preventDefault();
    let cityval = cityName.value;

    if (cityval === "") {
        city_name.innerHTML = `Please write the name before search`;
        datahide.classList.add("data_hide");

    }
    else {
        try{
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=060cb554e24821bc252ed85918c68e54`;
        const response = await fetch(url);
        const data  = await response.json();
        const arrdata = [data];

        city_name.innerHTML = `${arrdata[0].name}, ${arrdata[0].sys.country}`;
        temp_real_val.innerHTML = arrdata[0].main.temp;
        // temp_status.innerHTML = arrdata[0].weather[0].main;
        const tempMood = arrdata[0].weather[0].main;

        // condition to check sunny or cloudy
        if(tempMood == "Clear"){
            temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
        }else if(tempMood == "Clouds"){
            temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>"
        }
        else if(tempMood == "Rain"){
            temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>"
        }
        else{
            temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>"
        }
        datahide.classList.remove("data_hide");


        }catch{
            city_name.innerHTML = `Please enter the city name properly `;
            datahide.classList.add("data_hide");

        }
        
    }
}

submitBtn.addEventListener("click", getInfo);


