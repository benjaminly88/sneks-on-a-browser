class Apple {

  constructor(el) {
    this.el = el;
    this.node = this.createApple();
    // console.log(this.pointValue);


    this.boardVar = document.getElementById('board');
    this.headVar = document.getElementById('head');
  }

  // To be used to check if apple would be placed on the snake, or if the snake touches the apple
  static isTouchingApple(posArray, bodyArr) {
    // Get the position of the apple
    let posLeft;
    let posDown;

    // If apple position is provided
    if (posArray) {
      posLeft = posArray[0];
      posDown = posArray[1];
    } else {
      // If apple position is not provided
      const apple = document.getElementById('apple');

      posLeft = apple.style.left;
      posDown = apple.style.top;
    }

    

    if (bodyArr) {
      for (const bodySegment of bodyArr) {
        if (posLeft === bodySegment.leftPosition + 'px' && posDown === bodySegment.topPosition + 'px') {
          return true;
        }
      }
    } else {
      const headVar = document.getElementById('head');
      return headVar.style.left === posLeft && headVar.style.top === posDown;
    }

    
    // Return if head is on the apple
    return false;
  }

  createApple() {
    // access the board 
    // const maxHoriz = window.getComputedStyle(this.boardVar).width.replace('px', '');
    // const maxVert = window.getComputedStyle(this.boardVar).height.replace('px', '');


    const node = document.createElement('img');
    node.setAttribute('id', 'apple');

    const pos = Utilities.getValidSpawn();
    node.style.left = pos[0] + 'px';
    node.style.top = pos[1] + 'px';

    const num = Math.floor(Math.random() * 10);

    if (num >= 9) {
      node.setAttribute('src', 'src/assets/golden-apple.png');
      node.setAttribute('points', 1000);
      this.spawnTree(node.style.left, node.style.top);
    } else if (num >= 6) {
      node.setAttribute('src', 'src/assets/apple-basket.png');
      node.setAttribute('points', 100);
    } else {
      node.setAttribute('src', chrome.runtime.getURL('./src/assets/apple.png'));
      node.setAttribute('points', 10)
    }

    this.el.appendChild(node);
  }


  spawnTree(posLeft, posTop) {

    const tree = document.createElement('img');
    tree.setAttribute('id', 'tree');
    tree.setAttribute('src', 'src/assets/tree.png');

    tree.style.left = posLeft;
    tree.style.top = posTop;
    
    this.el.appendChild(tree);
  }

}

