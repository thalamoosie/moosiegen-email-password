'use strict';

import axios from 'axios';

// Consume API @ affirmations.dev to start with

export const getNiceAffirmation = async function(url) {
    // Get affirmation
    try {
        const res = await axios.get(url)
        return res.data;
    } catch (err) {
        console.error(err)
    }
}