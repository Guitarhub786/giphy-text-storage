// BROWSER REFRESH: Confirms if API is still live (Optional)
console.log("A PEA EYE");
console.log(localStorage.getItem("myApiKey"));
document.getElementById("confirm").innerHTML = localStorage.getItem("myApiKey")

// API Setup
function userItem() {
  userApiKey = prompt("Enter API Key:");
  localStorage.setItem("myApiKey", userApiKey)

  let displayApi = localStorage.getItem("myApiKey")
  document.getElementById("confirm").innerHTML = `-->${displayApi}<--${displayApi.length}`
  console.log(localStorage.getItem("myApiKey"));
}

function deleteItem() {
  userApiKey = ""
  localStorage.setItem("myApiKey", "")

  let displayApi = localStorage.getItem("myApiKey")
  document.getElementById("confirm").innerHTML = `-->${displayApi}<--${displayApi.length}`
}


// MAIN PROGRAM

let button = document.querySelector("#getData")
let message = document.querySelector("#message")
document.querySelector("#message").innerHTML = "Type in your message: "

let input = document.getElementById("input");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("getData").click();
  }
});

button.addEventListener("click", () => {
  parseText()
})


function parseText() {
  const count = 0;
  const rnd = Math.random()
  let ping = Math.round(rnd * count)
  const count2 = 20;
  const rnd2 = Math.random()
  let ping2 = Math.round(rnd2 * count2)

  let collection = []
  let userInput = document.querySelector("#input").value
  let parse = userInput.split(" ")

  // API_KEY
  // const API_KEY = "Enter API KEY here" // classic system
  const API_KEY = localStorage.getItem("myApiKey") // replaced by storage system


  for (let i = 0; i < parse.length; i++) {
    let uber = fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${parse[i]}&limit=${count + 1}&offset=${ping2}&rating=G&lang=en`);


    uber
      .then(data => data.json())
      .then(data => {
        console.log(data)
        console.log(data.pagination.count)

        if (data.pagination.count === 0) {
          let log = `[Try again!] Could not find a match! count = ${data.pagination.count}`
          //document.querySelector("#message").innerHTML = log
          console.log(log)
        } else {
          log = `[Found pictures] I will send them now. count =  ${data.pagination.count}`
          //document.querySelector("#message").innerHTML = log
          console.log("PASSED", log)
          console.log("PASSED", parse[i])

          collection.push(`<div id="container">`)
          collection.push(`<h1 id="usertext">${parse[i]}</h1>`)
          collection.push(`<img src="${data.data[ping].images.original.url}" alt="missing image">`)


          document.querySelector("#wrapper").innerHTML = collection.join(" ")
          console.log("Collection", collection)

        }
      })
  }
}
