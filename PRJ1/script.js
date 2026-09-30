window.addEventListener('load', function () {
    console.log('page is loaded');

    let ct = new Date().toLocaleTimeString();
    console.log(ct);
    let ctz = Intl.DateTimeFormat().resolvedOptions().timeZone
    console.log(ctz);

    // console.log(Date());

    let nameElement1 = document.getElementById('CTtime');
    nameElement1.innerHTML = ct;
    let nameElement2 = document.getElementById('CTtz');
    nameElement2.innerHTML = ctz;

    // fetch json file
    fetch('timezones.json')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            console.log(data.timezones[5].name)

            generateTable(data);
        })

        .catch(error => {
            console.log('Error!!!' + error)
        })

})



function generateTable(data) {

    const tbody = document.getElementById("tbody");

    //  for loop to generate data into html? 
    for (let i = 0; i < data.timezones.length; i++) {

        //create tr's 
        let newRow = document.createElement("tr");

        //create and generate table headers
        let newHeader = document.createElement("th");
        let newHeaderContent = document.createTextNode(data.timezones[i].name);
        newHeader.appendChild(newHeaderContent);

        //Offset Data 
        let newTData1 = document.createElement("td");
        let newTData1Content = document.createTextNode(data.timezones[i].utc_offset)
        newTData1.appendChild(newTData1Content);

        //DST Data 
        let newTData2 = document.createElement("td");
        let newTData2Content = document.createTextNode(data.timezones[i].dst_offset)
        newTData2.appendChild(newTData2Content);

        //ID Data
        let newTData3 = document.createElement("td");
        let newTData3Content = document.createTextNode(data.timezones[i].id);
        newTData3.appendChild(newTData3Content);

        //Region Data
        let newTData4 = document.createElement("td");
        let newTData4Content = document.createTextNode(data.timezones[i].region);
        newTData4.appendChild(newTData4Content);

        //push data into table -got help from MZ reference and gemini! 
        newRow.appendChild(newHeader);
        newRow.appendChild(newTData1);
        newRow.appendChild(newTData2);
        newRow.appendChild(newTData3);
        newRow.appendChild(newTData4);

        tbody.appendChild(newRow);

        // let nameTimezone = document.createElement("th");
        // nameTimezone.innerHTML = data.timezones[i].name
    } // end major for loop


}
