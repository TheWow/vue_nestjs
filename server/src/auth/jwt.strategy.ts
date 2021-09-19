import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IncomingMessage } from 'http';

let cookieExtractor = function(req: IncomingMessage) {
	var token = null;
	if (req && req.headers.cookie) { 
		let cookies = req.headers.cookie.split('; ');
		token = cookies.reduceRight((val: null | string, e: string) => {
			let split = e.split("=");
			let object = {} as any;
			object[split[0]] = split[1];

			if(object.token) val = object.token;
			return val;
		}, null);
	}
	return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET
		});
	}

	async validate(payload: any) {
		return { user_id: payload.sub, login: payload.login, roles: payload.roles };
	}
}