import { Schema } from '../../data/resource';

export const handler: Schema['getUserDisplayNames']['functionHandler'] = async (event, context) => {
    // const arguments = event.arguments;
    return [{ username: 'b', displayName: 'asdf' }];
};