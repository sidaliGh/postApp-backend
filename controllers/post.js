const mongoose = require('mongoose')
const Post = require('../models/post')
const User = require('../models/user')

const addPost = async (req, res, next) => {
  const { title, description, imageUrl, userId } = req.body

  let existUser
  try{
    existUser = await User.findById(userId)
  } catch (err) {
    console.log(err)
  }

  if(!existUser){
    return console.log('no user found with this ID')
  }


  const createdPost = new Post({
    title,
    description,
    imageUrl,
    userId
  })

  try{
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await createdPost.save({session: sess})
    existUser.posts.push(createdPost)
    await existUser.save({session: sess})
    await sess.commitTransaction()

  } catch (err) {
    console.log(err)
  }

  res.status(201).json({ post: createdPost })
}

const getPosts = async (req, res, next) => {
  let posts
  try {
    posts = await Post.find()
  } catch (err) {
    res.status(400).send(err)
  }

  res.status(200).json({ posts: posts })
}

const getPostById = async (req, res, next) => {
  const postId = req.params.postId
  let post
  try {
    post = await Post.findById(postId)
  } catch (err) {
    res.status(400).send(err)
  }
  if (!post) {
    return console.log('no post found with this ID')
  }

  res.status(200).json({ post: post })
}

const updatePost = async (req, res, next) => {
  console.log('hello from postman')
  const { title, description, imageUrl } = req.body
  const postId = req.params.postId

  let post
  try {
    post = await Post.findById(postId)
  } catch (err) {
    res.status(400).send(err)
  }
  post.title = title
  post.description = description
  post.imageUrl = imageUrl

  try {
    await post.save()
  } catch (err) {
    return console.log(err)
  }

  res.status(200).json({ message: 'updated' })
}

const deletePost = async (req, res, next) => {
  const postId = req.params.postId

  try {
    await Post.findByIdAndRemove(postId)
  } catch (err) {
    return console.log(err)
  }
  res.status(200).json({message: 'deleted'})
}

exports.addPost = addPost
exports.getPosts = getPosts
exports.getPostById = getPostById
exports.updatePost = updatePost
exports.deletePost = deletePost
