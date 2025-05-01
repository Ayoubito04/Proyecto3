


import './style.css'



const ACCESS_KEY="pGKNoEwNjbYUaylYheCU27xZF-MnnbJhxczC2sKbgEY"
const SECRET_KEY="qCTqpHSjpz8hVHTRKqDo6d9Rf2eHVaQfs8bfYG5qrs4";
const buscar=document.getElementById("buscar_btn");
const photoInput=document.getElementById("photo-input");
const order_by=document.getElementById("order_by");
const color=document.getElementById("color");
const previos_btn=document.getElementById("Previos_btn");
const next_btn=document.getElementById("Next_btn");
const select_orientation=document.getElementById("select_orientation");

let currentPage=1;
let currentKeyword="";

const GetFotos = async (Keyword,pageNum=1) => {
    currentPage=pageNum;
    currentKeyword=Keyword;

  let url=`https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&query=${Keyword}&page=${pageNum}&per_page=10`;
     if(order_by.value!==""){
        url+=`&order_by=${order_by.value}`;
     }
     if(color.value!==""){
        url+=`&color=${color.value}`;
     }
     if(select_orientation.value!==""){
        url+=`&orientation=${select_orientation.value}`;
     }
     
try {
    const res= await fetch(url);
    const data=await res.json();
    console.log(data);
  PrintPhotos(data.results);
  MapPhotos(data.results);
  if(data.results.length===0){
    document.querySelector(".img-section").innerHTML=`<h2 class="error">No se encontraron resultados para "${currentKeyword}"</h2>`;
    document.querySelector(".img-section").style.display="block";
    document.querySelector(".img-section").style.textAlign="center";

  }
}
catch (error) {
    document.querySelector(".img-section").innerHTML=`<h2 class="error">No se encontraron resultados para "${currentKeyword}"</h2>`;
    console.log("Error:",error);
}


    


}

const MapPhotos=(photos)=>{
    const Map=photos.map((photo)=>({
        alt:photo.alt_description,
        photo:photo.urls.regular,
        original:photo.urls.full,
        color:photo.color,
        
    }))
  console.log(Map);
  
}
const PrintPhotos =(photos)=>{
    
    
    const container=document.querySelector(".img-section");
    container.innerHTML="";

    const ul=document.createElement("ul");
     container.appendChild(ul);
     for( const photo of photos){
        const li=document.createElement("li");
       
        li.innerHTML=`
        <img src="${photo.urls.regular}" alt="${photo.alt_description}" class="img"/>
        
        <div class="img-info">
            <h3>${photo.alt_description}</h3>
        </div>
        <a href="${photo.urls.full}" target="_blank" class="btn">Ver imagen</a>
        `;
        ul.appendChild(li);
        li.style.border=`10px solid ${photo.color}`;

      
     }

    }
    window.addEventListener("DOMContentLoaded",()=>{
        GetFotos();
    }
    )
    buscar.addEventListener("click",()=>{
   const keyword=photoInput.value;
    if(keyword){
        GetFotos(keyword);
    }
    })
    previos_btn.addEventListener("click",()=>{
        if(currentPage>1){
            GetFotos(currentKeyword,currentPage-1);
        }
    })
    next_btn.addEventListener("click",()=>{
        GetFotos(currentKeyword,currentPage+1);
    })

    

