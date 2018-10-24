export const datamodelTypeDefs = `
directive @unique on FIELD | FIELD_DEFINITION
directive @private on FIELD | FIELD_DEFINITION
directive @visibility(type: VisibilityType!) on FIELD | FIELD_DEFINITION

type User  {
  id: ID! @unique @visibility(type: OWNER)
  createdAt: DateTime! @visibility(type: OWNER)
  updatedAt: DateTime! @visibility(type: OWNER)
  email: String! @unique @visibility(type: OWNER)
  password: String! @private
  tokens: Int! @visibility(type: OWNER)
  assessmentInfos: [AssessmentInfo!]! @visibility(type: OWNER)
}

type Course {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  concepts: [Concept!]!
  order: Int!
}

type Concept {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  course: Course!
  assessments: [Assessment!]!
  order: Int!
}

# TODO in the future we will need to lock down the assessML and JavaScript in some way to prevent cheating
# TODO For example, right now users can technically see the solution and calculate the answer in their client
# TODO because everything dealing with the assessment is done client side
type Assessment {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!
  concept: Concept!
  assessML: String!
  javaScript: String!
  order: Int!
}

type TokenTransaction {
  id: ID! @unique @visibility(type: OWNER)
  createdAt: DateTime! @visibility(type: OWNER)
  updatedAt: DateTime! @visibility(type: OWNER)
  user: User! @visibility(type: OWNER)
  amount: Int! @visibility(type: OWNER)
  type: TokenTransactionType! @visibility(type: OWNER)
  description: String! @visibility(type: OWNER)
}

type AssessmentInfo {
  id: ID! @unique @visibility(type: OWNER)
  createdAt: DateTime! @visibility(type: OWNER)
  updatedAt: DateTime! @visibility(type: OWNER)
  user: User! @visibility(type: OWNER)
  assessment: Assessment! @visibility(type: OWNER)
  answeredCorrectly: Boolean! @visibility(type: OWNER)
  solutionViewed: Boolean! @visibility(type: OWNER)
}

type TokenReward {
  id: ID! @unique
  type: TokenTransactionType! @unique
  amount: Int!
}

enum TokenTransactionType {
  ANSWER_CORRECT
  ANSWER_INCORRECT
  VIEW_SOLUTION
  EXERCISE_CREATED_AND_ACCEPTED
  FEEDBACK_RECEIVED
  INITIAL_ENDOWMENT
}

enum VisibilityType {
  OWNER
}
`;