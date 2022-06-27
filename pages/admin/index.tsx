import * as React from 'react';
import SignIn from '../../src/components/admin/auth/sign-in';
import Posts from '../../src/components/admin/posts';
import { AdonixBlogContext } from '../_app';

const Index = () => {
    const { admin } = React.useContext(AdonixBlogContext);
    return <div>{!admin ? <SignIn /> : <Posts admin={admin} />}</div>;
};

export default Index;
