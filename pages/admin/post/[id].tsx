import React from 'react';
import Unauthenticated from '../../../src/components/admin/auth/unauthenticated';
import Post from '../../../src/components/admin/post';
import { AdonixBlogContext } from '../../_app';

const Index = () => {
    const { admin } = React.useContext(AdonixBlogContext);
    return <div>{!admin ? <Unauthenticated /> : <Post admin={admin} />}</div>;
};

export default Index;
