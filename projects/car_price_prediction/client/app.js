
function getRadioValueByName(name) {
    var uiLeather = document.getElementsByName(name)
    for (let i in uiLeather) {
        if(uiLeather[i].checked) {
            return parseInt(uiLeather[i].value);
        }
    }
}

function onClickedEstimatePrice() {
    console.log('Estimate price button clicked.'); 
    var levy_in = 1500; 
    var leather_in = getRadioValueByName('uiLeather'); 
    var manufacturer_in = document.getElementById('uiManufacturer').value; 
    var category_in = document.getElementById('uiCategory').value; 
    var gearbox_in = document.getElementById('uiGearbox').value; 
    var age_in = document.getElementById('uiAge').value; 
    var airbags_in = document.getElementById('uiAirbag').value; 

    var mileage_in = document.getElementById('uiMileage').value; 
    mileage_in = milesToKm(mileage_in); 

    var estPrice = document.getElementById('uiEstimatedPrice')

    console.log(
        levy_in + ' ' +
        leather_in + ' ' + 
        manufacturer_in + ' ' + 
        category_in + ' ' + 
        gearbox_in + ' ' + 
        mileage_in + ' ' + 
        age_in + ' ' + 
        airbags_in + ' '
    )
    var url = 'https://ki3n98.pythonanywhere.com/predict_car_price'; 
    $.post(url, {
        levy: levy_in, 
        manufacture: manufacturer_in,
        category: category_in,
        leather_interior: leather_in, 
        mileage: mileage_in, 
        gear_box: gearbox_in, 
        airbags: airbags_in, 
        age: age_in
    }, function (data, status) {
        console.log('est price: ' + data.estimated_price); 
        estPrice.innerHTML = "<h2>$" + data.estimated_price.toString() + "</h2>"; 
    });

}

function milesToKm(miles) {
    return miles * 1.609347; 
}


//When page load
function onPageLoad(){
    console.log('document loaded');
    
    var manufacturer_url = 'https://ki3n98.pythonanywhere.com/get_manufacturer_name';
    generateOption(manufacturer_url,'#uiManufacturer'); 

    var category_url = 'https://ki3n98.pythonanywhere.com/get_category';
    generateOption(category_url,'#uiCategory'); 

    var gearbox_url = 'https://ki3n98.pythonanywhere.com/get_gearbox';
    generateOption(gearbox_url,'#uiGearbox'); 

}

function generateOption(url, id) {
    $.get(url, function(data){
        console.log('Got response for ' + id + ' request'); 
        if  (data) {
            var manufacturers = data.sort();
            $(id).empty(); 
            fillOptions(id,manufacturers)
        }
    })
}

function fillOptions(id, list) {
    for (var i in list) {
        var opt = new Option(capitalize(list[i])); 
        $(id).append(opt); 
    }
}

function capitalize(string) {
    strArr = string.split(" "); 
    outPut = ""; 
    for (var i in strArr) {
        outPut += strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1).toLowerCase();

        if (i <= strArr.length) {
            outPut += " "; 
        }
    }
    return outPut;
}


window.onload = onPageLoad; 

/*
for (var i in manufacturers) {
    var opt = new Option(capitalize(manufacturers[i])); 
    $('#uiManufacturer').append(opt); 
} 
*/
