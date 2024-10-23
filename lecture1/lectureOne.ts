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

//recursive solution
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