
let $buttons = $('#buttonWrapper>button')
let $sliders = $('#sliders')
let $images = $sliders.children('img')
let current = 0

makeFakeSlides()
$sliders.css({transform: 'translateX(-400px)'})
//bingEvents()

$('#buttonWrapper').on('click', 'button', function(e){
    let $button = $(e.currentTarget)
    let index = $button.index()
    goToSlide(index)
})

$('#previous').on('click', function(){
    goToSlide(current - 1)
})
$('#next').on('click', function(){
    goToSlide(current + 1)
})

let timer = setInterval(function(){
    goToSlide(current + 1)
}, 1000)
$('.container').on('mouseenter', function(){
    clearInterval(timer)
}).on('mouseleave', function(){
    timer = setInterval(function(){
        goToSlide(current + 1)
    }, 1000)    
})





//封装函数
function makeFakeSlides(){
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length-1).clone(true)
    //console.log($lastCopy[0].outerHTML)
    $sliders.append($firstCopy)
    $sliders.prepend($lastCopy)
} //闭包

function goToSlide(index){
    if(index > $buttons.length - 1){
        index = 0
    }else if(index < 0){
        index = $buttons.length - 1
    }

    if(current === $buttons.length - 1 && index === 0){
        //最后一张到第一张
        $sliders.css({transform: `translateX(${- ($buttons.length+1) * 400}px)`})
            .one('transitionend', function(){
                $sliders.hide().offset()
                $sliders.css({transform: `translateX(-400px)`}).show()
            })
    }else if(current === 0 && index === $buttons.length - 1){
        //第一张到最后一张
        $sliders.css({transform: `translateX(0)`})
        .one('transitionend', function(){
            $sliders.hide().offset()
            $sliders.css({transform: `translateX(${-(index + 1) * 400}px)`}).show()
        })
    }else{
        $sliders.css({transform: `translateX(${-(index+1) * 400}px)`})
    }
    current = index
}