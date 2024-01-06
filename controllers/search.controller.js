const Post = require('../models/post');
const { response } = require('express');


const getAllPosts = async (req, res = response) => {

  const dataToFind = req.params.data;
  const regex = new RegExp(dataToFind, 'i');


  const posts = await Post
    .find({
      $or: [
        { title: regex },
        { content: regex }
      ]
    })
    .populate('userId', 'user');

  res.json({
    ok: true,
    msg: dataToFind,
    posts
  });
}


module.exports = {
  getAllPosts
}
