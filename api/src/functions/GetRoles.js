const { app } = require('@azure/functions');


app.http('GetRoles', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const user = req.body || {};
        const roles = [];
        
        const data = user.json();
        console.log("Raw payload from /.auth/me:", data); // Debug raw response
    
        context.res.json({
            roles
        });
    }
});


