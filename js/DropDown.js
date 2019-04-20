class DropDown
{
    /**
     * Constructor
     */
    constructor( item, buttonItem, containerItem, contentItem )
    {
        this.dropDownItem = document.querySelectorAll(item)
        this.contentItem = contentItem
        this.buttonItem = buttonItem
        this.containerItem = containerItem
        this.item = item
    }

    dropDownItem(element) {
        let button = element.querySelector(this.buttonItem)
        let container = element.querySelector(this.containerItem)
        let txt = element.querySelector(this.contentItem)
        let height = txt.offsetHeight + 30
        if(element.classList.contains(`${this.item}--active`)) {
            container.style.maxHeight = `${height}px`
        }

        button.addEventListener('click', (e) => {
            e.preventDefault()
            if(document.querySelector(`${this.item}--active`)) {
                let activeItem = document.querySelector(`${this.item}--active`)
                let containerActive = activeItem.querySelector(this.contentItem)
                if(!element.classList.contains(`${this.item}--active`)) {
                    containerActive.style.maxHeight = `0px`
                    activeItem.classList.remove(`${this.item}--active`)
                }
            }

            if(!element.classList.contains(`${this.item}--active`)) {
                container.style.maxHeight = `${height}px`
                element.classList.add(`${this.item}--active`)
            } else {
                container.style.maxHeight = `0px`
                element.classList.remove(`${this.item}--active`)
            }
        })
    }

    allServices() {
        this.dropDownItem.forEach(element => {
            this.dropDownItem(element)
        });
    }

    init() {
        if(document.querySelector(this.item)) {
            this.allServices()
        }
    }
}

export default DropDown
