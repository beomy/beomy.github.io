import { TreeItem } from '@/model/tree';

export function arrayToTree(arr: string[][]) {
  const tree: TreeItem[] = [];
  for (const sub of arr) {
    let travel = tree;
    for (const key of sub) {
      const item: TreeItem = { key, counter: 1, children: [] };
      const target = travel.find((x) => x.key === key);
      if (!target) {
        travel.push(item);
        travel.sort((a, b) => {
          if (a.key < b.key) return -1;
          if (a.key > b.key) return 1;
          return 0;
        });
        travel = item.children;
      } else {
        target.counter += 1;
        travel = target.children;
      }
    }
  }
  return tree;
}
