class AddDefaultValuesForWageAndRevenue < ActiveRecord::Migration[6.0]
  def change
    change_table :attendances do |t|
      t.change :wage, :decimal, :precision => 9, :scale => 2, :default => 0
      t.change :revenue, :decimal, :precision => 9, :scale => 2, :default => 0
    end
  end
end
