function flattenArray(arr) {
    let flattenedArr = [];
    arr.forEach(element => 
        Array.isArray(element) ? flattenedArr.push(...flattenArray(element)) : flattenedArr.push(element)
    );
    return flattenedArr; 
}
const arr = [[1, [2, [3]]], 4, [5, [6, [7]]]];
console.log(flattenArray(arr)); 
