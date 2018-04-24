
let $buttons = $('#buttonWrapper>button')
let $sliders = $('#sliders')
let $images = $sliders.children('img')
let current = 0

makeFakeSlides()
$sliders.css({transform: 'translateX(-400px)'})
bingEvents()









//封装函数
function makeFakeSlides(){
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length-1).clone(true)
    //console.log($lastCopy[0].outerHTML)
    $sliders.append($firstCopy)
    $sliders.prepend($lastCopy)
} //闭包

function bingEvents(){
    $buttons.eq(0).on('click', function(){
        if(current == 2){
            console.log('从第三张到第一张')
            $sliders.css({transform: 'translateX(-1600px)'})
                .one('transitionend', function(){
                    $sliders.hide()
                        .offset()
                    $sliders.css({transform: 'translateX(-400px)'}).show()
                })
        }else{
            $sliders.css({transform: 'translateX(-400px)'})
        }
        current = 0
    })
    $buttons.eq(1).on('click', function(){
        console.log(current)
        $sliders.css({transform: 'translateX(-800px)'})
        current = 1
    })
    $buttons.eq(2).on('click', function(){
        if(current == 0){
            console.log('从第一张到第三张')
            $sliders.css({transform: 'translateX(0px)'})
            .one('transitionend', function(){
                $sliders.hide()
                    .offset()
                $sliders.css({transform: 'translateX(-1200px)'}).show()
            })
    
        }else{
            $sliders.css({transform: 'translateX(-1200px)'})
        }
        current = 2
    })
}