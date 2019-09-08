class CreateAttendances < ActiveRecord::Migration[6.0]
  def change
    create_table :attendances do |t|
      t.date :work_date
      t.time :start_time
      t.time :end_time

      t.timestamps
    end
  end
end
