$(() => {

    $(".create-form").on("submit", (event) => {

        event.preventDefault();
        event.stopPropagation();
    
        const newBurger = {
          name: $("#burger-box").val().trim(),
          devoured: false
        };

        console.log(newBurger);
    
        $.ajax("/api/new", {
          type: "POST",
          data: newBurger,
        }).then(() => {
            window.location.reload();
        })
        .catch(err => {
          console.log(err)
        })
    });
   
    $(".devour").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        const id = $(this).attr("data-devourId");
    
        const newDevouredState = { value: true };
    
        $.ajax(`/api/${id}`, {
          type: "PUT",
          data: JSON.stringify(newDevouredState),
          contentType: "application/json; charset=UTF-8",
        }).then(() => {
          window.location.reload();
        })
        .catch(err => {
            console.log(err)
        })
      });

});