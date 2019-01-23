import axios from "axios";

export default {

//////////////////////////////////////////////////////////////////////////////
/////////////////////Shiney Stracker API for PokeAPI/////////////////////////
    getAllMon: function() {
       return axios.get('https://pokeapi-215911.firebaseapp.com/api/v2/pokemon?offset=0&limit=800')
    },
    getThisMon: function(num) {
        return axios.get('https://pokeapi-215911.firebaseapp.com/api/v2/pokemon/'+num)
    }
}