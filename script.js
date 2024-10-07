

const buttons = async () => {
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
  const data = await response.json();
  display_btns(data.categories);
  console.log(data.categories)
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
      <button class="flex justify-between items-center w-[50%] lg:w-[35%] border-2 p-3 rounded-md text-xl font-bold" onclick="spinner('${pet.category}')" id="pet_type"><img src="${pet.category_icon}" class="w-[30%]">${pet.category}</button>
     `
    container.appendChild(btn)
  })
}

const spinner = (category) => {

  document.getElementById("spin").style.display = "block";
  show_pets(category)
}
const show_pets = async (category) => {
  setTimeout(async () => {
    document.getElementById("spin").style.display = "none";
    console.log(category)
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    const data = await response.json();

    console.log(data.data)
    pet_card(data.data)
  }, 2000)

}

const pet_card = (data) => {

  console.log(data)
  const cards = document.getElementById("card");
  cards.innerHTML = ""
  if (Array.isArray(data) && data.length > 0) {

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
   <div class="flex justify-between items-center gap-3">  <button class="btn rounded" onclick="adopted()"  >Adopt</button>
   <button class="btn rounded" id="details" onclick="description('${x.petId}')">Details</button>
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
    const div = document.createElement("div")
    div.innerHTML = `
            <div class="  bg-[rgba(19, 19, 19, 0.03)]">
            <div class="flex flex-col justify-between items-center">
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
  p.appendChild(img)

}

const all_pets = async () => {
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
  const data = await response.json();
  console.log(data.pets)
  document.getElementById("spin").style.display = "block";
  display_all_pets(data.pets);
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
           <div class="flex justify-between items-center gap-3">  <button class="btn rounded" onclick="adopted()" >Adopt</button>
           <button class="btn rounded"  onclick="description('${p.petId}')" >Details</button>
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
  for (let i = 1; i < 17; i++) {
    //   prices.push(data.pets[i].price)
    if (data.pets[i].price > data.pets[i - 1].price) {
      console.log(data.pets[i - 1].price)
    }
    // else{
    //     console.log(data.pets[i].price)
    // }


  }
  console.log(prices)
  prices.sort((a, b) => b - a);
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

const adopted = async () => {
  const x = document.getElementById("adopt_modal");
  x.innerHTML = '';
  x.showModal();

  const div = document.createElement("div");
  div.innerHTML = `
                <div class="modal-box flex flex-col justify-between items-center">
                    <h1 class="text-5xl font-extrabold">Congrats!</h1>
                    <h3>Adoption Process is start for Your Pet</h3>
                    <div id="countdown-container" class="countdown font-mono text-6xl">
                        <span style="--value:3;">3</span>
                    </div>
                  
                </div>
            `;

  x.appendChild(div);

  let counter = 3;
  const countdownContainer = document.getElementById("countdown-container");

  const intervalId = setInterval(() => {
    counter -= 1;

    countdownContainer.innerHTML = `
                    <span style="--value:${counter};" class="text-4xl">${counter}</span>
                `;

    if (counter <= 0) {
      clearInterval(intervalId);
      x.close();
      document.getElementById("details").disabled=true;
    }
  }, 1000);
}
