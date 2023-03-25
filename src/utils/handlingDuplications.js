export const removeDuplicates =(arr)=>{
  return arr.filter((value, index) => arr.indexOf(value) === index);
}
