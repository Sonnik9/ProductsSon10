
let cont2;
let cont2Existe = false;
let imgCurent;
let imgNextRecive;
let contImg;
let offset = 0;
let offset2 = 270;
let leftSide;
let arrSlider = [];
let countClick = 0;

window.addEventListener('hashchange', renderingAll);
  
function closePageOne() {
  maneger.style.display = 'none';
  products.style.display = 'none';
}

function openPageOne() {
  maneger.style.display = 'block';
  products.style.display = 'block';  
}

function createPageTwo(arr) {
  wrapper.style.display = 'block';
  wrapper.style.marginTop = -40 + 'px';
  cont2Existe = true;
  let cont1 = document.createElement('div');
  cont1.classList.add('cont');
  wrapper.append(cont1);
  cont2 = document.querySelector('.cont');
     
  for (let h = 0; h <  dataItems.length; h++) {
      if('#' + dataItems[h].id == location.hash) {
        cont2.innerHTML = `            
          <div class="leftSide">
              <img class="item3" src="${arr[h].imageUrl1[0]}" style="top: 0px;">                    
          </div>
          <div class="right-side">
              <p class="title-item2">
              ${arr[h].name}
              </p>
              <p class="descript20-item">
              ${arr[h].snippet}
              </p>
              <hr class="hr">
              <div class="contImg">
                     
              </div>
          </div>            
        `;

      leftSide = document.querySelector('.leftSide');
      imgCurent = document.querySelector('.item3');
      arrSlider.push(imgCurent);
       
      contImg = document.querySelector('.contImg')
      imgCurent.setAttribute('data-index', h);
      curentIndex1 = imgCurent.getAttribute('data-index'); 
    
        for (let f = 0; f < dataItems[h].countImg; f++) {
       
          imgSlider = document.createElement('img');
          imgSlider.classList.add('imgSlider');
          contImg.append(imgSlider);
          imgSlider1 = document.querySelectorAll('.imgSlider');
          imgSlider.setAttribute('data-index', f);       
          imgSlider1[f].src = dataItems[h].imageUrl1[f];
     
        } //cycle second
      } // if

  } //cycle first
       
  contImg.addEventListener('click', clickImg); 
}

function delitePageTwo() {

  if(location.hash == '#list' && cont2Existe == true) {
    cont2.remove();
    wrapper.style.display = 'flex';
    wrapper.style.marginTop = 20 + 'px';
  }
}

function renderingAll() {
  
  if(location.hash !== '#list' && location.hash !== '#home') {
    closePageOne();
    createPageTwo(dataItems);
  }

  else if(location.hash == '#list' && location.hash !== '#home'){
    openPageOne();
    delitePageTwo();
    cont2Existe == false;
    arrSlider = [];
    countClick = 0;
  }
  
  else if (location.hash == '#home' && cont2Existe == true) {
    cont2.remove();
    removeList();
    recreateManeger();
    markPrepare = {};    
    inputEl.value = '';
    selectEl.value = 'newest';
     
    generatList(dataItems);
    sortByNewest(dataItems); 
    arrSlider = []; 
    countClick = 0;  
  }
   
  else if(location.hash == '#home' && cont2Existe == false) {
    removeList();
    recreateManeger();
    markPrepare = {};
    inputEl.value = '';
    selectEl.value = 'newest';
     
    generatList(dataItems);
    sortByNewest(dataItems);
    arrSlider = [];
    countClick = 0;
  }

}

function recreateImgNext() {
  let imgNext = document.createElement('img');
  imgNext.classList.add('item4');
  leftSide.append(imgNext);
  imgNextRecive = document.querySelector('.item4');
  imgNextRecive.style.top = 270 + 'px';      
}

function recreatedImgNow() {
  let img0 = document.createElement('img');
  img0.classList.add('item3');
  leftSide.append(img0);
  imgCurent = document.querySelector('.item3');
  imgCurent.style.top = 0 + 'px';  
}

function removeImgSession() {
  imgCurent.remove();
  if(imgNextRecive)
  imgNextRecive.remove();
}

function movess() {
  
  if(offset2 != 0) {
    offset = offset - 10;
    offset2 = offset2 - 10;
    imgCurent.style.top = offset + 'px';
    imgNextRecive.style.top = offset2 + 'px';
    setTimeout(movess, 0.5);
  }
     
} // effect for slider

function clickImg(e) {

  if(e.target.tagName == 'IMG') {
    countClick += 1;
    offset = 0;
    offset2 = 270;
    removeImgSession();
    recreatedImgNow();
    arrSlider.push(imgCurent);
    imgCurent.src = arrSlider[countClick-1].src
    recreateImgNext();
    arrSlider.push(imgNextRecive);
    imgNextRecive.src = e.target.src;
    arrSlider.shift();
         
    movess();   
  }  

}


