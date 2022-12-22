const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const heading = $('.heading-h2')
const cbThumb = $('.cd-thumb')
const cbsong = $('#audio')
const playBtn = $('.btn-toggle-play')
const cd = $('.cd')
const player = $('.player')
const progress = $('.progress')
const BtnnextSong = $('.btn-next')
const BtnprevSong = $('.btn-prev')
const BtnRandom = $('.btn-random')
var isRandom = false
var isRepeat = false
const BtnRepeat = $('.btn-repeat')
const songg = $('.song')
var indexx = []
const app =  {
     currentIndex : 0,
     isPlaying : false,
     
    
     songs : [
        {
            name : 'Tòng Phu',
            singer : 'tongphu1',
            path : '/musicapp/song/so1.mp3',
            image : '/musicapp/image_song/s1.jpg'
        },
        {
            name : 'Sao Cũng Được',
            singer : 'saocungduoc',
            path : '/musicapp/song/so2.mp3',
            image : '/musicapp/image_song/s2.jpg'
        },
        {
            name : 'Chàng Trai Của Em',
            singer : 'changtraicuaem',
            path : '/musicapp/song/so3.mp3',
            image : '/musicapp/image_song/s3.jpg'
        },
        {
            name : 'Kỳ Vọng Sai Lầm',
            singer : 'kyvongsailam',
            path : '/musicapp/song/so4.mp3',
            image : '/musicapp/image_song/s4.jpg'
        },
        {
            name : 'Có Chơi Có Chịu',
            singer : 'cochooicochiu',
            path : '/musicapp/song/so5.mp3',
            image : '/musicapp/image_song/s5.jfif'
        },
        {
            name : 'Bai 6',
            singer : 'tongphu1',
            path : '/musicapp/song/so1.mp3',
            image : '/musicapp/image_song/s6.jpg'
        },
        {
            name : 'Bai 7',
            singer : 'saocungduoc',
            path : '/musicapp/song/so2.mp3',
            image : '/musicapp/image_song/s7.jpg'
        },
        {
            name : 'Bai 8',
            singer : 'changtraicuaem',
            path : '/musicapp/song/so3.mp3',
            image : '/musicapp/image_song/s8.jpg'
        },
        {
            name : 'Bai 9',
            singer : 'kyvongsailam',
            path : '/musicapp/song/so4.mp3',
            image : '/musicapp/image_song/s9.jpg'
        },
        {
            name : 'Bai 10',
            singer : 'cochooicochiu',
            path : '/musicapp/song/so5.mp3',
            image : '/musicapp/image_song/s10.jpg'
        }
    ],
    render : function(){
        const htmls = this.songs.map((song, index) => {
            
            indexx.push(index)
             //  return `<div class="song">
            return `<div class="song ${indexx[index] === this.currentIndex ? 'active' : '' }">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>`
        })
        $('.playlist').innerHTML = htmls.join('\n')
    },
    handleEvent: function(){
        const _this = this
        const cdWith = cd.offsetWidth

        // xu ly phong to thu nho cd
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newcdWith = cdWith - scrollTop
            
            if(newcdWith >0){
                cd.style.width  = newcdWith + 'px '
            }else{
                cd.style.width  = 0 
            }

            cd.style.opacity = newcdWith/cdWith
        }

        // xu ly khi click play
        playBtn.onclick = function() {
            if(_this.isPlaying){
                cbsong.pause()
            }else{
                cbsong.play()
            }
        }

        cbsong.onplay = function(){
            player.classList.add('playing')
            _this.isPlaying = true
            cdThumbAnimate.play()
        }
        // khi song bi pause
        cbsong.onpause = function(){
            player.classList.remove('playing')
            _this.isPlaying = false
            cdThumbAnimate.pause()
        }
        // lấy ra giá trị thời gian thực khi audio được chạy
        cbsong.ontimeupdate = function(){
        // console.log(cbsong.currentTime)
        if(cbsong.duration){
            const progressPercent = Math.floor(cbsong.currentTime / cbsong.duration * 100)
            progress.value = progressPercent
        }
        // console.log(progressPercent)
        }
        // xu ly khi tua song
        progress.onchange = function(e){
            const seekTime  = (cbsong.duration /100 * e.target.value)
            cbsong.currentTime = seekTime
            console.log(e.target.value)
        }

        BtnnextSong.onclick = function(){            
            // do{
            //     songg.classList.add('active')
            // }while(indexx[i] == _this.currentIndex)}
            // for(var i =0; i< indexx.length; i++){
            //     if(indexx[i] == _this.currentIndex){
            //         songg.classList.add('active')
            //         console.log('ok')
            //     }
            // }
            
            if(_this.isRepeat){
                _this.repeatSong()
            }
            else if(_this.isRandom){
                _this.playRandomSong()
            }
            else{
                _this.nextSong()      
                  }
            cbsong.play()
            _this.render()
            
        }
        
        BtnprevSong.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }else if(_this.isRepeat){
                _this.repeatSong()
            }else{
            _this.prevSong()
        }
            cbsong.play()
            // _this.render()
            
        }
        BtnRandom.onclick = function(){
           _this.isRandom = !_this.isRandom
            BtnRandom.classList.toggle('active', _this.isRandom)
            
        }
        BtnRepeat.onclick = function(){
            _this.isRepeat = !_this.isRepeat
            BtnRepeat.classList.toggle('active', _this.isRepeat)
            console.log('ok')
        }
        cbsong.onended = function(){
            BtnnextSong.click()
        }
        const cdThumbAnimate  = cbThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
                duration: 10000,
                interations : Infinity
        }   
        )
        cdThumbAnimate.pause()

    },

    repeatSong : function(){
        this.currentIndex = this.currentIndex
        this.loadCurrentSong()
    },
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex >=this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong : function(){
        this.currentIndex--
        if(this.currentIndex <0){
            this.currentIndex = this.songs.length -1
        }
        this.loadCurrentSong()
    },
    
    defineProperties : function(){
        Object.defineProperty(this, 'currentSong', {
            get : function(){
                return this.songs[this.currentIndex]
            }
        })
    },
//    getCurrentSong : function(){
//     var currentSong = this.songs.currentIndex
//         return currentSong
//    },
    loadCurrentSong : function(){
        // console.log (cbThumb,heading,cbsong)
        
        heading.textContent = this.currentSong.name
        cbThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        cbsong.src = this.currentSong.path
    },
    playRandomSong : function(){
        let newIndex
        // let arrSong = []
        // this.songs.map(function(song){
        //     arrSong.push(song)
        // })
        do{
            newIndex = Math.floor(Math.random()*(this.songs.length -1))
        }while(newIndex === this.currentIndex)
        this.currentIndex = newIndex

        this.loadCurrentSong()
    },
    start : function(){
        // định nghĩa thuộc tính cho object
        // this.getCurrentSong()
        this.defineProperties()
        // lắng nghe, xử lý sự kiện DOM event
        this.handleEvent()
        // tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()
        // render playlist
        this.render() 
        
        
    }
}
app.start()