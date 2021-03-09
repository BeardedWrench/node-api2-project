// implement your posts router here
const express = require('express');

const router = express.Router();

const Posts = require('./posts-model');

router.get( '/', ( req, res ) => {
    Posts.find()
        .then( posts => {
            res.status( 200 ).json( posts );
        })
        .catch( err => {
            res.status( 500 ).json({
                message: "The posts information could not be retrieved."
            })
        })
})
router.get( '/:id', ( req, res ) => {
    Posts.findById( req.params.id )
        .then( post => {
            if( !post ){
                res.status( 404 ).json({
                    message: "The post with the specified ID does not exist"
                })
            }else{
                res.status( 200 ).json( post );
            }
        })
        .catch( err => {
            res.status( 500 ).json({
                message: "The post information could not be retrieved."
            })
        })
})
router.post( '/', ( req, res ) => {
    
    if( !req.body.title || !req.body.contents ){
        res.status( 400 ).json({
            message: "Please provide a title and contents for the posts."
        })
    }else{
        Posts.insert( req.body )
            .then( post => {
                res.status( 201 ).json( post );
            })
            .catch( err =>{
                res.status( 500 ).json({
                    message: "There was an error while saving the post to the database."
                })
            })
    }
})
router.put( '/:id', ( req, res ) => {
    Posts.update( req.params.id, req.body )
        .then( post => {
            if( !post ){
                res.status( 404 ).json({
                    message: "The post with the specified ID does not exist"
                })
            }else{
                if( !req.body.title || !req.body.contents ){
                    res.status( 400 ).json({
                        message: "Please provide title and contents for the post"
                    })
                }else{
                    res.status( 200 ).json( post );
                }
            }
        })
        .catch( err => {
            res.status( 500 ).json({
                message: "The post information could not be modified"
            })
        })
})
router.delete( '/:id', ( req, res ) => {
    Posts.remove( req.params.id )
        .then( post => {
            if( !post ){
                res.status( 404 ).json({
                    message: "The post with the specified ID does not exist"
                })
            }else{
                res.status( 200 ).json({
                    message: "Post Deleted",
                    data: post
                })
            }
        })
        .catch( err => {
            res.status( 500 ).json({
                message: "The post could not be removed."
            })
        })
})

router.get( '/:id/comments', ( req, res ) => {
    Posts.findPostComments( req.params.id )
        .then( post => {
            if( !post ){
                res.status( 404 ).json({
                    message: "The post with the specified ID does not exist."
                })
            }else{
                res.status( 200 ).json( post )
            }
        })
        .catch( err => {
            res.status( 500 ).json({
                message: "The comments information could not be retrieved."
            })
        })
})

module.exports = router;