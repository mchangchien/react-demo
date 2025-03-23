const { app } = require('@azure/functions');



app.http('GetRoles', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const user = request.body || {};
        const roles = [];
 
        const userClaims = Array.isArray(user.claims) ? user.claims : [];

        return { status: 200, body: { roles } };
    }
});


