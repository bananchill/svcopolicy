export function transformAlbum(_album) {
    return _album.reduce((lut, album) => {
        lut[album.id] = {
            title: album.title,
            photos: []
        }
        return lut;
    }, {});
}

export function transformPhoto(_photo, _album) {
    _photo.forEach((_photo) => {
        const albumLutKey = _album[_photo.albumId]
        if (albumLutKey) {
            delete _photo.albumId;
            albumLutKey.photos.push(_photo)
        }
    });
    return _album
}

export function transformPost(_posts) {
    return _posts.reduce((lut, post) => {
        lut[post.id] = {
            title: post.title,
            body: post.body,
            comment: []
        }
        return lut
    }, {});
}

export function transformComment(_posts, _comments) {
    _comments.forEach((_comments) => {
        const postsLutKey = _posts[_comments.postId]
        if (postsLutKey) {
            delete _comments.postId;
            postsLutKey.comment.push(_comments)
        }
    });
    return _posts
}
