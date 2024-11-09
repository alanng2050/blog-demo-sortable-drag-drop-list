const spaces: { [key: number]: string } = {}

Array.from({ length: 10 }).forEach((_, index) => {
  const value = (index + 1) * 4
  spaces[index + 1] = `${value}px`
})

export const space = spaces
