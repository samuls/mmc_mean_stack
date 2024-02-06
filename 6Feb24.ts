db.createCollection('posts'{
    validator:{
        $jsonSchema:{
            bsonType:'object',
            required:['text'],
            properties:{
                user:{
                    bsonType:'objectId'
                },
                text:{bsonType:'string'},
                name:{bsonType:'string'},
                avatar:{bsonType:'string'},
                date:{bsonType:'date'},
                likes:{
                    bsonType:'array',
                    items:{
                        bsonType:'object',
                        properties:{
                            user:{bsonType:'objectId'}
                        }
                    }
                },
                comments:{
                    bsonType:'array',
                    items:{
                        bsonType:'object',
                        required:['text'],
                        properties:{
                            user:{
                                bsonType:'objectId'
                            },
                            text:{bsonType:'string'},
                            name:{bsonType:'string'},
                            avatar:{bsonType:'string'},
                            date:{bsonType:'date'},
                        }
                    }
                }
            }
        }
    }
})



db.posts.insertone( {
    user:ObjectId('65c1e78ce69cd254e859515e'),
    text: 'My first posts',
    name: 'Beautifull Nature XXXX',
    avatar: 'mypic.jpg',
    likes: [
        {
        user:ObjectId('65c1e79ce69cd254e859515f')
        }
    ],
    comments: [
        {
            user:ObjectId('65c1ea1de69cd254e8595160'),
            text:'Very nice posts',
            name: 'Samadhan Nirali',
            avatar: 'mypic1.jpg'
        }
    ]
});