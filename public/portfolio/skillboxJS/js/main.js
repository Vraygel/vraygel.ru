import * as menuActiv from './components/MenuActiv.js'
import * as location from './components/Location.js'
import * as productFilter from './components/ProductFilter.js'
import * as productSort from './components/ProductSort.js'
import * as accordion from './components/Accordion.js'
import * as slider from './components/Slider.js'
import * as validate from './components/Validate.js'
import * as cartActiv from './components/CartActiv.js'


menuActiv.menuActiv()
location.location()
cartActiv.cartActiv()
productFilter.productFilterTypeCheked()
productFilter.productFilterStatusCheked()
productFilter.filterReset()
productSort.productSort()
productSort.productSortChange()
accordion.accordion()
slider.slider()
validate.validate()