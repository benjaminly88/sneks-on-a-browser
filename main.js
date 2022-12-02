const contents = document.querySelector('body');
// const head = document.querySelector('head');
const parentNode = contents.parentNode;

console.log(sessionStorage.getItem('hostname'));
console.log(window.location.hostname);

if (!sessionStorage.getItem('hostname')) {
  console.log('new session')
  sessionStorage.setItem('hostname', window.location.hostname);
  sessionStorage.setItem('passed', false);
  startgame(parentNode);
} else {
  if (sessionStorage.getItem('hostname') !== window.location.hostname || sessionStorage.getItem('passed') === 'false') {
    sessionStorage.setItem('hostname', window.location.hostname);
    sessionStorage.setItem('passed', false);
    console.log('new host')
    startgame(parentNode);
  } else {
    console.log('already passed on this host');
  }
}





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
  
      const num = Math.floor(Math.random() * 100);
  
      if (num >= 85) {
        node.setAttribute('src', 'https://i.imgur.com/9LQf6AY.png');
        node.setAttribute('points', 1000);
        this.spawnTree(node.style.left, node.style.top);
      } else if (num >= 60) {
        node.setAttribute('src', 'https://i.imgur.com/8yNcr1R.png');
        node.setAttribute('points', 100);
      } else {
        node.setAttribute('src', 'https://i.imgur.com/ML3FSvb.png');
        node.setAttribute('points', 10)
      }
  
      this.el.appendChild(node);
    }
  
  
    spawnTree(posLeft, posTop) {
  
      const tree = document.createElement('img');
      tree.setAttribute('id', 'tree');
      tree.setAttribute('src', 'https://i.imgur.com/nFEbALJ.png');
  
      tree.style.left = posLeft;
      tree.style.top = posTop;
      
      this.el.appendChild(tree);
    }
  
  }
  
// Array Body Structure
class Body {

  constructor(el, head) {
    this.el = el;
    this.bodyArray = [head];

    // this.node = document.createElement('div');
    // this.node.setAttribute('id', 'head');
    // el.appendChild(this.node);
  }

  // Add new body segment
  addSegment(posLeft, posDown) {
    this.bodyArray.push(new BodySegment(posLeft, posDown, this.el));
    this.updateSegments();
  }
  
  move() {
    for ( let i = 1; i < this.bodyArray.length; i++) {
      const segment = this.bodyArray[i];
      const prevSegment = this.bodyArray[i - 1];
        segment.prevDown = segment.topPosition;
        segment.prevLeft = segment.leftPosition;
        segment.topPosition = prevSegment.prevDown;
        segment.leftPosition = prevSegment.prevLeft;

        segment.node.style.left = segment.leftPosition;
        segment.node.style.top = segment.topPosition;
    }
  }

  updateSegments() {
    document.getElementsByClassName('score-text')[1].textContent = `SEGMENTS: ${this.bodyArray.length}`
  }

  randomizeBodyColors() {
    const bodySegments = document.getElementsByClassName('snake');

    for (const segment of bodySegments) {
      segment.style.backgroundColor = Utilities.getRandomColor();
    }
  }

}

// Body node
class BodySegment {
  constructor(posLeft, posDown, el) {
    console.log(this.node)
    this.node = document.createElement('div');
    this.node.setAttribute('id', 'body');
    this.node.setAttribute('class', 'snake ');
    el.appendChild(this.node);
    const body = this.node;
    
    this.posLeft = posLeft;
    this.posDown = posDown;
    body.style.left = posLeft;
    body.style.top = posDown;
    body.style.backgroundColor = Utilities.getRandomColor();
    this.next = null;
    console.log(this.node)
  }
}


class Head {

  constructor(el) {
    this.node = document.createElement('div');
    this.node.setAttribute('id', 'head');
    this.node.setAttribute('class', 'snake');
    this.node.setAttribute('src', 'https://i.imgur.com/KT3rjAd.png');
    this.node.style.backgroundColor = Utilities.getRandomColor();
    this.el = el;
    el.appendChild(this.node);

    this.points = 0;

    this.axesHeld = 0;



    this.body = new Body(el, this);

    this.currentDirection = null;
    this.SPEED = 250;

    this.boardVar = document.getElementById('board');
    this.headVar = document.getElementById('head');
    
    this.currentDirection = null;
    this.leftPosition = this.node.style.left = window.getComputedStyle(this.boardVar).width.replace('px', '') / 2 + 'px';
    this.topPosition = this.node.style.top = window.getComputedStyle(this.boardVar).height.replace('px', '') / 2 + 'px';

    setTimeout(() => {this.spawnAxe()}, Utilities.getRandomDelay(10, 15));

    setTimeout(this.move.bind(this), this.SPEED);
  }

