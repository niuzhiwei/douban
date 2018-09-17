$('footer>div').on('click',function(){
    var index = $(this).index()
    $('section').eq(index).show().siblings().hide()
    $(this).addClass('active').siblings().removeClass('active')
})

var value = null
$('#search .button').on('click',function(){
    value =$('#search input').val()
    startSearch()
})

var index = 0
var isLoading = false
start()

function start(){
    if(isLoading) return
    isLoading = true
    $('.loading').show()
    $.ajax({
        url:'http://api.douban.com/v2/movie/top250',
        type:'GET',
        data:{
            start:index,
            count:20
        },
        dataType:'jsonp'
    }).done(function(ret){
        console.log(ret)
        setData(ret)
        index +=20
        isLoading = false
    }).fail(function(){
        console.log('error')
    }).always(function(){
        isLoading = false
        $('.loading').hide()
    })
}


$('main').on('scroll',function(){
    if($('main').height()+$('main').scrollTop() >= ($('section').eq(0).height()-10)){
        start()
    }
    })



function setData(data){
   data.subjects.forEach(function(movie){
       var tpl = `
       <div class="item">
       <a href="#">
           <div class="cover">
               <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
           </div>
           <div class="detail">
               <h2>霸王别姬</h2>
               <div class="extra"><span class="score">9.3分</span> / 1000收藏</div>
               <div class="extra">1994 / 剧情、爱情</div>
               <div class="extra">导演: 张艺谋</div>
               <div class="extra">主演: 张国荣、张丰毅、巩俐</div>
           </div>
       </a>
   </div>
             ` 
        var $node = $(tpl)
        $node.find('.cover img').attr('src',movie.images.small)
        $node.find('.detail h2').text(movie.title)
        $node.find('.extra .score').text(movie.rating.average)
        $node.find('.extra .collect').text(movie.collect_count)
        $node.find('.extra .year').text(movie.year)
        $node.find('.extra .genres').text(movie.genres.join('/'))
        $node.find('.extra .direction').text(function(){
            var directionArr =[]
            movie.directors.forEach(function(item){
                directionArr.push(item.name)
            })
            return directionArr.join('、')
        })
        $node.find('.extra .cast').text(function(){
            var castArr =[]
            movie.casts.forEach(function(item){
                   castArr.push(item.name)
            })
            return castArr.join('、')
        })
        $('#top250').append($node)
   })
}

startUs()
function startUs(){
    $('.loading').show()
    $.ajax({
        url:'http://api.douban.com/v2/movie/us_box',
        type:'GET',
        dataType:'jsonp'
    }).done(function(ret){
        console.log(ret)
        setDataUs(ret)
    }).fail(function(){
        console.log('error')
    }).always(function(){
        $('.loading').hide()
    })
}

function setDataUs(data){
    data.subjects.forEach(function(movie){
        var tpl = `
        <div class="item">
        <a href="#">
            <div class="cover">
                <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
            </div>
            <div class="detail">
                <h2>霸王别姬</h2>
                <div class="extra"><span class="score">9.3分</span> / 1000收藏</div>
                <div class="extra">1994 / 剧情、爱情</div>
                <div class="extra">导演: 张艺谋</div>
                <div class="extra">主演: 张国荣、张丰毅、巩俐</div>
            </div>
        </a>
    </div>
              ` 
         var $node = $(tpl)
         $node.find('.cover img').attr('src',movie.subject.images.small)
         $node.find('.detail h2').text(movie.subject.title)
         $node.find('.extra .score').text(movie.subject.rating.average)
         $node.find('.extra .collect').text(movie.subject.collect_count)
         $node.find('.extra .year').text(movie.subject.year)
         $node.find('.extra .genres').text(movie.subject.genres.join('/'))
         $node.find('.extra .direction').text(function(){
             var directionArr =[]
             movie.subject.directors.forEach(function(item){
                 directionArr.push(item.name)
             })
             return directionArr.join('、')
         })
         $node.find('.extra .cast').text(function(){
             var castArr =[]
             movie.subject.casts.forEach(function(item){
                    castArr.push(item.name)
             })
             return castArr.join('、')
         })
         $('#us').append($node)
    })
 }

 function startSearch(){
     $.ajax({
         url:'http://api.douban.com/v2/movie/search',
         type:'GET',
         data:{
             q:value,
         },
         dataType:'jsonp'
     }).done(function(ret){
         console.log(ret)
         setDataSearch(ret)
     }).fail(function(){
         console.log('error')
     })
 }

function setDataSearch(data){
    data.subjects.forEach(function(movie){
        var tpl = `
        <div class="item">
        <a href="#">
            <div class="cover">
                <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
            </div>
            <div class="detail">
                <h2>霸王别姬</h2>
                <div class="extra"><span class="score">9.3分</span> / 1000收藏</div>
                <div class="extra">1994 / 剧情、爱情</div>
                <div class="extra">导演: 张艺谋</div>
                <div class="extra">主演: 张国荣、张丰毅、巩俐</div>
            </div>
        </a>
    </div>
              ` 
         var $node = $(tpl)
         $node.find('.cover img').attr('src',movie.images.small)
         $node.find('.detail h2').text(movie.title)
         $node.find('.extra .score').text(movie.rating.average)
         $node.find('.extra .collect').text(movie.collect_count)
         $node.find('.extra .year').text(movie.year)
         $node.find('.extra .genres').text(movie.genres.join('/'))
         $node.find('.extra .direction').text(function(){
             var directionArr =[]
             movie.directors.forEach(function(item){
                 directionArr.push(item.name)
             })
             return directionArr.join('、')
         })
         $node.find('.extra .cast').text(function(){
             var castArr =[]
             movie.casts.forEach(function(item){
                    castArr.push(item.name)
             })
             return castArr.join('、')
         })
         $('.search-restult').append($node)
    })
 }