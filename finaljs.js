// JS file to handle the 3 different API's & loading data to site
const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

// API's to pull from. Meals/Quotes from James Clear/Random Activities
var mealurl = 'https://www.themealdb.com/api/json/v1/1/random.php'
var jamesurl = 'https://www.jcquotes.com/api/quotes/random'
var randomurl = 'https://www.boredapi.com/api/activity/'

var quoteCount = 0;
var activityCount = 0;

// First API call, I used Fetch API to gather the resources from themealdb.com API
function generateMeal() {
  fetch(mealurl).then(response => response.json()
  ).then(data => displayDish(data));

  function displayDish(data){
    const json = data;
    var stringify = JSON.stringify(json);
    const mealname = JSON.parse(stringify);
    document.getElementById("Dish").innerHTML = mealname["meals"][0]["strMeal"];
    document.getElementById("Food_Image").src = mealname["meals"][0]["strMealThumb"];
    document.getElementById("Category").innerHTML = "Category: " + mealname["meals"][0]["strCategory"];
    document.getElementById("Area").innerHTML = "Origin: " + mealname["meals"][0]["strArea"];
    document.getElementById("Link").innerHTML = "Recipe Link";
    document.getElementById("Link").href = mealname["meals"][0]["strSource"];
  }
}

// To my understanding, fetch isn't necessarily AJAX, so I utilized XMLHttpRequests for the latter
function generateQuote() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', jamesurl, true);
  xhr.send();
  xhr.addEventListener('load', function(){
    let data = JSON.parse(xhr.responseText);
    let quoteParsed = data["text"];
    document.getElementById("quote").innerHTML += quoteParsed;
    document.getElementById("quote").innerHTML += "<br><br>";
    if (quoteCount > 5)
    {
      document.getElementById("quote").innerHTML = "";
      quoteCount = 0;
    }
    quoteCount++;
  })
}

// Weird side note. This function worked on my end, yet lost its functionality
// when posted onto github...
function generateActivity() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', randomurl, true);
  xhr.send();
  xhr.addEventListener('load', function(){
    let data = JSON.parse(xhr.responseText);
    let activity = data["activity"]
    document.getElementById("inspired").innerHTML += activity;
    document.getElementById("inspired").innerHTML += "<br><br>";
    if (activityCount > 5)
    {
      document.getElementById("inspired").innerHTML = "";
      activityCount = 0;
    }
    activityCount++;
  })
}