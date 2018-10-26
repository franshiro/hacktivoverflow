import Vue from 'vue'
import Vuex from 'vuex'
const url = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        searchResult : []
    },
    mutations :{
        setSearch(state, payload){
            state.searchResult = payload
        }

    },
    actions:{
        searchArticle({commit}, payloud){
            axios({
                method : 'GET',
                url : `${config.port}/articles/search/${this.search}`
            })
            .then(response => {
                commit('setSearch', response.data)
                // this.article = response.data
            })
            .catch(err => {
                console.log(err)
            })
        },
    }
})