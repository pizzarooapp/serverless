export const VerifyAdmin = () => {

    const authHeader = headers['authorization'];

    if (!authHeader) {
        return {
            statusCode: 403,
            body: JSON.stringify({ message: 'Forbidden' }),
        };
    }

    const [_, authToken] = authHeader.split(' ');


    const adminObj = getTokenData(authToken)
    const adminId = adminObj[HASURA_CLAIMS][HASURA_USER_ID]

    const data = await api.AdminGetMe(
        { id: adminId },
        { 'x-hasura-admin-secret': 'myadminsecretkey' }
    );
}