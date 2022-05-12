type Value<T> = T & { children: Value<T>[] };

const dfs = <T extends { parentId: number; id: number }>(data: T[], parentId: number) => {
  const res: Value<T>[] = data
    .filter(item => item.parentId === parentId)
    .map(item => ({
      ...item,
      children: dfs(data, item.id),
    }));
  return res;
};

export default dfs;
