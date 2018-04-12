import ko from 'knockout'
import template from './info-header.tpl.html'

class ViewModel {
    constructor(params) {
        this.header = params.header || ''
        this.color = params.color || 'blue'
        this.img = `resources/${params.img}`
    }
}

ko.components.register('info-header', { viewModel: ViewModel, template })
