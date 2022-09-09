import UserApiModule from "@/apis/helperApiModule/user/userApiModule";
import AlbumApiModule from "@/apis/helperApiModule/album/albumApiModule";
import PhotoApiModule from "@/apis/helperApiModule/photo/photoApiModule";
import PostApiModule from "@/apis/helperApiModule/post/postApiModule";
import CommentApiModule from "@/apis/helperApiModule/comment/commentApiModule";

export default class ApiPack {
    install(_app) {
        _app.use(new UserApiModule())
            .use(new AlbumApiModule())
            .use(new PhotoApiModule())
            .use(new PostApiModule())
            .use(new CommentApiModule())
    }
}
