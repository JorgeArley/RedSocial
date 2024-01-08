const Post = require('../models/post');
const Usuario = require('../models/usuario');

const { response } = require('express');


const getPosts = async (req, res) => {
  const from = Number(req.query.from) || 0;
  
  [posts, total] = await Promise.all([
    Post.find()
              .populate('userId','user')
              .skip(from)
              .limit(10),
    Post.countDocuments()
  ]);
  
  res.json({
    ok: true,
    posts,
    total
  });
}

const getPostById = async (req, res = response) => {

  const pid = req.params.id;

  try {
    const PostDB = await Post.findById(pid)
        .populate('userId','user');

    if (!PostDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe ese post'
      });
    }

    res.json({
      ok: true,
      post: PostDB
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado..en el get por id de Post'
    });
  }
}

const createPost = async (req, res) => {

  const uid = req.uid;
  
  try {
    const post = new Post({
      createdAt: new Date(),
      userId: uid,
      ...req.body
    });

    const newPost = await post.save();
    
    await Usuario.findByIdAndUpdate(uid,
      { $push: { 'posts': newPost._id.toString() } },
      { new: true }
    );

    res.json({
      ok: true,
      newPost
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado..en la creacion del post'
    });
  }
}

const putPost = async (req, res = response) => {

  const pid = req.params.id;

  try {
    const postDB = await Post.findById(pid);

    if (!postDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe ese post'
      });
    }

    //actualizaciones

    const post = {
      updatedAt: new Date(),
      ...req.body
    };
    const postActualizado = await Post.findByIdAndUpdate(pid, post, {new: true});

    
    res.json({
      ok: true,
      postActualizado
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado..en el put'
    });
  }
}

const deletePostById = async (req, res = response) => {

  const pid = req.params.id;

  try {
    const PostDB = await Post.deleteOne({ _id: pid });

    if (!PostDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe ese post'
      });
    }

    res.json({
      ok: true,
      post: PostDB
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado..en el delete por id de Post'
    });
  }
}

module.exports = {
  getPosts,
  createPost,
  putPost,
  getPostById,
  deletePostById
}
 