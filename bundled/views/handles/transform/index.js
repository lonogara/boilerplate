const transforms = {}
export default (post) => transforms[post.type](post)