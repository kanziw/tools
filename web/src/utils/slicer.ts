const slicer = <T>(
  arr: Array<T>,
  num: number,
  result: Array<Array<T>> = [],
): Array<Array<T>> => {
  if (!Array.isArray(arr)) {
    throw new Error('Only array should be sliced')
  }
  if (!arr.length) { return result }

  const [ sliced, remain ] = [ arr.slice(0, num), arr.slice(num) ]
  return slicer(remain, num, result.concat([ sliced ]))
}

export default slicer
