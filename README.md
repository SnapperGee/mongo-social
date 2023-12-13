# Mongo Social

Collection of API endpoints for a social network application.

## Endpoints

### Thoughts

A user's thoughts can be interacted with via the following endpoints.

#### `/api/thoughts`

- A **GET** request to this endpoint gets all thoughts.
- A **POST** request to this endpoint will create a new thought.
  - the request body `userId` and `thoughtText` properties set the respective properties of the created thought.

#### `/api/thoughts/:id`

- A **GET** request to this endpoint get's the thought with the ID provided via the request URL `id` parameter.
- A **PUT** request to this endpoint updates the thought with the ID provided via the request URL `id` parameter.
  - the request body `user`, `reactions`, and `thoughtText` property update each respective property of the thought.
- A **DELETE** request to this endpoint deletes the thought with the ID provided via the request URL `id` parameter.

### Reactions

A user's thought reactions can be interacted with via the following endpoints.

#### `/api/thoughts/:thoughtId/reactions`

A **POST** request to this endpoint is used to create a reaction:

- the request URL `thoughtId` parameter provides the ID of the Thought the reaction will be associated with.
- the request body `userId` and `reactionBody` properties set the respective properties of the created reaction.

A **DELETE** request to this endpoint is used to delete a reaction:

- the request URL `thoughtId` parameter is used to provide the ID of the Thought the deleted reaction is associated with.
- the request body `reactionId` provides the ID of the reaction to be deleted.
