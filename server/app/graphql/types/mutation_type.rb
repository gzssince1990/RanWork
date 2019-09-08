module Types
  class MutationType < Types::BaseObject
    field :createAttendance, mutation: Mutations::CreateAttendance
  end
end
