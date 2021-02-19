/**
 * @param {string[]|number[]|boolean[]} arr1
 * @param {string[]|number[]|boolean[]} arr2
 * @return {boolean}
 */
const isEqual = (arr1, arr2) => (arr1.length === arr2.length) && arr1.every((elem, index) => elem === arr2[index]);
/**
 * @param {string[]|number[]|boolean[]} arr1
 * @param {string[]|number[]|boolean[]} arr2
 * @return {boolean}
 */
const isEqualUnordered = (arr1, arr2) => (arr1.length === arr2.length) && arr1.every(elem => arr2.includes(elem));
/**
 * @param {string[]|number[]|boolean[]} arr1
 * @param {string[]|number[]|boolean[]} arr2
 * @return {[]}
 */
const leftDiff = (arr1, arr2) => arr1.filter((field) => !arr2.includes(field));

export default { isEqual, leftDiff, isEqualUnordered };
