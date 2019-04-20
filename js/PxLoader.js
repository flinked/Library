

class PxLoader
{
    /**
     * Constructor
     */
    constructor( MainEl, endCallback, progressCallBack )
    {
      this.loaderEl = document.querySelector('.loader')
      this.endLoading = false;
      this.endAnimation = false;
      this.media = {
        image: [],
        video: [],
      }
      this.endCallback = endCallback
      this.progressCallBack = progressCallBack
    }

    getBackground() {
      const elementNames = ["div", "body", "td"] // Put all the tags you want bg images for here
      const allBackgroundURLs = new Array();
      elementNames.forEach((tagName) => {
          const tags = document.getElementsByTagName(tagName);
          const numTags = tags.length;
          for (let i = 0; i < numTags; i++) {
              let tag = tags[i];
              if (tag.style.backgroundImage) {
                  let bg;
                  let bgTemp;
                  let pushUrl;

                  if(tag.style.backgroundImage.includes('"')) {
                    bg = tag.style.backgroundImage;
                    bgTemp = bg.replace('url("', "");
                    pushUrl = bgTemp.replace('")', "")
                  } else {
                    bg = tag.style.backgroundImage;
                    bgTemp = bg.replace('url(', "");
                    pushUrl = bgTemp.replace(')', "")
                  }
                  if(!this.media.image.includes(pushUrl)) {
                    this.media.image.push(pushUrl);
                  }
              }
          }
      })
    }

    getImageTag() {
      let allImage = document.querySelectorAll('img')

      if(document.querySelector('img')) {
        allImage.forEach(image => {
          let pushUrl = image.getAttribute('src')
          if(!this.media.image.includes(pushUrl)) {
            this.media.image.push(pushUrl);
          }
        });
      }
    }

    getVideoTag() {
      let allVideo = document.querySelectorAll('video')

      if(document.querySelector('video')) {
        allVideo.forEach(video => {
          let pushUrl = video.getAttribute('src')
          if(!this.media.video.includes(pushUrl)) {
            if(pushUrl !== null) {
              this.media.video.push(pushUrl);
            }
          }
        });
      }
    }

    scrapMedia() {
      this.getBackground()
      this.getImageTag()
    }

    initLoader() {
      const loader = new PxLoader()

      this.media.image.forEach(element => {

        var pxImage = new PxLoaderImage(element);

        loader.add(pxImage);
      });

      this.media.video.forEach(element => {

        var pxImage = new PxLoaderVideo(element);

        loader.add(pxImage);
      });

      loader.addProgressListener((e) => {

        let value = 100 / e.totalCount
        let total = e.totalCount
        let current = Math.round(e.completedCount * value)

        this.progressCallBack(current, total)

        if(e.completedCount === e.totalCount) {
          this.endLoading = true;
          //  end of loading
          this.endCallback(current, total)
        }

      });

      loader.start();
    }

    init() {
        this.scrapMedia()
        this.initLoader()
    }
}

export default PxLoader
