import axios from "axios";

const create = (data) => {
    return axios.post("https://react-native-dic.herokuapp.com/dic/create",data)
}

const update = (id,data) => {
    return axios.put("https://react-native-dic.herokuapp.com/dic/update/" + id,data)
}

const getAll = () => {
    return axios.get("https://react-native-dic.herokuapp.com/dic")
}

const addWordToTags = (data) => {
    return axios.post("https://react-native-dic.herokuapp.com/dic/remove-from-tags",data)
}

const showWordsByTag = (tagId) => {
    return axios.get("https://react-native-dic.herokuapp.com/dic/show-word-by-tag/" + tagId)
}

export const DicAPI = {
    create,
    getAll,
    addWordToTags,
    update,
    showWordsByTag
}