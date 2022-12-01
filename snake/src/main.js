document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const board = document.querySelector('#board');

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
});
