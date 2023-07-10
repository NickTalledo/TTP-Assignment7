function findMissingNumber(nums) {
  // Perform cyclic sort
  let i = 0;
  while (i < nums.length) {
    if (nums[i] !== i && nums[i] < nums.length) {
      // Swap the number to its correct position
      let temp = nums[i];
      nums[i] = nums[temp];
      nums[temp] = temp;
    } else {
      i++;
    }
  }

  // Find the missing number
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i) {
      return i;
    }
  }

  // If no missing number found, return the next number
  return nums.length;
}

// Testing
let nums = [3, 0, 1];
console.log(findMissingNumber(nums)); // Output: 2

nums = [9, 6, 4, 2, 3, 5, 7, 0, 1];
console.log(findMissingNumber(nums)); // Output: 8

/*
In this solution, I used the cyclic sort algorithm to sort the array in place. 
After sorting, we iterate through the array to find the first number that is not 
equal to its index, which indicates the missing number. If no missing number is found, 
it means the missing number is the next number in the range. The time complexity of this
solution is O(n), where n is the length of the array.
*/

var findErrorNumbers = function (nums) {
  let i = 0;
  while (i < nums.length) {
    if (
      nums[i] !== i + 1 &&
      nums[i] <= nums.length &&
      nums[nums[i] - 1] !== nums[i]
    ) {
      // Swap the numbers to their correct positions
      let temp = nums[i];
      nums[i] = nums[temp - 1];
      nums[temp - 1] = temp;
    } else {
      i++;
    }
  }

  // Find the duplicate and missing numbers
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      result.push(nums[i]); // Duplicate number
      result.push(i + 1); // Missing number
      break;
    }
  }

  return result;
};

// Testing
nums = [1, 2, 2, 4];
console.log(findErrorNumbers(nums)); // Output: [2, 3]

nums = [3, 1, 3, 4, 5];
console.log(findErrorNumbers(nums)); // Output: [3, 2]

/*
In this solution, we perform cyclic sort to rearrange the numbers in the array to their 
correct positions. During the sort, if we encounter a number that is not equal to its 
index plus 1 and is within the range of the array, we swap it to its correct position. 
Once the cyclic sort is done, we iterate through the array to find the first number that 
is not equal to its index plus 1. This number represents the duplicate number, and its 
index plus 1 represents the missing number. We return both numbers in the form of an array.
*/

var findDisappearedNumbers = function (nums) {
  let i = 0;
  while (i < nums.length) {
    if (nums[i] !== nums[nums[i] - 1]) {
      // Swap the numbers to their correct positions
      let temp = nums[i];
      nums[i] = nums[temp - 1];
      nums[temp - 1] = temp;
    } else {
      i++;
    }
  }

  // Collect the missing numbers
  let missingNumbers = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      missingNumbers.push(i + 1);
    }
  }

  return missingNumbers;
};

// Testing
nums = [4, 3, 2, 7, 8, 2, 3, 1];
console.log(findMissingNumbers(nums)); // Output: [5, 6]

nums = [1, 1];
console.log(findMissingNumbers(nums)); // Output: [2]

/* 
In this solution, we perform cyclic sort to rearrange the numbers in the array to their 
correct positions. During the sort, if we encounter a number that is not equal to the 
number at its correct position, we swap them. After the cyclic sort, the numbers that are 
not in their correct positions indicate the missing numbers. We iterate through the array 
and collect all the numbers that are not equal to their respective indices + 1, adding 
them to the missingNumbers array.
*/

function removeDuplicates(nums) {
  if (nums.length === 0) {
    return 0;
  }

  let uniqueCount = 1; // Count of unique elements
  let i = 0; // Slow pointer

  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j]; // Move the unique element to the next position
      uniqueCount++;
    }
  }

  return uniqueCount;
}

// Testing
nums = [1, 1, 2];
console.log(removeDuplicates(nums)); // Output: 2
console.log(nums); // Output: [1, 2]

nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
console.log(removeDuplicates(nums)); // Output: 5
console.log(nums); // Output: [0, 1, 2, 3, 4]

/*
In this solution, we use two pointers: i (slow pointer) and j (fast pointer). We 
initialize i to 0 to track the position where the next unique element should be placed. 
We iterate through the array with the j pointer starting from index 1. If nums[j] is 
different from nums[i], it means we have encountered a new unique element. We increment 
i, update nums[i] with nums[j], and increment the count of unique elements. By the end 
of the loop, i will be at the last position of the unique elements, and uniqueCount will 
represent the count of unique elements.
*/

function findDuplicate(nums) {
  // Phase 1: Find the intersection point of the two pointers
  let slow = nums[0];
  let fast = nums[0];

  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  // Phase 2: Move the slow pointer to the beginning and find the entrance of the cycle
  let ptr1 = nums[0];
  let ptr2 = slow;

  while (ptr1 !== ptr2) {
    ptr1 = nums[ptr1];
    ptr2 = nums[ptr2];
  }

  return ptr1;
}

// Testing
nums = [1, 3, 4, 2, 2];
console.log(findDuplicate(nums)); // Output: 2

nums = [3, 1, 3, 4, 2];
console.log(findDuplicate(nums)); // Output: 3

/* 
In this solution, we use two pointers: slow and fast. In the first phase, we move the 
slow pointer one step at a time while the fast pointer moves two steps at a time. 
Eventually, they will meet at a point within the cycle.

In the second phase, we reset the slow pointer to the beginning of the array while 
keeping the fast pointer at the meeting point. Both pointers now move one step at a 
time until they meet again. The meeting point will be the entrance of the cycle, 
which corresponds to the repeated number in the array.

The time complexity of this solution is O(n), where n is the length of the array.
*/

function maxArea(height) {
  let maxArea = 0;
  let left = 0;
  let right = height.length - 1;

  while (left < right) {
    // Calculate the area between the two lines
    let area = Math.min(height[left], height[right]) * (right - left);
    maxArea = Math.max(maxArea, area);

    // Move the pointers based on the shorter line
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}

// Testing
let height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(maxArea(height)); // Output: 49

height = [4, 3, 2, 1, 4];
console.log(maxArea(height)); // Output: 16

/* 
In this solution, we use two pointers, left and right, initially pointing to the first 
and last lines of the array. We calculate the area between the two lines by taking the 
minimum height between them and multiplying it by the distance between them.

We maintain a variable maxArea to keep track of the maximum area found so far. In each 
iteration, we update maxArea if the current area is greater than the previous maximum.

To maximize the area, we move the pointers inward based on the shorter line. By doing 
so, we consider all possible pairs of lines, gradually reducing the width of the container 
while looking for taller lines.

The time complexity of this solution is O(n), where n is the length of the array.
*/
