const flat = <T extends { children: T[] }>(data: T[]) => {
  const res: T[] = [];
  data.map(item => {
    res.push(item);
    if (item.children && item.children.length) {
      res.push(...flat(item.children));
    }
    return item;
  });
  return res;
};

export default flat;
