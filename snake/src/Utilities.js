class Utilities {
  static getRandomColor() {
    // console.log(`rgb(${Math.floor(Math.random() * 255)}${Math.floor(Math.random() * 255)}${Math.floor(Math.random() * 255)})`)
    return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}`
  }

  static getRandomDelay(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum) + minimum) * 1000;
  }

  static getValidSpawn() {
    const objects = [];
    const apple = document.getElementById('apple');
    if (apple) objects.push(apple);
    const tree = document.getElementById('tree');
    if (tree) objects.push(tree);
    const axe = document.getElementById('axe');
    if (axe) objects.push(axe);
    const snake = document.getElementsByClassName('snake');

    for (let elem of snake) objects.push(elem);

    const boardVar = document.getElementById('board');

    const maxHoriz = window.getComputedStyle(boardVar).width.replace('px', '');
    const maxVert = window.getComputedStyle(boardVar).height.replace('px', '');


    const positionLeft = Math.floor(Math.random() * (maxHoriz / 50)) * 50;
    const positionDown = Math.floor(Math.random() * (maxVert / 50)) * 50; 
    // console.log(objects);

    let valid = false;
    while (!valid) {
      for (let obj of objects) {
        // console.log(obj);
        if (positionLeft !== obj.style.left && positionDown.positionDown !== obj.style.top) {
          valid = true;
        }
      }
    }
    // console.log(positionLeft, positionDown);
    return [positionLeft, positionDown];
  }
}