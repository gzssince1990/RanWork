module Mutations
  class UpdateStartWork < GraphQL::Schema::RelayClassicMutation
    argument :work_date, String, required: true
    argument :start_time, GraphQL::Types::ISO8601DateTime, required: true

    field :attendance, Types::AttendanceType, null: true
    field :errors, [String], null: false

    def resolve(work_date:, start_time:)
      attendance = Attendance.find_by(:work_date => work_date)

      if attendance.present?
        attendance.update(:start_time => start_time)
        { :attendance => attendance, :errors => [] }
      else
        { :attendance => nil, :errors => ["No Record!"] }
      end
    end
  end
end
