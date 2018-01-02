const getUnique = busArr => {
  return [...new Set(busArr.map(bus => bus.line))];
};

const naturalCompare = (a, b) => {
  let ax = [],
    bx = [];
  a.replace(/(\d+)|(\D+)/g, (_, $1, $2) => {
    ax.push([$1 || Infinity, $2 || ""]);
  });
  b.replace(/(\d+)|(\D+)/g, (_, $1, $2) => {
    bx.push([$1 || Infinity, $2 || ""]);
  });
  while (ax.length && bx.length) {
    let an = ax.shift();
    let bn = bx.shift();
    let nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
    if (nn) return nn;
  }
  return ax.length - bx.length;
};

const uniqueBusses = busses => {
  let uniqueLines = getUnique(busses);
  if (uniqueLines.length > 1) {
    uniqueLines.sort(naturalCompare);
  }
  return uniqueLines;
};

export default uniqueBusses;
