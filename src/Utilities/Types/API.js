import axios from "axios"

const getTypes = () => {
    return axios.get("https://react-native-dic.herokuapp.com/type/")
}

export const typeAPI = {
    getTypes
}