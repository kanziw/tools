const slicer = <T>(
  arr: Array<T>,
  size: number,
  result: Array<Array<T>> = [],
): Array<Array<T>> => {
  if (!Array.isArray(arr)) {
    throw new Error('Only array should be sliced')
  }
  if (!arr.length) { return result }

  const [ sliced, remain ] = [ arr.slice(0, size), arr.slice(size) ]
  return slicer(remain, size, result.concat([ sliced ]))
}

export default slicer
