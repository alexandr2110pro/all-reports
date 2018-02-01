import * as request from 'superagent';
import { CreateAccessTokenDto } from '../../../auth/dto/create-access-token.dto';

export const authorizeUser = async (createAccessTokenDto: CreateAccessTokenDto) => {
  return await request
    .post('/auth/token')
    .send(createAccessTokenDto)
    .then(({body}) => body)
};
