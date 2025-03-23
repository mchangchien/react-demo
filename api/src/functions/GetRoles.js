const { app } = require('@azure/functions');



app.http('GetRoles', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const user = request.body || {};
        const roles = [];
 
        const userClaims = Array.isArray(user.claims) ? user.claims : [];
        function getClaimValue(typ) {
            const claim = userClaims.find(c => c.typ === typ);
            return claim ? claim.val : null; // Return the value if found, otherwise return null
          }
        // Example usage:
        const name = getClaimValue("name");

        roles.push(name);
        return { status: 200, body: { "roles":roles } };
    }
});


