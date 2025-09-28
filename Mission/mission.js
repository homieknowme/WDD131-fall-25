
const themeSelector = document.querySelector("#themeSelector");
const body = document.body; 
const logoImage = document.querySelector("footer #logo img"); 


function changeTheme() {
    
    if (themeSelector.value === "dark") {
        
        body.classList.add("dark");

        logoImage.src = "byui-logo_white.png";
        
    } else {
       
        body.classList.remove("dark");

        logoImage.src = "byui-logo_blue.webp";
    
    }
}


themeSelector.addEventListener('change', changeTheme);