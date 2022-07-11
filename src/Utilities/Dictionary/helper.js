export const getWords = (initData = []) => {
    let words = [];
    if(initData.length > 0) {
        words = initData.map(item => item.word[0])
    }

    return words;
}