class ImproveAttendaces < ActiveRecord::Migration[6.0]
  def change
    change_table :attendances do |t|
      t.index :work_date, unique: true
      t.change :end_time, :time, null: true
    end
  end
end
