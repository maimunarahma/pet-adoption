

const buttons = async () => {

  try {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    const data = await response.json();
    display_btns(data.categories);
    console.log(data.categories)
  }

  catch (error) {
    console.error('Error Find: ', error);
  }
  // pets[0].category
}
buttons();

const display_btns = async (pets) => {

  const container = document.getElementById("category");
  pets.forEach((pet) => {


    const btn = document.createElement("button");
    btn.classList.add = ("btn");
    console.log(pet.category)
    btn.innerHTML = `
      <button class="flex justify-center gap-2 items-center w-[70%] p-2 lg:w-[35%] border-2  rounded-md text-xl font-bold" onclick="spinner('${pet.category}')" id="pet_type"><img src="${pet.category_icon}" class="w-[30%]">${pet.category}</button>
     `
    container.appendChild(btn)
  })
}

const spinner = (category) => {

  document.getElementById("spin").style.display = "block";
  show_pets(category)
}
const show_pets = async (category) => {
  try {
    setTimeout(async () => {
      document.getElementById("spin").style.display = "none";
      console.log(category)
      const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
      const data = await response.json();

      console.log(data.data)
      pet_card(data.data)
    }, 2000)
  }
  catch (error) {
    console.log("error find :", error);
  }
}

const pet_card = (data) => {

  console.log(data)

  const cards = document.getElementById("card");
  cards.innerHTML = ""
  if (Array.isArray(data) && data.length > 0) {
    cards.classList.add("grid")

    data.forEach((x) => {
      const div = document.createElement("div");


      div.innerHTML = `
        <div class="card  border-2 rounded-lg p-3">
  <figure>
    <img
      src="${x.image}"
      alt="Shoes" />
  </figure>
  <div class="py-3">
    <h2 class="card-title font-bold text-lg">${x.pet_name}</h2>
    <p><i class="fa-regular fa-square-minus "></i> Breed: ${(x.breed === undefined || x.breed === null) ? "Not Available" : x.breed}</p>
     <p><i class="fa-solid fa-calendar-days"></i> Birth: ${(x.date_of_birth === undefined || x.date_of_birth === null) ? "Not Available" : x.date_of_birth}</p>
     <p><i class="fa-solid fa-venus-mars"></i>    Gender: ${(x.gender === undefined || x.gender === null) ? "Not Available" : x.gender}</p>
      <p><i class="fa-solid fa-tag"></i>          Price: ${(x.price === undefined || x.price === null) ? "Not Available" : x.price}</p>
     
     <div class="mt-6 flex justify-between items-center p-3">
     <button class="btn rounded-full like" onclick="liked_pet('${x.image}')"><i class="fa-regular fa-thumbs-up"></i></button>
   <div class="flex justify-between items-center gap-3">
     <button class="btn rounded text-[#0E7A81] adopt" onclick="adopted(${x.petId})" id="adopt-${x.petId}" >Adopt</button>
   <button class="btn rounded text-[#0E7A81]" id="details" onclick="description('${x.petId}')">Details</button>
   </div>
     </div> 
    </div>
  </div>
</div>
        `

      cards.appendChild(div)
    });
  }
  else {
    console.log("No data or empty array, showing error message");
    const div = document.createElement("div");
    cards.classList.remove("grid")
    div.innerHTML = `
            <div class="  bg-[#13131308]/30 w-[90%] p-10 py-20">
            <div class="flex flex-col justify-center items-center">
            <img src="./assets/error.webp" alt="">
            <p class="text-3xl font-bold">No Information Available</p>
            <p class="text-lg font-medium ">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
            its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
            </div>`;
    cards.appendChild(div)
  }

}


const liked_pet = (image) => {
  // document.getElementById("like").style.backgroundColor = "blue";
  const p = document.getElementById("selected_container");

  const img = document.createElement("img");
  console.log(image)
  img.src = image;
  img.classList.add("rounded")
  p.appendChild(img)

}

const all_pets = async () => {
  try {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    const data = await response.json();
    console.log(data.pets)
    document.getElementById("spin").style.display = "block";
    display_all_pets(data.pets);
  }
  catch (error) {
    console.log("error found ", error)
  }
}

const display_all_pets = (pets) => {
  const show = document.getElementById("card");

  setTimeout(() => {
    document.getElementById("spin").style.display = "none"
    show.innerHTML = "";
    pets.forEach((p) => {

      const card_container = document.createElement("div");
      card_container.innerHTML = `
                <div class="card   border-2 rounded-lg p-3">
          <figure>
            <img
              src="${p.image}"
              alt="Shoes" />
          </figure>
          <div class="py-3">
            <h2 class="card-title font-bold text-lg">${p.pet_name}</h2>
            <p><i class="fa-regular fa-square-minus "></i> Breed: ${(p.breed === undefined || p.breed === null) ? "Not Available" : p.breed}</p>
          <p><i class="fa-solid fa-calendar-days"></i> Birth: ${(p.date_of_birth === undefined || p.date_of_birth === null) ? "Not Available" : p.date_of_birth}</p>

             <p><i class="fa-solid fa-venus-mars"></i>    Gender: ${(p.gender === undefined || p.gender === null) ? "Not Available" : p.gender}</p>
              <p><i class="fa-solid fa-tag"></i>          Price: ${(p.price === undefined || p.price === null) ? "Not Available" : p.price}</p>
             
             <div class="mt-6 flex justify-between items-center p-3">
             <button class="btn rounded-full like" onclick="liked_pet('${p.image}')"><i class="fa-regular fa-thumbs-up"></i></button>
           <div class="flex justify-between items-center gap-3">  
           <button class="btn rounded text-[#0E7A81] adopt" onclick="adopted(${p.petId})" id="adopt-${p.petId}" >Adopt</button>
           <button class="btn rounded text-[#0E7A81]"  onclick="description('${p.petId}')" >Details</button>
           </div>
             </div> 
            </div>
          </div>
        </div>`

      show.appendChild(card_container)
    })

  }, 2000);
}
//    loding
all_pets();

