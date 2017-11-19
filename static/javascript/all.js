 // Adds selected filters to the posters
function apply_filters () {
	let div_filters = document.getElementById("div-list-filters");

	while (div_filters.firstChild) {
		div_filters.removeChild(div_filters.firstChild);
	}

	let filters = document.getElementById("div-select-filters").children;

	for (let i = 0; i < filters.length; i++) {
		let input = filters[i].children[0];

		if (input.checked) {
			let div = document.createElement("div");
			div.className = "tags has-addons div-tag";
			div.style.margin = "5px";

			let anchor = document.createElement("a");
			anchor.className = "tag is-delete";

			let span = document.createElement("span");
			span.innerHTML = input.value;
			span.className = "tag is-light";

			div.appendChild(span);
			div.appendChild(anchor);
			div_filters.appendChild(div);
		}
	}
}

// Shows/hides the list of filters
function show_filters () {
	let display = document.getElementById("div-filters").style.display;
	let button = document.getElementById("btn-show");

	if (display === "none") {
		document.getElementById("div-filters").style.display = "block";
		button.innerHTML = 'Select Filters&nbsp;<span class="icon"><i class="fa fa-angle-up" aria-hidden="true"></i></span>';
	} else {
		document.getElementById("div-filters").style.display = "none";
		button.innerHTML = 'Select Filters&nbsp;<span class="icon"><i class="fa fa-angle-down" aria-hidden="true"></i></span>';
	}
}

// Loads posters from server
function load_posters () {
	let poster_list = [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Welchcorgipembroke.JPG/1200px-Welchcorgipembroke.JPG",
		"https://stories.barkpost.com/wp-content/uploads/2015/01/corgi2.jpg",
		"https://images-cdn.9gag.com/photo/aYeP537_700b_v2.jpg",
		"https://i.pinimg.com/236x/04/98/65/0498659455374a06c7db95f3a55222bd--corgie-puppies-corgi-puppy.jpg"
	]

	let col1 = document.getElementById("column-1");
	let col2 = document.getElementById("column-2");
	let col3 = document.getElementById("column-3");
	let cols = [col1, col2, col3];

	for (let i = 0; i < poster_list.length; i++) {
		let div = document.createElement("div");
		div.className = "div-poster";

		let image = document.createElement("img");
		image.src = poster_list[i];
		image.className = "img-poster";

		div.appendChild(image);
		cols[i % 3].appendChild(div);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("div-filters").style.display = "none";

	let button_filter = document.getElementById("btn-filter");
	button_filter.addEventListener("click", () => { apply_filters(); });

	let button_show = document.getElementById("btn-show");
	button_show.addEventListener("click", () => { show_filters(); });

	load_posters();
});