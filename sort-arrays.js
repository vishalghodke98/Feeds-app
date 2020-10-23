/*
Q 2) Given 2 sorted arrays A and B with n and m elements respectively. A has enough space
at the end of the array to fit in all elements of B. Write an algorithm to merge the
elements of A and B ensuring the resultant A is sorted as well. The code cannot use an
extra array.
*/


/*function to handle a sort*/
mergeTwo = (a) => {
    const sort = a.sort((a, b) => { return a - b })
    console.log(sort)
}

/* Two sorted array*/

const b = [20, 22, 25, 27, 28, 29, 30, 32, 36, 37, 160, 200];
const a = [1, 3, 5, 6, 8, 9, 10, 12, 13, 15, 19, 100, ...b];
mergeTwo(a);
