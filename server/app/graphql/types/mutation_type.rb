module Types
  class MutationType < Types::BaseObject
    field :createWork, mutation: Mutations::CreateWork
    field :updateStartWork, mutation: Mutations::UpdateStartWork
    field :updateEndWork, mutation: Mutations::UpdateEndWork
  end
end
