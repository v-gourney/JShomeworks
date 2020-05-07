"use strict";
function treeSum(arr) {
        let sum = 0;
        arr.forEach (function (item) {
          if (Array.isArray(item))      
            sum += treeSum(item);
          else
            sum += item;
        })
        return sum;
      }

alert (treeSum ([5,7,[4,[2],8,[1,3],2],[9,[]],1,8]));
