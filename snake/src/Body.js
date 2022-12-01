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
