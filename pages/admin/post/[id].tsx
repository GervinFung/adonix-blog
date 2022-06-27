import * as React from 'react';
import SignIn from '../../../src/components/admin/auth/sign-in';
import Post from '../../../src/components/admin/post';
import { AdonixBlogContext } from '../../_app';

const Index = () => {
    const { admin } = React.useContext(AdonixBlogContext);
    return <div>{!admin ? <SignIn /> : <Post admin={admin} />}</div>;
};

export default Index;
