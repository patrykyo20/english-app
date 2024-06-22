import type { Schema, Attribute } from '@strapi/strapi';

export interface ArrayAnswers extends Schema.Component {
  collectionName: 'components_array_answers';
  info: {
    displayName: 'answers';
    description: '';
  };
  attributes: {
    answer: Attribute.String;
    isAnswer: Attribute.Boolean;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'array.answers': ArrayAnswers;
    }
  }
}
