import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { PeriodType, RequestStatus } from './constants'
import { ADMIN_GROUP } from './../auth/constants';

const schema = a.schema({
  Period: a.model({
    id: a.id().required(),
    name: a.string().required(),
    periodType: a.enum(Object.values(PeriodType)),
    startDateTime: a.datetime().required(),
    endDateTime: a.datetime().required(),
    acceptingRequests: a.boolean().required(),

    loanableEquipment: a.hasMany('PeriodEquipment', 'periodId'),
    requests: a.hasMany('Request', 'periodId')
  })
    .authorization(allow => [
      allow.group(ADMIN_GROUP),
      allow.authenticated().to(['get', 'list'])
    ]),

  Request: a.model({
    id: a.id().required(),
    status: a.enum(Object.values(RequestStatus)),
    collateralDescription: a.string().required(),

    periodId: a.id().required(),
    period: a.belongsTo('Period', 'periodId'),

    equipmentRequests: a.hasMany('EquipmentRequest', 'requestId'),
    assignment: a.belongsTo('Equipment', 'id')
  })
    .authorization(allow => [
      allow.owner(),
      allow.group(ADMIN_GROUP)
    ]),

  EquipmentType: a.model({
    id: a.id().required(),
    name: a.string().required(),
    equipments: a.hasMany('Equipment', 'equipmentTypeId')
  })
    .authorization(allow => [
      allow.group(ADMIN_GROUP),
      allow.authenticated().to(['get', 'list'])
    ]),

  PeriodEquipment: a.model({
    periodId: a.id().required(),
    equipmentId: a.id().required(),

    period: a.belongsTo('Period', 'periodId'),
    equipment: a.belongsTo('Equipment', 'equipmentId'),
  })
    .authorization(allow => [
      allow.group(ADMIN_GROUP),
      allow.authenticated().to(['get', 'list'])
    ]),

  Equipment: a.model({
    id: a.id().required(),  // used as physical identifier
    accessories: a.string().array(),
    notes: a.string(),

    equipmentTypeId: a.id().required(),
    equipmentType: a.belongsTo('EquipmentType', 'equipmentTypeId'),

    periods: a.hasMany('PeriodEquipment', 'equipmentId'),
    equipmentRequests: a.hasMany('EquipmentRequest', 'equipmentId'),
    assignment: a.hasOne('Request', 'id')
  })
    .authorization(allow => [
      allow.group(ADMIN_GROUP),
      allow.authenticated().to(['get', 'list'])
    ]),

  EquipmentRequest: a.model({
    equipmentId: a.id().required(),
    requestId: a.id().required(),
    rank: a.integer(),  // optional, for MATCH periods

    equipment: a.belongsTo('Equipment', 'equipmentId'),
    request: a.belongsTo('Request', 'requestId')
  })
    .authorization(allow => [
      allow.owner(),
      allow.group(ADMIN_GROUP)
    ])
});

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