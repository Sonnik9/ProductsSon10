
let maneger = document.querySelector('.maneger');
let products = document.querySelector('.products');
let ulList = document.querySelector('.ul-list');
let wrapper = document.querySelector('.wrapper');

let filterPhones;
let curentValHref;
let indSort = 0;
let markPrepare;
let inputEl;
let selectEl;
let sortByNewest;

function generatManeger() {
    maneger.innerHTML = `    
       <h2>Search</h2>
       <input id="my-input" type="text" placeholder="search">
       <h3>Sort by</h3>
       <select name="" id="my-select">
          <option value="newest">Newest</option>
          <option value="alphabet">Alphabet</option>
          <option value="random">Random</option>
       </select>     
    `;
    inputEl = document.querySelector('#my-input');
    selectEl = document.querySelector('#my-select');
    inputEl.addEventListener('input', searchingItems);
    selectEl.addEventListener('change', sortBy);
     
}
generatManeger();

function recreateManeger() {
    inputEl.remove();
    selectEl.remove();
    maneger.innerHTML = '';
    generatManeger();
    indSort = 0;
}

function generatList(arr) {
    wrapper.style.display = 'flex';
    wrapper.style.marginTop = 20 + 'px';
 
    for (let i = 0; i < arr.length; i++) {
        curentValHref = '#' + arr[i].id;
       
        let li1 = document.createElement('li');
        li1.classList.add('item');
        ulList.append(li1);
        let li2 = document.querySelectorAll('.item');

        li2[i].innerHTML = `
            <a class="title-item" href = "${curentValHref}">${arr[i].name}</a>
            <img class="img-item" src="${arr[i].imageUrl0}">
            <p class="descript-item">${arr[i].snippet}</p>
        `;
    }
    location.hash = 'list';
     
}        

generatList(dataItems);

function removeList() {        
    document.querySelectorAll('li').forEach(li => li.remove());
}

sortByNewest = function sortByNewest(arr) { /// for special case (hash = 'home')
    removeList()
    arr.sort((a, b)=> a.age > b.age ? 1: -1);
    generatList(arr);

}

function sortBy() { //for select choise
   
    function sortByRandom(arr) {
        removeList()
        for (var i = 0; i < 15; i++) {
            arr.sort(()=> Math.random() - 0.5);
        }
        generatList(arr);
    }       
    
    function sortByAlphabet(arr) {
        removeList()
        arr.sort((a, b)=> a.id > b.id ? 1: -1);
        generatList(arr);
    }
    
    switch(selectEl.value) {
        case 'random':
        indSort == 0 ? sortByRandom(dataItems) : sortByRandom(filterPhones), markPrepare();
        break;

        case 'newest':
        indSort == 0 ? sortByNewest(dataItems) : sortByNewest(filterPhones), markPrepare();
        break;

        case 'alphabet':
        indSort == 0 ? sortByAlphabet(dataItems) : sortByAlphabet(filterPhones), markPrepare();
        break;
    }  

} 


function searchingItems() {
   
    indSort = 1;
    indSortAfterHome = 1;
    let value = inputEl.value.toLowerCase().trim();        
    filterPhones = dataItems.filter(item => {
        return item.name.toLowerCase().search(value) > -1;     
    });
    removeList();
    generatList(filterPhones);

    markPrepare = function markPrepare() {

       let list = document.querySelectorAll('.title-item');
       if (value) { // for marking of highlighting text preparation
            list.forEach(elem => {

              if (elem.innerText.toLowerCase().search(value) == -1) {                              
                 elem.innerHTML = elem.innerText;
              }
              else {                    
                 let str = elem.innerText;           
                 elem.innerHTML = insertMark(str,elem.innerText.toLowerCase().search(value),value.length);
              }
            }); 

        }  // if (value)
        else {          
            list.forEach(elem => {               
            elem.innerHTML = elem.innerText;          
            });
        }

    } //  func markPrepare end

    markPrepare();

} // function searchingItems

function insertMark(string,pos,len) {  // for marking of highlighting text
    return string.slice(0, pos) + '<mark>' + string.slice(pos, pos+len) + '</mark>' + string.slice(pos+len);
}
  

