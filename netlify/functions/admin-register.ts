import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { hashPassword } from "../common/password";
import { signToken } from "../common/jwt";
import { api } from "../common/api";
import { AdminRegisterInput } from "../common/sdk"

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const { body, headers } = event;

    if (!headers['x-pizzaroo-secret-key'] || headers['x-pizzaroo-secret-key'] !== 'mypizzaroosecretkey') {
        return {
            statusCode: 403,
            body: JSON.stringify({
                message: '"x-pizzaroo-secret-key" is missing or value is invalid'
            }),
        };
    }

    const input: AdminRegisterInput = JSON.parse(body!).input.admin;

    const data = await api.InsertAdmin(
        {
            username: input.username,
            password: hashPassword(input.password)
        },
        { 'x-hasura-admin-secret': 'myadminsecretkey' }
    );

    return {
        statusCode: 200,
        body: JSON.stringify({ accessToken: signToken(data.insert_admin_one?.id) }),
    };
};

export { handler };