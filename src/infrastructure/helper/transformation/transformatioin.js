export function transformAlbum(_album) {
    const userAlbum = _album.map((_a) => {
        return {
            ..._a,
            photo: []
        }
    })
    return userAlbum;
}

export function transformPhoto(_photo, _album) {

    let minusIndexAlbum = 0; // переменная используется для изменения индексов с непонятно большого на 0-...
    let minusIndexPhoto = 0;  // переменная используется для изменения индексов с непонятно большого на 0-...
    let saveAlbumId = 0

    const albumIndexDifference = 10;
    const photoIndexDifference = 50;

    _photo.forEach((_photo, indexPhoto) => {

        let {albumId, title, url, thumbnailUrl} = _photo;

        if (indexPhoto - minusIndexPhoto === photoIndexDifference) {
            minusIndexPhoto += photoIndexDifference
        }

        saveAlbumId = albumId

        albumId--;

        if (albumId - minusIndexAlbum === albumIndexDifference)
            minusIndexAlbum += albumIndexDifference

        indexPhoto = indexPhoto > 49 ? indexPhoto - minusIndexPhoto : indexPhoto
        albumId = albumId > 9 ? albumId - minusIndexAlbum : albumId
        if (_album[albumId] &&
            _album[albumId].id === saveAlbumId &&
            !_album[albumId].photo[indexPhoto]) {
            _album[albumId].photo[indexPhoto] = {
                id: indexPhoto,
                title: title,
                url: url,
                thumbnailUrl: thumbnailUrl
            }
        }
    })
    return _album;
}

export function transformPost(_posts) {
    const posts = _posts.map((_a) => {
        return {
            ..._a,
            comment: []
        }
    })
    return posts;
}

export function transformComment(_posts, _comments) {
    let minusIndex = 0

    _comments.forEach(_comments => {
        let {postId, id, name, email, body} = _comments

        id--;
        postId--;

        if (id - minusIndex === 5)
            minusIndex += 5

        if (_posts[postId]
            && !_posts[postId].comment[id > 4 ? id - minusIndex : id]) {
            _posts[postId].comment[id > 4 ? id - minusIndex : id] = {
                name: name,
                email: email,
                body: body
            }
        }
    })

    return _posts
}
