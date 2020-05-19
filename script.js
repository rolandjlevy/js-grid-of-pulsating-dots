const container = document.querySelector('.container');
const display = document.querySelector('.display');

let counter = 0;
let row = 0;
let col = 0;
const max = 100;
let activeDots = [];
const width = Number(getComputedStyle(document.body).getPropertyValue('--size'));

let leftRange, rightRange, topRange, bottomRange;

while (counter < max) {
  col = counter % 10;
  createDot (col, row);
  counter++;
  row += counter % 10 == 0;
}

function createDot (col, row) {
  const newDot = document.createElement("div");
  newDot.classList.add('dot');
  const posX = String(col * width) + 'px';
  const posY = String(row * width) + 'px';
  newDot.style.left = posX;
  newDot.style.top = posY;
  // newDot.style.backgroundColor = `rgb(${col * 25.5}, ${col * 25.5}, ${counter * 2.55})`;
  newDot.id = `d-${counter}`;
  // const text = document.createTextNode(counter);
  // newDot.appendChild(text);
  newDot.addEventListener('click', (e) => {
    const id = e.target.id.split('-').pop();
    leftRange = id - id % 10;
    rightRange = id - id % 10 + 10;
    topRange = id % 10;
    bottomRange = id % 10 + (max - 10);
    growDot(id, 'LEFT');
    growDot(id, 'RIGHT');
    growDot(id, 'TOP');
    growDot(id, 'BOTTOM');
  });
  container.appendChild(newDot);
}

function growDot(id, type) {
  switch (type) {
    case 'LEFT':
      if (id <= leftRange) return;
      const leftId = Number(id) - 1;
      const leftDiv = document.querySelector(`#d-${leftId}`);
      leftDiv.classList.add('grow');
      growNextDot(leftId, 'LEFT').then(() => removeGrow(id, leftDiv));
      break; 
    case 'RIGHT':
      if (id >= rightRange - 1) return;
      const rightId = Number(id) + 1;
      const rightDiv = document.querySelector(`#d-${rightId}`);
      rightDiv.classList.add('grow');
      growNextDot(rightId, 'RIGHT').then(() => removeGrow(id, rightDiv));
      break; 
    case 'TOP':
      if (id <= topRange) return;
      const topId = Number(id) - 10;
      const topDiv = document.querySelector(`#d-${topId}`);
      topDiv.classList.add('grow');
      growNextDot(topId, 'TOP').then(() => removeGrow(id, topDiv));
      break;
    case 'BOTTOM':
      if (id >= bottomRange) return;
      const bottomId = Number(id) + 10;
      const bottomDiv = document.querySelector(`#d-${bottomId}`);
      bottomDiv.classList.add('grow');
      growNextDot(bottomId, 'BOTTOM').then(() => removeGrow(id, bottomDiv));
      break;
  } 
}

function growNextDot(id, type) {
  // activeDots.push({id});
  // console.log("id", id, "type", type);
  // display.innerHTML = JSON.stringify(activeDots, null, 2);
   return new Promise(function(resolve, reject) {
     setTimeout((function() {
      growDot(id, type);
      resolve('done');
    }), 200);
  });
}

function removeGrow(id, div) {
  // const found = activeDots.find(item => {
  //   console.log("item.id", item.id, "id", id);
  //   return item.id == id;
  // });
  // console.log("======================");
  // if (found) {
    // console.log(foundIndex);
    // activeDots = activeDots.filter(item => item.id !== found.id );
  // }
  div.classList.remove('grow');
}
