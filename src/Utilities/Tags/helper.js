export function getSelectedTags (wordId, data = []) {
    let tags = [];
    if(data.length > 0) {
        tags = data.map(item => item.tag[0]._id);
    }

    return {
        wordId,
        tagsId: tags
    };
}

export function mapDataToSubmit(wordId, initalTagsId, selectedTagsId) {
    let oldTagsId = [];
    let newTagsId = [];

    if(initalTagsId.length > 0) {
        initalTagsId.forEach(id => {
            if(!selectedTagsId.includes(id)) {
                oldTagsId.push(id);
            }
        })
    }

    if(selectedTagsId.length > 0) {
        selectedTagsId.forEach(id => {
            if(!initalTagsId.includes(id)) {
                newTagsId.push(id);
            }
        })
    }

    return {
        wordId,
        oldTagsId,
        newTagsId
    }
}