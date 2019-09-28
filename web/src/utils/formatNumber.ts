const formatNumber = (num: number, digit: number): string => (
  `${'0'.repeat(digit)}${num}`.slice(-digit)
)

export default formatNumber
