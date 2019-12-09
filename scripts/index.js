import a from './a.js'
import b from './b'
import d from './d'
import $ from 'jquery'
const s = () => {
  a.init();
  a.cinit();
  b()
  d()
  console.log($)
}
s()
