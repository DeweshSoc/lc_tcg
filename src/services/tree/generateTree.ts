import { Queue } from "@datastructures-js/queue";

import {getRandomNoInRange} from "../index";


/**
 * generateTree - generate a string representation of a random tree
 *  @param {number} maxNodes - maximum number of nodes possible in the tree
 *  @param {number} minEle - minimum possible element
 *  @param {number} maxEle - maximum possible element
 *  @return {string} - string representation of a random tree
 */
export const generateTree = (maxNodes:number, minEle:number, maxEle:number):string => {

  console.log(`\x1b[35mgenerateTree() -  \x1b[36mgenerating tree...\x1b[0m`);
  let maxNodesToInsert = maxNodes;
  const treeString: Array<string> = [];
  const pendingNodes:Queue<number | null> = new Queue();

  const root = getRandomNoInRange(minEle, maxEle);
  pendingNodes.push(root);
  maxNodesToInsert--;

  while (!pendingNodes.isEmpty()) {
    const front = pendingNodes.front();
    pendingNodes.pop();

    if (!front) {
      treeString.push("null");
      continue;
    }

    treeString.push(front.toString());

    if (maxNodesToInsert-- > 0 && Math.random() > 0.3) {
      pendingNodes.push(+getRandomNoInRange(minEle, maxEle));
    } else {
      pendingNodes.push(null);
    }

    if (maxNodesToInsert-- > 0 && Math.random() > 0.3) {
      pendingNodes.push(+getRandomNoInRange(minEle, maxEle));
    } else {
      pendingNodes.push(null);
    }
  }

  return "[" + treeString.join(",") + "]";
};

