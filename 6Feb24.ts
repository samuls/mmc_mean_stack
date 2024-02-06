db.createCollection('posts',{
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
    user:ObjectId('65c272999ef32c88dc16e198'),
    text: 'My first posts',
    name: 'Beautifull Nature XXXX',
    avatar: 'mypic.jpg',
    likes: [
        {
        user:ObjectId('65c272ab9ef32c88dc16e199')
        }
    ],
    comments: [
        {
            user:ObjectId('65c272b69ef32c88dc16e19a'),
            text:'Very nice posts',
            name: 'Samadhan Nirali',
            avatar: 'mypic1.jpg'
        }
    ]
});