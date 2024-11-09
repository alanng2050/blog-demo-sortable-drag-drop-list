const values: { [key: number]: string } = {}

Array.from({ length: 20 }).forEach((_, index) => {
  const value = (index + 1) * 4
  values[index + 1] = `${value}px`
})

export const radii = values
