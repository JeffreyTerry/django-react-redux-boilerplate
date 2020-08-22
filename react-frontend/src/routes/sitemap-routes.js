// THIS FILE SHOULD CONTAIN ALL OF THE ROUTES WE WANT OUR SITEMAP TO INCLUDE.
// `npm run sitemap` uses it to automatically generate sitemap.xml
import React from 'react';
import { Route } from 'react-router';

export default (
    <Route>
        <Route exact path='/' />
        <Route path='/signin' />
        <Route path='/legal' />
        <Route path='/user' />
    </Route>
);
