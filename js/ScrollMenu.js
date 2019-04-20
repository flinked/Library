class ScrollMenu
{
    /**
     * Constructor
     */
    constructor( menuEl, mobileMenuEl )
    {
        this.menuEl = document.querySelector(menuEl)
        this.mobileMenu = document.querySelector(mobileMenuEl)
        this.bgMenu = false;
        this.mobile = false
        this.prevScrollValue = 0
        this.hide = false;
    }

    scrollCallBack(scrollValue) {
        if(scrollValue > 30) {
            if(this.bgMenu === false) {
                this.bgMenu = true
            }
            if(this.hide === false && this.prevScrollValue < scrollValue) {
                this.hide = true
                this.menuEl.classList.add('hide')
                this.mobileMenu.classList.add('hide')
            } else if(this.hide === true && this.prevScrollValue > scrollValue) {
                this.hide = false
                this.menuEl.classList.remove('hide')
                this.menuEl.classList.add('background')
                this.mobileMenu.classList.remove('hide')
                this.mobileMenu.classList.add('background')
            }
        } else if(scrollValue < 30) {
            if(this.bgMenu === true) {
              this.bgMenu = false
              this.menuEl.classList.remove('background')
              this.mobileMenu.classList.remove('background')
            }
        }

        this.prevScrollValue = scrollValue
    }

    scrollEvent() {
        window.addEventListener('scroll', (e) => {
            this.scrollCallBack(window.scrollY)
        })
    }

    init() {
        this.scrollEvent()
    }
}

export default ScrollMenu
