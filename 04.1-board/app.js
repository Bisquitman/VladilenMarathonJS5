const SQUARES_NUMBER = 625;
const maxX = 25;
const maxY = 25;
const board = document.querySelector('#board');
const fragment = document.createDocumentFragment();
const SPEED = 15;

const square = () => {
  const el = document.createElement('div');
  el.className = 'square';
  return el;
};

const randomColor = (() => {
  let rgb = [255, 0, 0];
  let index = 0;
  let direction = +SPEED;
  return () => {
    const [r, g, b] = rgb = rgb.map((v, i) => i !== index ? v + direction : v);
    rgb.filter((val, i) => i !== index && val >= 255).length && (index = ++index <= 2 ? index : 0, direction = -SPEED);
    rgb.filter((val, i) => i !== index && val <= 0).length && (direction = +SPEED);
    return `rgb(${r}, ${g}, ${b})`;
  };
})();

const removeColor = ({ style }) => {
  style.backgroundColor = '#1d1d1d';
  style.boxShadow = '0 0 2px #000';
}


const squares = Array.from(Array(SQUARES_NUMBER)).map(square);
fragment.append(...squares);
board.append(fragment);
board.addEventListener('click', e => e.target.classList.contains('square') && waves(e.target));

const indexToCoords = (index) => [Math.floor(index / maxX), index % maxX];
const coordsToIndex = (y, x) => y * maxY + x;
const squareCoords = (y, x, size, mxY = maxY, mxX = maxX) => {
  const coords = [];
  const rowMax = size * 2 + 1;
  const middlePoint = Math.floor(rowMax / 2);
  const [sY, sX] = [y - middlePoint, x - middlePoint];
  const [sMaxY, sMaxX] = [sY + rowMax - 1, sX + rowMax - 1];
  for (let i = 0; i < rowMax; i++) {
    for (let j = 0; j < rowMax; j++) {
      let rowY = sY + i; let rowX = sX + j;
      if ((rowX >= 0 && rowY >= 0 && rowX < mxX && rowY < mxY)
        && (rowX !== x || rowY !== y)
        && ((rowY >= sY && rowY <= sMaxY && (rowX === sX || rowX === sMaxX))
          || (rowX >= sX && rowX <= sMaxX && (rowY === sY || rowY === sMaxY)))
      ) {
        coords.push([rowY, rowX]);
      }
    }
  }
  return coords;
};

const waves = (el) => {
  const elIndex = squares.findIndex(_ => _ === el);
  const maxCoords = [maxY, maxX];
  const curCoords = indexToCoords(elIndex);
  const middle = Math.floor(Math.max(...maxCoords) / 2);
  const [y, x] = curCoords;
  const iterations = Math.max(...[middle + Math.abs(y - middle), middle + Math.abs(x - middle)]);
  const squaresCoords = [];
  for (let i = 1; i <= iterations; i++) {
    squaresCoords.push(squareCoords(y, x, i).map(_ => coordsToIndex(..._)));
  }

  squaresCoords.forEach((coords, ind) => {
    const color = randomColor();
    setTimeout(() => coords.forEach(i => {
      squares[i].style.backgroundColor = color
      squares[i].style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
      setTimeout(() => coords.forEach(i => removeColor(squares[i])), 500);
    }), 100 * ind);
  });
};