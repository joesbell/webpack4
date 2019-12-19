import ass from './a.css'
import c from './c'
const a = {
  init() {
    console.log("a.init");
    // const divElement = document.createElement('div');
    // divElement.className = ass['my-class'];
  },
  cinit() {
    c.init()
  }
}
export default a