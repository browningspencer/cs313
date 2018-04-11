var localRecipes = [];

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
      recSpecs += "<button class='btn btn-secondary edit-recipe' data-toggle='modal' data-target='#editFormModal' data-id='" + specs.name + "' data-name='" + specs.name + "' data-ingredients='" + specs.ingredients+ "' data-ingredients='" + specs.ingredients+ "'>";
      recSpecs += "Edit</button>";
      recSpecs += "<button class='btn btn-danger delete-recipe' data-id='" + specs.name + "'>Delete</button>";
      recSpecs += "</div></div></div>";

      var x = document.getElementById('savedRecipes');
      x.innerHTML += recSpecs;

    }
  }
}

/*
$(document).ready(function() {
  $('.delete-recipe').on('click', function(){
    var id = $(this).data('id');
    var url = '/delete/'+id;
    if(confirm('Delete Recipe?')) {
      $.ajax({
        url: url,
        type: 'DELETE',
        success: function(result) {
          console.log('Deleting Recipe...');
          window.location.href='/';
        },
        error: function(err) {
          console.log(err);
        }
      });
    }
  });

  $('.edit-recipe').on('click', function(){
    $('#edit-form-name').val($(this).data('name'));
    $('#edit-form-ingredients').val($(this).data('ingredients'));
    $('#edit-form-directions').val($(this).data('directions'));
    $('#edit-form-id').val($(this).data('id'));
  });
});
*/