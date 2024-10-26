/* Peak finder:
* Given the array [a, b, c, d, e, f, g, h, i],
* Position 2 is a peak iff b >= a && b >= c. 
* Position 9 is a peak iff i >= h.
* Find a peak if it exists. <--see 19:36 notes
* personal note: i'm going to return the index at which the peak exists
* 
*/

//okay so this wasn't even the fucking question, tee hee
//this is a peak finder that finds the HIGHEST peak, not just A peak
function highestPeakFinder(arr: number[]): number {
  let peak: number = 0
  for (let i = 1; i < arr.length; i++){
    if (arr[i + 1] === undefined && arr[i] > arr[peak]) {peak = i}
    if (arr[i-1] < arr[i] && arr[i+1] < arr[i]){
      if (arr[peak] < arr[i]) {peak = i}
      else {continue}
    }
  }
  return peak;
}

//actual solution
function peakFinder(arr: number[]): number {
  for (let i = 1; i < arr.length; i++){
    if (arr[i + 1] === undefined) {return i}
    else if (arr[i-1] < arr[i] && arr[i+1] < arr[i]){
      return i;
    }
  }
  return 0;
}
// console.log(peakFinder([9, 2, 3, 4, 5, 4, 3, 2, 1])) //test me

//recursive (binary) solution
function findPeak(arr: number[], left: number = 0, right: number = arr.length - 1) {
  // Find middle point
  const mid: number = Math.floor(left + (right - left) / 2);
  // Base case: If mid is first or last element and it's a peak
  if ((mid === 0 || arr[mid] >= arr[mid - 1]) && 
      (mid === arr.length - 1 || arr[mid] >= arr[mid + 1])) {
      return mid;
  }
  // If left element is greater, search left half
  if (mid > 0 && arr[mid - 1] > arr[mid]) {
      return findPeak(arr, left, mid - 1);
  }
  // If right element is greater, search right half
  return findPeak(arr, mid + 1, right);
}



//Find 2D peak

//attempt one does not work, as the peak on a given row might not be on the column that contains a peak. this simply finds two 1D peaks
function attemptOne (grid: number[][]): number {
  let midRow: number[] = grid[Math.floor(grid.length/2)];
  let midPeak: number = findPeak(midRow, 0, midRow.length - 1)
  let peak: number = midRow[midPeak];
  for (let i = 0; i < grid.length; i++){
    grid[i][midPeak] > peak ? peak = grid[i][peak] : peak = peak;
  }
  return peak;
}

//attemptTwo
function findPeak2D(grid: number[][]): number[] {
  if (!grid || grid.length === 0 || grid[0].length === 0) {
      return [-1, -1];
  }
  const rows = grid.length;
  const cols = grid[0].length;
  // Helper to check if a position is a peak
  function isPeak(row: number, col: number): boolean {
      const current = grid[row][col];
      // Check up
      if (row > 0 && grid[row - 1][col] >= current) return false;
      // Check down
      if (row < rows - 1 && grid[row + 1][col] >= current) return false;
      // Check left
      if (col > 0 && grid[row][col - 1] >= current) return false;
      // Check right
      if (col < cols - 1 && grid[row][col + 1] >= current) return false;
      return true;
  }

  function findPeakUtil(startCol: number, endCol: number): number[] {
      // Find middle column
      const midCol = Math.floor(startCol + (endCol - startCol) / 2);
      // Find the maximum element in the middle column
      let maxRow = 0;
      for (let row = 0; row < rows; row++) {
          if (grid[row][midCol] > grid[maxRow][midCol]) {
              maxRow = row;
          }
      }
      // Check if the maximum element is a peak
      if (isPeak(maxRow, midCol)) {
          return [maxRow, midCol];
      }
      // If the element to the left is greater, search left half
      if (midCol > 0 && grid[maxRow][midCol - 1] > grid[maxRow][midCol]) {
          return findPeakUtil(startCol, midCol - 1);
      }
      // If the element to the right is greater, search right half
      if (midCol < cols - 1 && grid[maxRow][midCol + 1] > grid[maxRow][midCol]) {
          return findPeakUtil(midCol + 1, endCol);
      }
      // This case shouldn't happen if there's a peak
      return [maxRow, midCol];
  }
  return findPeakUtil(0, cols - 1);
}

// Example usage:
const grid = [
  [10, 8,  10, 10],
  [14, 13, 12, 11],
  [15, 9,  11, 21],
  [16, 17, 19, 20]
];    