
let poster_list = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Welchcorgipembroke.JPG/1200px-Welchcorgipembroke.JPG",
  "https://stories.barkpost.com/wp-content/uploads/2015/01/corgi2.jpg",
  "https://images-cdn.9gag.com/photo/aYeP537_700b_v2.jpg",
]

let poster_list1 = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Welchcorgipembroke.JPG/1200px-Welchcorgipembroke.JPG",
  "https://stories.barkpost.com/wp-content/uploads/2015/01/corgi2.jpg",
  "https://images-cdn.9gag.com/photo/aYeP537_700b_v2.jpg",
  "https://i.pinimg.com/236x/04/98/65/0498659455374a06c7db95f3a55222bd--corgie-puppies-corgi-puppy.jpg",
  "https://stories.barkpost.com/wp-content/uploads/2015/01/corgi2.jpg",
  "https://images-cdn.9gag.com/photo/aYeP537_700b_v2.jpg",
  "https://i.pinimg.com/236x/04/98/65/0498659455374a06c7db95f3a55222bd--corgie-puppies-corgi-puppy.jpg",
]

document.addEventListener("DOMContentLoaded", () => {
  main_poster(poster_list)
  load_posters(poster_list1);
});


function main_poster(poster_list){

  let main_posters = document.getElementById("main-posters");

  for (let i = 0; i < poster_list.length; i++) {
      let div = document.createElement("div");
      div.className = "img-main";

      let image = document.createElement("img");
      image.src = poster_list[i];
      image.className = "img-poster";

      div.appendChild(image);
      main_posters.appendChild(div);
    }

}

function load_posters(poster_list){

    let div_posters = document.getElementById("posterbox");

    for (let i = 0; i < poster_list.length; i++) {
      let div = document.createElement("div");
      div.className = "img-poster";

      let image = document.createElement("img");
      image.src = poster_list[i];
      image.className = "img-poster";

      div.appendChild(image);
      div_posters.appendChild(div);
    }

  }


