import jwt from 'jsonwebtoken'

const JWT_SECRET = '52Q9ZxhycTHACiPXjOv9rcUILT6teVez';
export const HASURA_CLAIMS = 'https://hasura.io/jwt/claims';
export const HASURA_USER_ID = 'x-hasura-user-id';

export const signToken = (userId: string): string => {
    const accessToken = jwt.sign({
        [HASURA_CLAIMS]: {
            "x-hasura-default-role": "admin",
            "x-hasura-allowed-roles": ["admin"],
            [HASURA_USER_ID]: userId
        }
    }, JWT_SECRET)

    return accessToken;
}

export const getTokenData = (token: string) => {
    return jwt.verify(token, JWT_SECRET)
}