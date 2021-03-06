import testBlogPostParser from './parser/blog/post';
import testBlogPostsParser from './parser/blog/posts';
import testType from './parser/type';
import testMongo from './database/mongo';
import testAdminPropsParser from './parser/admin';
import testValidation from './common/validation';

testBlogPostsParser();
testBlogPostParser();
testAdminPropsParser();
testType();
testMongo();
testValidation();
