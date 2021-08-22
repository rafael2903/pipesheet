import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

if (process.browser) {
  var notyf = new Notyf({
    duration: 3000,
    ripple: false,
    position: {
      x: 'right',
      y: 'top',
    },
  })
}

export default notyf
