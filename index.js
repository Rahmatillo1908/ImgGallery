const apiKey = "wC6RmE5zPz24E2StI7QYvFdUyIuKoaAzfYOiTMNecodhxQuc6O04rOuc"
const input = document.querySelector(".input")
const button = document.querySelector(".button")
let searchText = ""
let search = false
async function func() {
    const data = await fetch(`https://api.pexels.com/v1/curated`, {
        method: "GET",
        headers: {
            Accept: `application/json`,
            Authorization: apiKey
        }
    })
    const response = await data.json();
    displayImages(response)

}
function displayImages(response) {
    response.photos.forEach((image) => {
        const photo = document.createElement("div")
        photo.innerHTML =
            `<a href=${image.src.large}>
        <img src=${image.src.large}/>
             </a>
        <figcaption style="color:${image.avg_color} ">📷: ${image.photographer}</figcaption>
        `
        document.querySelector(".displayImage").appendChild(photo)
       
    });
}
async function searchPhoto(query) {
    const data = await fetch(`https://api.pexels.com/v1/search?query=${query}`,
        {                     
            method: "GET",
            headers: {
                Accept: `application/json`,
                Authorization: apiKey
            }
        })
    const response = await data.json()
    displayImages(response)
}
input.addEventListener("input", (e) => {
    e.preventDefault();
    searchText = e.target.value;
})
button.addEventListener("click", (e) => {
    if (input.value === "") {
        alert("Please select")
    }else {

        clear()
        search = true
        searchPhoto(searchText)
    }
})
function clear() {
    document.querySelector(".displayImage").innerHTML = ""
}
func();