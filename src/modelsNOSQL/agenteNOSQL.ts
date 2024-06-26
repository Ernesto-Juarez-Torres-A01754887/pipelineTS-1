import dynamodb from '../services/dynamoService';
import joi from 'joi';
import { PREFIX_NAME } from '../config';

export enum UserRoles {
	ADMIN = 'ADMIN',
	SUPERVISOR = 'SUPERVISOR',
	AGENT = 'AGENT'
}

const UserModel = dynamodb.define('user',{
    hashKey:'awsCognitoId',
    timestamps:true,
    schema:{
        awsCognitoId: joi.string().required(),
		name: joi.string().required(),
		role: joi.string().required().default(UserRoles.AGENT),
		email: joi.string().required().email(),
    },
    tableName:`Agente${PREFIX_NAME}`,
    indexes: [
		{
			hashKey: 'email',
			name: 'EmailIndex',
			type: 'global',
		},
	],
});


dynamodb.createTables((err:any)=>{
    if(err)
        return console.log('Error al crear la tabla',err);
    console.log('Tabla creada exitosamente');
})

export default UserModel;