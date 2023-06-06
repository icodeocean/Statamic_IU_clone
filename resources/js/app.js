import Alpine from 'alpinejs'
import './modal'
import collapse from '@alpinejs/collapse'
import focus from '@alpinejs/focus'
import intersect from '@alpinejs/intersect'
import bodyData from './alpine/data/body'
import headerNavigationData from './alpine/data/header-navigation'
import searchData from './alpine/data/search'
import { setDomElementsToWindow } from './common/dom-elements'
import asyncModuleLoading from './core/async-module-loading'

window.Alpine = Alpine
Alpine.plugin(collapse)
Alpine.plugin(focus)
Alpine.plugin(intersect)
Alpine.data('body', bodyData)
Alpine.data('headerNavigation', headerNavigationData)
Alpine.data('search', searchData)
Alpine.start()

setDomElementsToWindow()
asyncModuleLoading()
