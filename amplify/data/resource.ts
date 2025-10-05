import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { PeriodType, RequestStatus } from './constants'

const schema = a.schema({
  Period: a.model({
    id: a.id().required(),
    name: a.string().required(),
    periodType: a.enum(Object.values(PeriodType)),
    startDateTime: a.datetime().required(),
    endDateTime: a.datetime().required(),

    requests: a.hasMany('Request', 'id')
  }),
  
  Request: a.model({
    id: a.id().required(),
    user: a.string().required(),
    status: a.enum(Object.values(RequestStatus)),
    
    period: a.belongsTo('Period', 'id'),
    equipmentRequests: a.hasMany('EquipmentRequest', 'requestId')
  })
    .authorization(allow => [
      allow.ownerDefinedIn('user')
    ]),

  EquipmentType: a.model({
    id: a.id().required(),
    name: a.string().required(),
    equipments: a.hasMany('Equipment', 'id')
  }),

  Equipment: a.model({
    id: a.id().required(),
    name: a.string().required(),
    physicalIdentifier: a.string().required(),
    accessories: a.string().array(),

    equipmentType: a.belongsTo('EquipmentType', 'id'),
    equipmentRequests: a.hasMany('EquipmentRequest', 'equipmentId')
  }),

  
  EquipmentRequest: a.model({
    equipmentId: a.id().required(),
    requestId: a.id().required(),
    rank: a.integer(),  // optional, for MATCH periods

    equipment: a.belongsTo('Equipment', 'equipmentId'),
    request: a.belongsTo('Request', 'requestId')
  })
}).authorization(allow => [
  allow.authenticated()  // TODO -- change to be more granular
]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});