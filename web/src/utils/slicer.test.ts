import slicer from './slicer'

const before = [
  { 'id': 1, 'name': 'kanziw' },
  { 'id': 2, 'name': 'yunsub' },
  { 'id': 3, 'name': 'backend' },
  { 'id': 4, 'name': 'frontend' },
  { 'id': 5, 'name': 'kubernetes' },
]

const expected1 = [
  { 'id': 1, 'name': 'kanziw' },
  { 'id': 2, 'name': 'yunsub' },
]

const expected2 = [
  { 'id': 3, 'name': 'backend' },
  { 'id': 4, 'name': 'frontend' },
]

const expected3 = [
  { 'id': 5, 'name': 'kubernetes' },
]

it('slicer', () => {
  const [ result1, result2, result3, result4 ] = slicer(before, 2)
  expect(result1).toEqual(expected1)
  expect(result2).toEqual(expected2)
  expect(result3).toEqual(expected3)
  expect(result4).toBeUndefined()
})
