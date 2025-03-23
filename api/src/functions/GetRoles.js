const { app } = require('@azure/functions');



app.http('GetRoles', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const user = request.body || {};
        const roles = ["ttt","xxx"];
 
        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: { roles }
        };
        

    }
});


