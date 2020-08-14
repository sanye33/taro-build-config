import { add, cut } from '../../utils/count'


export const newAdd = (a, b) => {
  return a * add(a, b)
}

export const newCut = (a) => {
  return a * cut(a)
}