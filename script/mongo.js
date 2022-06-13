db = db.getSiblingDB('admin');

db.createUser({
    user: 'runner',
    pwd: 'mongodb',
    roles: [{ role: 'root', db: 'admin' }, 'readWrite'],
});

db.auth('runner', 'mongodb');

// program db
db = db.getSiblingDB('blog');
db.createCollection('post');
db.createCollection('authRecord');

// test db
db = db.getSiblingDB('testBlog');
db.createCollection('post');
db.createCollection('authRecord');
