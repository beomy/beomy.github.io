import { ITreeItem } from '@/model/tree';

export function arrayToTree(arr: string[][]) {
  const tree: ITreeItem[] = [];
  for (const sub of arr) {
    let travel = tree;
    for (const key of sub) {
      const item: ITreeItem = { key, children: [] };
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
        travel = target.children;
      }
    }
  }
  return tree;
}
