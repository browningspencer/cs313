var localRecipes = [];
var recipeToEdit = "";

//var x = document.getElementById("myForm").elements.namedItem("fname").value;
//document.getElementById("demo").innerHTML = x;

function saveData() {
  var name = document.getElementById("add").elements.namedItem("name").value;
  var ingredients = document.getElementById("add").elements.namedItem("ingredients").value;
  var directions = document.getElementById("add").elements.namedItem("directions").value;

  var recipeSpecs = {name: name, ingredients: ingredients, directions: directions};
  console.log("check Local Storage");
  if (document.getElementById('savedRecipes')) {
    document.getElementById('savedRecipes').innerHTML = "";
  }
  var recipeArray = [];
  if (localStorage.getItem("localRecipes")) {
    console.log('There is an item called "localRecipes" ');
    recipeArray = localStorage.getItem("localRecipes");
    recipeArray = JSON.parse(recipeArray);
    for (var i = 0; i <= recipeArray.length; i++) {
      if (recipeArray[i] == name) {
        console.log(recipeArray[i] + " exists in the array, and the variable is : " + name);
        alert(name + " has already been saved");
        break;
      }
      if (i == recipeArray.length) {
        console.log(name + " will be added to the array, and does not match recipearray[i]");
        recipeArray.push(name);
        localStorage.setItem(name, JSON.stringify(recipeSpecs));
        localStorage.setItem("localRecipes", JSON.stringify(recipeArray));
        break;
      }
    }
  } else {
    recipeArray = [name];
    localStorage.setItem("localRecipes", JSON.stringify(recipeArray));
    localStorage.setItem(name, JSON.stringify(recipeSpecs));
  }

  getData();
}


function getData() {
  if (localStorage.getItem("localRecipes")) {
    //var welcome = document.getElementById('welcome');
    //welcome.innerHTML = "";
    var recipeArray = localStorage.getItem("localRecipes");
    recipeArray = JSON.parse(recipeArray);
    var recipeAmount = recipeArray.length;
    document.getElementById('recipeNum').innerHTML = "Number of Saved Recipes: " + recipeAmount;
    for (var i = 0; i < recipeArray.length; i++) {
      var name = recipeArray[i];
      var specs = localStorage.getItem(name);
      console.log(specs);
      specs = JSON.parse(specs);


// Existing
      var recSpecs = "<div class='card'>";
      recSpecs += "<div class='card-body'>";
      recSpecs += "<h4 class='card-title'>" + specs.name + "<button class='btn btn-dark float-right' data-toggle='collapse' href=#" + specs.name + " aria-expanded='false' aria-controls=" + specs.name + ">View</button></h4>";
      recSpecs += "<div class='collapse' id=" + specs.name + ">";
      recSpecs += "<br><br>";
      recSpecs += "<p><strong>Ingredients: </strong>" + specs.ingredients + "</p>";
      recSpecs += "<p><strong>Directions: </strong>" + specs.directions + "</p>";
      recSpecs += "<br><hr>";
      //recSpecs += "<button class='btn btn-secondary' data-toggle='modal' data-target='#editFormModal' data-id='" + specs.name + "' data-name='" + specs.name + "' data-ingredients='" + specs.ingredients+ "' data-ingredients='" + specs.ingredients+ "'>";
      recSpecs += "<button class='btn btn-secondary' onclick='editData(\"" + specs.name + "\")'>Edit</button>";
      recSpecs += "<button class='btn btn-danger' data-id='" + specs.name + "' onclick='removeData(\"" + specs.name + "\")'>Delete</button>";
      recSpecs += "</div></div></div>";

      var x = document.getElementById('savedRecipes');
      x.innerHTML += recSpecs;

    }
  }
}

function removeData(name) {
  console.log("Passed name \"" + name + "\"");
  //var recipeSpecs = {name: name, ingredients: ingredients, directions: directions};
  //console.log("check Local Storage");
  if (document.getElementById('savedRecipes')) {
    document.getElementById('savedRecipes').innerHTML = "";
  }
  var recipeArray = [];
  if (localStorage.getItem("localRecipes")) {
    console.log('There is an item called "localRecipes" ');
    recipeArray = localStorage.getItem("localRecipes");
    recipeArray = JSON.parse(recipeArray);
    for (var i = 0; i <= recipeArray.length; i++) {
      if (recipeArray[i] == name) {
        var r = confirm('Delete Recipe?');
        if(r == true) {
          console.log(name + " will be deleted from the array");
          recipeArray.splice(i, 1);
          localStorage.setItem("localRecipes", JSON.stringify(recipeArray));
        }  
        break;
      }
      if (i == recipeArray.length) {
        console.log(name + " doesn't exist in the array");
        alert(name + " doesn't exist");
        break;
      }
    }
  }
  getData();
}



function editData(name) {
  console.log("Passed name \"" + name + "\"");
  recipeToEdit = name;

  if (document.getElementById('savedRecipes')) {
    document.getElementById('savedRecipes').innerHTML = "";
  }

  var recipeArray = [];
  if (localStorage.getItem("localRecipes")) {
    recipeArray = localStorage.getItem("localRecipes");
    recipeArray = JSON.parse(recipeArray);
    var specs = localStorage.getItem(name);
    specs = JSON.parse(specs);
    document.getElementById("edit").elements.namedItem("name").value = specs.name;
    document.getElementById("edit").elements.namedItem("ingredients").value = specs.ingredients;
    document.getElementById("edit").elements.namedItem("directions").value = specs.directions;

    $(document).ready(function() {
      $('#editFormModal').modal('show');
    }); 
  }
  getData();
}

//var name = document.getElementById("edit").elements.namedItem("name").value;
//editFormModal

function updateData() {
  var recipeArray = [];

  recipeArray = localStorage.getItem("localRecipes");
  recipeArray = JSON.parse(recipeArray);
  var specs = localStorage.getItem(recipeToEdit);
  specs = JSON.parse(specs);

  specs.name = document.getElementById("edit").elements.namedItem("name").value;
  specs.ingredients = document.getElementById("edit").elements.namedItem("ingredients").value;
  specs.directions = document.getElementById("edit").elements.namedItem("directions").value;

  //recipeArray[recipeToEdit]

/*
  for (var i = 0; i <= recipeArray.length; i++) {
    if (recipeArray[i] == recipeToEdit) {
      recipeArray[i] = specs;
      console.log(recipeArray[i]);
    }
  }
*/


  localStorage.setItem(recipeToEdit, JSON.stringify(specs));
  localStorage.setItem("localRecipes", JSON.stringify(recipeArray));

  location.reload();
}
