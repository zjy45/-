var showImageAtIndex = function(slide, index) {
    var nextIndex = index
    slide.dataset.active = nextIndex
    var className = 'class-active'
    removeClassAll(className)
    var nextSelector = '#id-classimage-' + String(nextIndex)
    var img = e(nextSelector)
    img.classList.add(className)

    var indiClassName = 'class-white'
    removeClassAll(indiClassName)

    var indiSelector = '#id-indi-' + String(nextIndex)
    var indicator = e(indiSelector)
    indicator.classList.add(indiClassName)
}

var nextIndex = function(slide, offset) {
    var numberOfImgs = Number(slide.dataset.imgs)
    var activeIndex = Number(slide.dataset.active)

    var i = (numberOfImgs + activeIndex + offset) % numberOfImgs
    return i
}

var bindEventSlide = function() {
    var selector = '.class-slide-button'
    bindAll(selector, 'click', function(event) {
        log('click next')
        var button = event.target
        var slide = button.parentElement
        var offset = Number(button.dataset.offset)
        var index = nextIndex(slide, offset)
        showImageAtIndex(slide, index)
    })
}

var bindEventIndicator = function() {
    var selector = '.class-slide-indi'
    bindAll(selector, 'mouseover', function(event) {
        log('indi 小圆点')
        var self = event.target
        var index = Number(self.dataset.index)
        log('index', index, typeof(index))
        var slide = self.closest('.class-slide')
        // 直接播放第 n 张图片
        showImageAtIndex(slide, index)
    })
}

// 显示下一张图片
var playNextImage = function() {
    var slide = e('.class-slide')
    var index = nextIndex(slide, 1)
    showImageAtIndex(slide, index)
}

// 每 2s轮播
var autoPlay = function() {
    var interval = 2000
    setInterval(function() {
        playNextImage()
    }, interval)
}

bindEventSlide()
bindEventIndicator()
autoPlay()

var slideimages = function() {
    bindEventSlide()
    bindEventIndicator()
    autoPlay()
}
