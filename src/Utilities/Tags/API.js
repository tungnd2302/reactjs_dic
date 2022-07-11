import axios from "axios";

const create = (data) => {
    return axios.post("https://react-native-dic.herokuapp.com/tag/create",data)
}

const update = (id,data) => {
    return axios.put("https://react-native-dic.herokuapp.com/tag/update/" + id,data)
}

const getAll = () => {
    return axios.get("https://react-native-dic.herokuapp.com/tag")
}

const showSelectedTag = (wordId) => {
    return axios.get("https://react-native-dic.herokuapp.com/tag/show-tag-by-word/" + wordId)
}

export const TagAPI = {
    create,
    getAll,
    update,
    showSelectedTag
}