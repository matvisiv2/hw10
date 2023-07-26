function changeLocation() {
  document.getElementById("#location").innerHTML = document.getElementById("#form__location").value;
}


function getCities() {
  const searchText = document.getElementById("#form__location").value;
  if (searchText.length > 2) {
    const requestOptions = {
      method: 'GET',
    };
    fetch(`https://calc.ukrposhta.ua/endpoints-for-apps/index.php?method=get_city_by_region_id_and_district_id_and_city_ua&city_ua=${searchText}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        const citiesNode = document.getElementById("#cities");
        citiesNode.innerHTML = '';
        result.Entry.map(item => citiesNode.appendChild(new Option(item.CITY_UA, item.CITY_UA)));
      })
      .catch(error => console.log(error));
  }
}