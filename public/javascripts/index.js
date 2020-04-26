$(document).ready(()=>{
    var slider = document.getElementById("Range");
    var output = document.getElementById("bells");
    output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
        output.innerHTML = this.value;
    }

});