const sort = async () => {

  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
  const data = await response.json();
  console.log(data.pets[0].price)
  const prices = [];
  let pets = data.pets;
  for (let i = 1; i < 17; i++) {
    prices.push(data.pets[i].price)
    // if (data.pets[i].price > p1) {
    console.log(data.pets[i - 1].price)
  }






  console.log(prices)
  pets.sort((a, b) => a.price - b.price);
  pets.forEach((pet) => {
    console.log(`Name: ${pet.pet_name}, Price: ${pet.price}`);
  })
  document.getElementById("card").innerHTML = "";
  const sorted = document.getElementById("card");

  pets.forEach((pet) => {
    const new_card = document.createElement("div")
    new_card.innerHTML = `
          <div class="card  border-2 rounded-lg p-3">
  <figure>
    <img
      src="${pet.image}"
      alt="Shoes" />
  </figure>
  <div class="py-3">
    <h2 class="card-title font-bold text-lg">${pet.pet_name}</h2>
    <p><i class="fa-regular fa-square-minus "></i> Breed: ${(pet.breed === undefined || pet.breed === null) ? "Not Available" : pet.breed}</p>
     <p><i class="fa-solid fa-calendar-days"></i> Birth: ${(pet.date_of_birth === undefined || pet.date_of_birth === null) ? "Not Available" : pet.date_of_birth}</p>
     <p><i class="fa-solid fa-venus-mars"></i>    Gender: ${(pet.gender === undefined || pet.gender === null) ? "Not Available" : pet.gender}</p>
      <p><i class="fa-solid fa-tag"></i>          Price: ${(pet.price === undefined || pet.price === null) ? "Not Available" : pet.price}</p>
     
     <div class="mt-6 flex justify-between items-center p-3">
     <button class="btn rounded-full like" onclick="liked_pet('${pet.image}')"><i class="fa-regular fa-thumbs-up"></i></button>
   <div class="flex justify-between items-center gap-3">  <button class="btn rounded text-[#0E7A81] adopt" onclick="adopted(${pet.petId})" id="adopt-${pet.petId}" >Adopt</button>
   <button class="btn rounded text-[#0E7A81]" id="details" onclick="description('${pet.petId}')">Details</button>
   </div>
     </div> 
    </div>
  </div>
</div>
       
   `
    sorted.appendChild(new_card)
  })

}



const description = async (id) => {

  const x = document.getElementById("detail_modal");
  detail_modal.showModal();
  console.log(id)
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
  const data = await response.json();
  console.log(data.petData)
  // modal_content(data.petData)
  const modal = document.createElement("div");
  x.innerHTML = ""
  modal.innerHTML = `
           
            <div class="modal-box">
            <img src="${data.petData.image}" class="w-full">
            <h1 class="font-bold text-xl mt-3">${data.petData.pet_name}</h1>
            <div class="flex justify-between items-center mb-6">
             <div>
            <p><i class="fa-regular fa-square-minus "></i> Breed: ${(data.petData.breed === null || data.petData.breed === undefined) ? "Not Available" : data.petData.breed}</p>
             
             <p><i class="fa-solid fa-venus-mars"></i>    Gender: ${(data.petData.gender === null || data.petData.gender === undefined) ? "Not Available" : data.petData.gender}</p>
              <p><i class="fa-solid fa-venus-mars"></i>   Vaccinated: ${(data.petData.vaccinated_satus === null || data.petData.vaccinated_satus === undefined) ? "Not Available" : data.petData.vaccinated_satus}</p>
              </div>
              <div>
              <p><i class="fa-solid fa-calendar-days"></i> Birth: ${(data.petData.date_of_birth === undefined || data.petData.date_of_birth === null) ? "Not Available" : data.petData.date_of_birth}</p>
              <p><i class="fa-solid fa-tag"></i>          Price:  ${(data.petData.price === null || data.petData.price === undefined) ? "Not Available" : data.petData.price}</p>
              </div>
             </div>
             <h1>Details Information</h1>
             <p>${data.petData.pet_details}</p>

               <form method="dialog" class="modal-action">
                       <button class="btn w-full bg-till color-[rgb(14,122,129)] border-2 border-till">Close</button>
                    </form>
           
            </div>
            
            `
  x.appendChild(modal)

}

const adopted = async (id) => {
  my_modal_1.showModal();


  console.log(id);

  let countDown = 3;
  document.getElementById('count-down').innerText = countDown;
  const intervalId = setInterval(() => {
    countDown--;
    document.getElementById('count-down').innerText = countDown;
    if (countDown <= 0) {
      clearInterval(intervalId);
      my_modal_1.close();
      document.getElementById(`adopt-${id}`).disabled = true;
      document.getElementById(`adopt-${id}`).innerText = "Adopted";
    }
  }, 1000);


}
