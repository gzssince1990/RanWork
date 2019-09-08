module Mutations
  class CreateAttendance < GraphQL::Schema::RelayClassicMutation
    field :attendance, Types::AttendanceType, null: false

    argument :work_date, String, required: true
    argument :start_time, GraphQL::Types::ISO8601DateTime, required: true
    argument :end_time, GraphQL::Types::ISO8601DateTime, required: true

    def resolve(work_date:, start_time:, end_time:)
      attendance = Attendance.create!(work_date: work_date, start_time: start_time, end_time: end_time)

      {
        attendance: attendance
      }
    end
  end
end
