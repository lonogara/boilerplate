// @flow
export const arr = (num) => [...numToArrG(num)]

function* numToArrG(num) {
  let from = 0
  while (from < num) {
    yield from
    from++
  }
}

