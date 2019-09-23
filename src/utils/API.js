import axios from "axios";

export default {

//////////////////////////////////////////////////////////////////////////////
/////////////////////Shiney Stracker API for PokeAPI/////////////////////////
//    doesnt inclued gen 7
    getAllMon: function() {
       return axios.get('https://pokeapi-215911.firebaseapp.com/api/v2/pokedex/1')
    },
//      does include gen 7
    getThisMon: function(id) {
        return axios.get('https://pokeapi-215911.firebaseapp.com/api/v2/pokemon/'+id)
    }
}