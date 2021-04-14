$(function(){
    loadRecipies();
    $("#recipies").on("click", "btn-danger",handleDelete);
    $("#recipies").on("click", "btn-warning",handldeUpdate);
    $("#addBtn").click(addRecipe);
    $("#updateSave").click(function(){
        var id = $("#upadteId").val(response._Id);
        var title = $("#upadteTitle").val();
        var body = $("#upadteBody").val();
        $.ajax({
            url: "https://usman-recipes.herokuapp.com/api/recipes/",
            data:{ttile,body},
            method: "PUT",
            success: function(response){
                console.log(response);
                loadRecipies();
                $("#upadteModal").modal("hode");
            }
        })
    })
});
function handldeUpdate(){
    ("#handldeUpdate").modal("show");
    var btn =$(this);
   var parentDiv = btn.closest(".recipe");
   let id = parentDiv.attr("data-id");
   $.get("https://usman-recipes.herokuapp.com/api/recipes/" + id, function(response){
     $("#upadteId").val(response._Id);
     $("#upadteTitle").val(response._Title);
     $("#upadteBody").val(response._Body);
     $("#upadteModal").modal("show");
   })
}
function addRecipe(){
    var title = $("title").val();
    var body = $("body").val();
  $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/recipes",
      method: "POST",
      data: {title,body},
      success: function(response){
            console.log(response);
            loadRecipies();
      }
  })
}
function handleDelete(){
   var btn =$(this);
   var parentDiv = btn.closest(".recipe");
   let id = parentDiv.attr("data-id");
   console.log(id);
   console.log(id);
   $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes/"+id,
    method:"DELETE",
    success: function(){
        loadRecipies();
    }
   });
}
function loadRecipies(){
     $.ajax({
         url: "https://usman-recipes.herokuapp.com/api/recipes/",
         method:"GET",
         success : function(response){
             console.log(response);
            var recipes = $("#recipes");
            recipes.empty();
            for(var i=0;i<response.length; i++){
                var rec = response[i];
                recipes.append(`<div class="recipe" data-id="${rec._id}"><h3>${rec.title}</h3><p><button class="btn btn-danger float-right">Delete Recipe</button><button class="btn btn-warning float-right">Edit Recipe</button> ${rec.body}</p></div>`);
            }          
         }     
        });
}