  move() {
    const head = this.node;
    const direction = this.currentDirection;

    // console.log(parseInt(window.getComputedStyle(this.boardVar).width.replace('px', '')) + 50) + 'px';

    // initialize the variables to access the position of the snake 
    this.prevDown = head.style.top;
    this.prevLeft = head.style.left;
    this.topPosition = Number(this.prevDown.replace('px', ''));
    this.leftPosition = Number(this.prevLeft.replace('px', ''));

    if (this.checkCollisions(this, this.body)) {
      
      return;
    };
    
    // move the direction of the snake based on the arrow keys
    if (direction === 'right') {
      head.style.left = `${(this.leftPosition += 50)}px`;
    }

    if ( direction === 'left') {
      head.style.left = `${(this.leftPosition -= 50)}px`;
    }

    if (direction === 'up') {
      head.style.top = `${(this.topPosition -= 50)}px`;
    }

    if (direction === 'down') {
      head.style.top = `${(this.topPosition += 50)}px`;
    }

    this.checkTouchingAxe();
    
    // Check if head is touching apple
    if(Apple.isTouchingApple(null, this.body.bodyArray)) {
      // Remove apple
      this.points += Number(apple.getAttribute('points'));
      this.leaveEatenApple(apple);
      apple.remove();
      // create the new apple 
      const recreateApple = new Apple(this.boardVar);
      this.body.addSegment(this.prevLeft, this.prevTop);
      this.SPEED = this.SPEED * .9;
      this.updatePoints();
      this.body.randomizeBodyColors();
    }

    this.body.move();

    setTimeout(this.move.bind(this), this.SPEED);
  }

  gameover(gameOverMessage) {
    if (this.points >= 1250) {
      const gameBody = document.querySelector('body');
      // const parentNode = gameBody.parentNode;
      parentNode.removeChild(gameBody);
      parentNode.appendChild(contents);
      window.sessionStorage.setItem('passed', true);
      alert(`${gameOverMessage}\nYou scored enough points to access this website! :)\nGood job!`);
      return true;
    } else {
      alert(`${gameOverMessage}\nSorry, you did not collect enough points to access this website :(\n Try again!`);
      window.location.reload();
      return true;
    }
  }

  checkCollisions(head, body) {

    // initialize the variables to access the size of the board 
    const boundaryHoriz = window.getComputedStyle(this.boardVar).width.replace('px', '');
    const boundaryVert = window.getComputedStyle(this.boardVar).height.replace('px', '');
    const direction = head.currentDirection;

    const nextLeft = direction === 'right' ? head.leftPosition + 50 : direction === 'left' ? 
      head.leftPosition - 50 : head.leftPosition;
    const nextDown = direction === 'up' ? head.topPosition - 50 : direction === 'down' ? 
      head.topPosition + 50 : head.topPosition;

    let boundaryHit = false;
    // return if the snake is out of bounds so it stays in the boundaries of the board 
    if (direction === 'right' && nextLeft >= boundaryHoriz) {
      boundaryHit = true;
    }
    if (direction === 'left' && nextLeft < 0) {
      boundaryHit = true;
    }
    if (direction === 'up' && nextDown < 0) {
      boundaryHit = true;
    }
    if (direction === 'down' && nextDown >= boundaryVert) {
      boundaryHit = true;
    }

    if (boundaryHit) {
      document.getElementsByClassName('gameover').textContent = `SCORE: ${this.points}`
      return this.gameover(`You hit a boundary. Game Over!\nYou scored ${this.points} points!`);
    }

    for (let i = 1; i < this.body.bodyArray.length; i++) {
      const segment = this.body.bodyArray[i];
      // check if the body pieces are colliding 
      if (segment.posLeft === nextLeft + 'px' && segment.posDown === nextDown + 'px') {
        return this.gameover(`You ate your tail. Game Over!\nYou scored ${this.points} points!`);
      }
    }

    const tree = document.getElementById('tree');
    if (tree !== (null && undefined)) {
      if (tree.style.left === nextLeft + 'px' && tree.style.top === nextDown + 'px') {
        if (this.axesHeld > 0) {
          this.spawnTreeStump(tree);
          tree.remove();
          // setTimeout(() => {this.spawnTree()}, Utilities.getRandomDelay(5, 15))
          this.axesHeld--;
          this.updateAxes();
        } else {
          return this.gameover(`You ran into a tree! Game Over!\nYou scored ${this.points} points!`);
        }
      }
    }
  }

