class Film{
    API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'
    tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.API_KEY}&page=1` 
    tokenPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&page=1`
    tokenUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.API_KEY}&page=1`
    prevButton = document.querySelector('.prev')
    pageNum = document.querySelector('.title')
    searchButton = document.querySelector('.btn')
    append = document.querySelector('.append')
    nextButton = document.querySelector('.next')
    search = document.querySelector('#search')
    score = document.querySelector('#score')
    buttons = document.querySelectorAll('.btns')


    writeStorage(lastCat, pagi=1){
        let data = this.data
        data.last = lastCat
        data.page = pagi
        return window.localStorage.setItem('database', JSON.stringify(data))
    }

    get data () {
		const data = window.localStorage.getItem('database')
		return JSON.parse(data) || base
	}

    async updatePopular(page) {
        this.tokenPopular = this.tokenPopular.slice(0, -1) + page
        let response = await fetch(this.tokenPopular)
        return await response.json()
    }

    async updateTop(page) {
        this.tokenTop = this.tokenTop.slice(0, -1) + page
        let response = await fetch(this.tokenTop)
        return await response.json()
    }

    async updateUpComing(page) {
        this.tokenUpComing = this.tokenUpComing.slice(0, -1) + page
        let response = await fetch(this.tokenUpComing)
        return await response.json()
    }

    paginationNum = this.data.page

    async render(searchValue, minYear, maxYear, score) {
        if (this.data.last == 'top_rated') {
            var data = await this.updateTop(this.data.page)
        } else if (this.data.last == 'popular') {
            var data = await this.updatePopular(this.data.page)
        }else{
            var data = await this.updateUpComing(this.data.page)
        }
        data = data.results
        this.append.innerHTML = null
        console.log(searchValue, minYear, maxYear, score);
        for(let i of data) {
            if(i.title.toLowerCase().includes(searchValue ? searchValue.toLowerCase() : "")) {
                if(minYear ? minYear <= i.release_date.slice(0, 4) : true){
                    if(maxYear ? maxYear >= i.release_date.slice(0, 4) : true) {
                        if(score ? score <= i.vote_average : true) {
                            let div = document.createElement('div')
                            div.className = 'movie'
                            div.innerHTML = films(i)
                            this.append.append(div)
                        }
                    }
                }
            }
        }
    }
}

let film = new Film()
film.render()