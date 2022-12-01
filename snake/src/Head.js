class Head {

  constructor(el) {
    this.node = document.createElement('div');
    this.node.setAttribute('id', 'head');
    this.node.setAttribute('class', 'snake');
    this.node.setAttribute('src', 'src/assets/snek-face.png');
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
      alert(`You hit a boundary. Game Over!\nYou scored ${this.points} points!`);
      return true;
    }

    for (let i = 1; i < this.body.bodyArray.length; i++) {
      const segment = this.body.bodyArray[i];
      // check if the body pieces are colliding 
      if (segment.posLeft === nextLeft + 'px' && segment.posDown === nextDown + 'px') {
        alert(`You ate your tail. Game Over!\nYou scored ${this.points} points!`);
        return true;
      }
    }

    const tree = document.getElementById('tree');
    if (tree !== (null && undefined)) {
      if (tree.style.left === nextLeft + 'px' && tree.style.top === nextDown + 'px') {
        if (this.axesHeld > 0) {
          this.spawnTreeStump(tree);
          tree.remove();
          setTimeout(() => {this.spawnTree()}, Utilities.getRandomDelay(5, 15))
          this.axesHeld--;
          this.updateAxes();
        } else {
          alert(`You ran into a tree! Game Over!\nYou scored ${this.points} points!`);
          return true;
        }
      }
    }
  }

  leaveEatenApple(apple) {
    const eatenApple = document.createElement('img');
    eatenApple.setAttribute('id', 'eaten-apple')
    eatenApple.setAttribute('src', 'src/assets/eaten-apple.png');
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
    axe.setAttribute('src', 'src/assets/axe.png');

    axe.style.left = spawnPos[0] + 'px';
    axe.style.top = spawnPos[1] + 'px';
    
    this.el.appendChild(axe);
  }

  spawnTreeStump(tree) {
    const stump = document.createElement('img');
    stump.setAttribute('id', 'stump');
    stump.setAttribute('src', 'src/assets/stump.png');

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