  leaveEatenApple(apple) {
    const eatenApple = document.createElement('img');
    eatenApple.setAttribute('id', 'eaten-apple')
    eatenApple.setAttribute('src', 'https://i.imgur.com/f1eWxQO.png');
    eatenApple.style.left = apple.style.left;
    eatenApple.style.top = apple.style.top;
    this.el.appendChild(eatenApple);

    setTimeout(() => eatenApple.remove(), 5000);
  }

  checkTouchingAxe() {
    const axe = document.getElementById('axe');

    if (axe !== (null && undefined)) {
      if (this.leftPosition + 'px' === axe.style.left && this.topPosition + 'px' === axe.style.top) {
        this.axesHeld++;
        this.updateAxes();

        setTimeout(() => {this.spawnAxe()}, Utilities.getRandomDelay(10, 15));
        axe.remove();
        this.body.randomizeBodyColors();
      }
    }
  }

  spawnAxe() {
    const spawnPos = Utilities.getValidSpawn();

    const axe = document.createElement('img');
    axe.setAttribute('id', 'axe');
    axe.setAttribute('src', 'https://i.imgur.com/T3ptf1j.png');

    axe.style.left = spawnPos[0] + 'px';
    axe.style.top = spawnPos[1] + 'px';
    
    this.el.appendChild(axe);
  }

  spawnTreeStump(tree) {
    const stump = document.createElement('img');
    stump.setAttribute('id', 'stump');
    stump.setAttribute('src', 'https://i.imgur.com/TDFwxCk.png');

    stump.style.left = tree.style.left;
    stump.style.top = tree.style.top;

    this.el.appendChild(stump);
    setTimeout(() => {stump.remove()}, 5000);
  }

  updatePoints() {
    const scoreboard = document.getElementsByClassName('score')[0];
    scoreboard.style.backgroundColor = Utilities.getRandomColor();
    document.getElementsByClassName('score-text')[0].textContent = `SCORE: ${this.points}`;
  }

  updateAxes() {
    document.getElementsByClassName('score-text')[2].textContent = `AXES: ${this.axesHeld}`;
  }

}

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


function startgame(parentNode) {
parentNode.removeChild(contents);
// parentNode.removeChild(head);
// const body = document.createElement('body');


const url = chrome.runtime.getURL('./snake/index.html');
// contents.innerHTML = fetch(url);

// let doc;

  fetch(url)
    .then(function(response) {
      return response.text()
    })
    .then(function(html) {
      var parser = new DOMParser();
      doc = parser.parseFromString(html, "text/html");
      // parentNode.appendChild(doc.firstChild.firstChild);
      parentNode.appendChild(doc.firstChild.lastChild);
      // parentNode.appendChild(doc.querySelector('head'))
      // contents.innerHTML = doc;
    })
      // function(response) {
      //   if (response.status !== 200) {
      //     console.log('Looks like there was a problem. Status Code: ' +
      //       response.status);
      //     return;
      //   }

        // Examine the text in the response
      //   response.json.then(function(data) {
          // console.log(response.url);
        // });
  //     }
  //   )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  // contents.innerHTML = "<iframe src=\"snake/index.html\"></iframe>"


  // async function getData() {
  //   const resp = await fetch(chrome.runtime.getURL('./snake/index.html'));
  //   console.log(resp);
  //   return resp
  // }




// contents.innerHTML;

// async function getHTML() {
//   const resp = await fetch("snake/index.html");
//   console.log(resp);
//   return data;
// }

setTimeout(() => {
    // console.log(doc);
    const body = document.querySelector('body');
    const board = document.getElementById('board');
    console.log(document);
  
    console.log("running");
  
    const head = new Head(board);
    new Apple(board, head.body.bodyArray);
  
    body.addEventListener('keydown', (e) => {
      const direction = head.currentDirection;
  
      if (e.code === 'ArrowLeft') {
        if (direction === 'right') return;
        head.currentDirection = 'left';
      }
  
      if (e.code === 'ArrowRight') {
        if (direction === 'left') return;
        head.currentDirection = 'right';
      }
  
      if (e.code === 'ArrowUp') {
        if (head.currentDirection === 'down') return;
        head.currentDirection = 'up';
      }
  
      if (e.code === 'ArrowDown') {
        if (direction === 'up') return;
        head.currentDirection = 'down';
      }
    });
  }, 250);
}