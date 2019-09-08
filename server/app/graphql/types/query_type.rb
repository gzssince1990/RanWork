module Types
  class QueryType < Types::BaseObject
    field :attendances, [Types::AttendanceType], null: false

    def attendances
      Attendance.all
    end

    field :attendance, Types::AttendanceType, null: false do
      argument :id, ID, required: true
    end

    def attendance(id:)
      Attendance.find(id)
    end
  end
end
