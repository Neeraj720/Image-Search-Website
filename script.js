const accesskey="FFQe_P136ERK-FMIH4s8C4KGrzGUF62TLUv5NkBRXjk"

const formElem=document.querySelector("form")
const searchInputElem=document.getElementById("search-input")
const searchResultElem=document.querySelector(".search-results")
const showMoreButtonElem=document.getElementById("show-more-button")

let inputData=""
let page=1
async function searchImages(){
    inputData=searchInputElem.value
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`
    // console.log(url)
    const response=await fetch(url)
    const data=await response.json()
    // console.log(data)
    if(page===1){
        searchResultElem.innerHTML=''
    }
    const results=data.results;
    results.map((result)=>{
        // Create Container For Image And  Ancor Tag
        const imageWrapper=document.createElement('div')
        imageWrapper.classList.add("search-result")
        // Create Image Tag 
        const image=document.createElement('img')
        image.src=result.urls.small;
        image.alt=result.alt_description;
        // Create container for ancor tag
        const imageLink=document.createElement('a')
        imageLink.href=result.links.html;
        imageLink.target="_blank";
        imageLink.textContent=result.alt_description;

        // Append All Create Elements

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResultElem.appendChild(imageWrapper)
    })
    page++;
    // we use page variable for the Show more button when page value increse by one it will shoew the button
   
    if(page>1){
        showMoreButtonElem.style.display="block"
    }
}

formElem.addEventListener('submit',function(e){
    e.preventDefault()
    page=1;
    searchImages()
})

showMoreButtonElem.addEventListener("click",()=>{
    searchImages()
})