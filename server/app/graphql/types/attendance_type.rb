module Types
  class AttendanceType < Types::BaseObject
    field :id, ID, null: false
    field :work_date, String, null: false
    field :start_time, GraphQL::Types::ISO8601DateTime, null: false
    field :end_time, GraphQL::Types::ISO8601DateTime, null: false
  end
end
